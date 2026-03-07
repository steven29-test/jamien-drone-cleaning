// api/customers/download-csv.ts (CORRECTED - Extract hostname from Redis URL)
import { VercelRequest, VercelResponse } from '@vercel/node';

// Parse Redis URL and convert to REST API endpoint
function getRestEndpoint(redisUrl: string): string {
  try {
    // Redis URL format: redis://default:PASSWORD@HOST:PORT
    const match = redisUrl.match(/redis:\/\/default:([^@]+)@([^:]+):(\d+)/);
    if (match) {
      const [, password, host, port] = match;
      // Vercel KV uses HTTPS REST API endpoint
      return `https://${host}:${port}`;
    }
  } catch (e) {
    console.error('Failed to parse Redis URL:', e);
  }
  // Fallback - try to use as-is
  return redisUrl.replace(/^redis:/, 'https:');
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

    const restEndpoint = getRestEndpoint(kvUrl);

    // Fetch all customers from Redis using LRANGE
    const lrangeUrl = `${restEndpoint}/lrange/customers:all/0/-1`;

    const response = await fetch(lrangeUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${kvToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Redis error: ${response.status}`);
    }

    const data = await response.json() as any;
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
