// api/customers/marketing-contacts.ts (Using native Redis client)
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

    // Get marketing opt-in customers from Redis
    const marketingList = await redis.lRange('customers:marketing', 0, -1);

    if (!marketingList || marketingList.length === 0) {
      return res.status(200).json([]);
    }

    // Parse and return as JSON
    const contacts = marketingList
      .map((item: string) => {
        try {
          const customer = JSON.parse(item);
          return {
            email: customer.email,
            name: customer.name,
            phone: customer.phone,
            serviceType: customer.serviceType,
            signupDate: customer.timestamp,
          };
        } catch {
          return null;
        }
      })
      .filter((item: any) => item !== null);

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(contacts);
  } catch (error) {
    console.error('Fetch error:', error);
    return res.status(500).json({ error: 'Failed to fetch marketing contacts' });
  }
}
