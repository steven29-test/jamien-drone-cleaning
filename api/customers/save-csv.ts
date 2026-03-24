// api/customers/save-csv.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from 'redis';

interface CustomerData {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  serviceType?: string;
  timestamp: string;
  marketingConsent: boolean;
  dateAdded: string;
}

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

async function sendEmailViaServiceAPI(customerData: CustomerData) {
  try {
    // Try using a free email service API instead
    // Using mailgun or sendgrid would be better, but for now using a simple approach
    
    // Log the attempt
    console.log(`[EMAIL] Attempting to send to info@jamiendrone.com.au for ${customerData.name}`);
    
    // For now, just log that we tried - email will be sent manually or via alternative service
    console.log(`[EMAIL] Customer inquiry stored: ${customerData.id}`);
    
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!process.env.VERCEL_KV_REST_API_URL) {
      return res.status(500).json({
        error: 'Storage not configured',
        details: 'Redis connection string is missing',
      });
    }

    const {
      id,
      name,
      email,
      phone,
      message,
      serviceType,
      timestamp,
      marketingConsent,
    } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const customer: CustomerData = {
      id,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim() || '',
      message: message.trim(),
      serviceType: serviceType?.trim() || '',
      timestamp,
      marketingConsent,
      dateAdded: new Date().toLocaleString(),
    };

    const customerJson = JSON.stringify(customer);
    const redis = await getRedisClient();

    try {
      await redis.set(`customer:${id}`, customerJson);
      await redis.lPush('customers:all', customerJson);
      if (marketingConsent) {
        await redis.lPush('customers:marketing', customerJson);
      }
    } catch (kvError) {
      console.error('Redis Storage error:', kvError);
      throw kvError;
    }

    console.log(`[CUSTOMER_SAVED] ID: ${id}, Email: ${email}`);

    // Attempt to send email (fire and forget)
    sendEmailViaServiceAPI(customer);

    return res.status(200).json({
      success: true,
      customerId: id,
      message: 'Customer data saved successfully. We will contact you shortly.',
      storage: 'redis',
    });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      details: String(error),
    });
  }
}
