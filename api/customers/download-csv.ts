// api/customers/download-csv.ts (CORRECTED - Using Vercel KV via Upstash API)
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const kvToken = process.env.VERCEL_KV_REST_API_TOKEN;

    if (!kvToken) {
      return res.status(500).json({ error: 'Storage not configured' });
    }

    // Fetch all customers from Redis using Upstash API
    const response = await fetch('https://api.upstash.com/v3/redis/multi', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${kvToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        commands: [['LRANGE', 'customers:all', '0', '-1']],
      }),
    });

    if (!response.ok) {
      throw new Error(`Upstash error: ${response.status}`);
    }

    const data = await response.json() as any;
    const results = data.result || [];
    const customerList = (results[0] && results[0].result) || [];

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
