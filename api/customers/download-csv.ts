// api/customers/download-csv.ts (CORRECTED - Using Vercel KV)
import { VercelRequest, VercelResponse } from '@vercel/node';

async function redisCommand(
  command: string,
  args: string[],
  kvUrl: string,
  kvToken: string
): Promise<any> {
  try {
    // Parse URL properly - extract host part before /
    const urlParts = kvUrl.split('\n');
    const baseUrl = urlParts[0].trim();
    
    // Remove credentials from URL if present
    const cleanUrl = baseUrl.replace(/redis:\/\/[^@]*@/, 'https://');
    
    // Build command path with proper URL encoding
    const commandPath = `${command}/${args.map(arg => encodeURIComponent(arg)).join('/')}`;
    const endpoint = `${cleanUrl}/${commandPath}`;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${kvToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Redis error: ${response.status} ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Redis command ${command} failed:`, error);
    throw error;
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const kvUrl = process.env.VERCEL_KV_REST_API_URL;
    const kvToken = process.env.VERCEL_KV_REST_API_TOKEN;

    if (!kvUrl || !kvToken) {
      return res.status(500).json({ error: 'Storage not configured' });
    }

    // Fetch all customers from Redis using LRANGE
    const data = await redisCommand('lrange', ['customers:all', '0', '-1'], kvUrl, kvToken);
    const customerList = data.result || [];

    if (!customerList || customerList.length === 0) {
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="customers_${new Date().toISOString().split('T')[0]}.csv"`);
      return res.status(200).send('ID,Name,Email,Phone,Service Type,Message,Timestamp,Marketing Consent,Date Added\n');
    }

    // Parse customers and create CSV
    const csvHeaders = 'ID,Name,Email,Phone,Service Type,Message,Timestamp,Marketing Consent,Date Added\n';
    const csvRows = customerList
      .map((item: string) => {
        try {
          const customer = JSON.parse(item);
          return [
            customer.id || '',
            `"${(customer.name || '').replace(/"/g, '""')}"`,
            customer.email || '',
            customer.phone || '',
            `"${(customer.serviceType || '').replace(/"/g, '""')}"`,
            `"${(customer.message || '').replace(/"/g, '""')}"`,
            customer.timestamp || '',
            customer.marketingConsent ? 'Yes' : 'No',
            customer.dateAdded || '',
          ].join(',');
        } catch {
          return '';
        }
      })
      .filter((row: string) => row.length > 0)
      .join('\n');

    const csv = csvHeaders + csvRows;

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="customers_${new Date().toISOString().split('T')[0]}.csv"`);
    return res.status(200).send(csv);
  } catch (error) {
    console.error('Download error:', error);
    return res.status(500).json({ error: 'Failed to download customers' });
  }
}
