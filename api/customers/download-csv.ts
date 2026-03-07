// api/customers/download-csv.ts (Using native Redis client)
import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from 'redis';

let redisClient: any = null;

async function getRedisClient() {
  if (!redisClient) {
    redisClient = createClient({
      url: process.env.VERCEL_KV_REST_API_URL,
    });
    redisClient.on('error', (err: any) => console.log('Redis Client Error', err));
    await redisClient.connect();
  }
  return redisClient;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!process.env.VERCEL_KV_REST_API_URL) {
      return res.status(500).json({ error: 'Storage not configured' });
    }

    const redis = await getRedisClient();

    // Fetch all customers from Redis
    const customerList = await redis.lRange('customers:all', 0, -1);

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
