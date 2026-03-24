// api/customers/save-csv.ts (Using Resend for email)
import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from 'redis';
import { Resend } from 'resend';

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
const resend = new Resend(process.env.RESEND_API_KEY);

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

async function sendEmailNotification(customerData: CustomerData) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn('[EMAIL] Resend API key not configured');
      return;
    }

    console.log('[EMAIL] Sending via Resend...');
    
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Customer ID:</strong> ${customerData.id}</p>
      <p><strong>Name:</strong> ${customerData.name}</p>
      <p><strong>Email:</strong> ${customerData.email}</p>
      <p><strong>Phone:</strong> ${customerData.phone || 'N/A'}</p>
      <p><strong>Service Type:</strong> ${customerData.serviceType || 'Not specified'}</p>
      <p><strong>Marketing Consent:</strong> ${customerData.marketingConsent ? 'Yes' : 'No'}</p>
      <hr />
      <p><strong>Message:</strong></p>
      <p>${customerData.message.replace(/\n/g, '<br>')}</p>
      <hr />
      <p><strong>Submitted:</strong> ${customerData.dateAdded}</p>
    `;

    const response = await resend.emails.send({
      from: 'Jamien Drone Cleaning <onboarding@resend.dev>',
      to: 'info@jamiendrone.com.au',
      subject: `New Inquiry - ${customerData.name}`,
      html: emailContent,
    });

    console.log(`[EMAIL] Success! Email ID: ${response.data?.id}`);
  } catch (error) {
    console.error('[EMAIL] Failed:', error);
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
      console.log(`[REDIS] Saving customer ${id}...`);
      await redis.set(`customer:${id}`, customerJson);
      await redis.lPush('customers:all', customerJson);

      if (marketingConsent) {
        await redis.lPush('customers:marketing', customerJson);
      }
      console.log(`[REDIS] Success`);
    } catch (kvError) {
      console.error('[REDIS] Error:', kvError);
      throw kvError;
    }

    console.log(`[CUSTOMER_SAVED] ID: ${id}, Email: ${email}, Marketing: ${marketingConsent}`);

    // Send email (fire and forget - don't wait)
    sendEmailNotification(customer);

    return res.status(200).json({
      success: true,
      customerId: id,
      message: 'Your inquiry has been received. We will contact you shortly!',
      storage: 'redis',
    });
  } catch (error) {
    console.error('[API] Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      details: String(error),
    });
  }
}
