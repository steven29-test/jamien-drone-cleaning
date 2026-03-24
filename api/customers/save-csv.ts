// api/customers/save-csv.ts (Using Zoho SMTP)
import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from 'redis';
import nodemailer from 'nodemailer';

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
let emailTransporter: any = null;

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

function getEmailTransporter() {
  if (!emailTransporter) {
    emailTransporter = nodemailer.createTransport({
      host: process.env.ZOHO_SMTP_HOST || 'smtp.zoho.com.au',
      port: parseInt(process.env.ZOHO_SMTP_PORT || '465'),
      secure: true, // true for port 465, false for 587
      auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_PASSWORD,
      },
    });
  }
  return emailTransporter;
}

async function sendEmailNotification(customerData: CustomerData) {
  try {
    if (!process.env.ZOHO_EMAIL || !process.env.ZOHO_PASSWORD) {
      console.warn('Zoho email configuration not set, skipping email notification');
      return;
    }

    const transporter = getEmailTransporter();

    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Customer ID:</strong> ${customerData.id}</p>
      <p><strong>Name:</strong> ${customerData.name}</p>
      <p><strong>Email:</strong> ${customerData.email}</p>
      <p><strong>Phone:</strong> ${customerData.phone || 'N/A'}</p>
      <p><strong>Service Type:</strong> ${customerData.serviceType || 'Not specified'}</p>
      <p><strong>Marketing Consent:</strong> ${customerData.marketingConsent ? 'Yes' : 'No'}</p>
      <p><strong>Message:</strong></p>
      <p>${customerData.message.replace(/\n/g, '<br>')}</p>
      <p><strong>Date Added:</strong> ${customerData.dateAdded}</p>
    `;

    await transporter.sendMail({
      from: process.env.ZOHO_EMAIL,
      to: 'info@jamiendrone.com.au',
      subject: `New Contact Form Submission - ${customerData.name}`,
      html: emailContent,
    });

    console.log(`Email sent for customer ${customerData.id}`);
  } catch (error) {
    console.error('Failed to send email notification:', error);
    // Don't throw - email failure shouldn't fail the entire request
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

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create customer record
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

    // Save to Redis
    try {
      // Store individual customer record
      await redis.set(`customer:${id}`, customerJson);

      // Add to customer list
      await redis.lPush('customers:all', customerJson);

      // If marketing consent, also add to marketing list
      if (marketingConsent) {
        await redis.lPush('customers:marketing', customerJson);
      }
    } catch (kvError) {
      console.error('Redis Storage error:', kvError);
      throw kvError;
    }

    // Log for monitoring
    console.log(`[CUSTOMER_SAVED] ID: ${id}, Email: ${email}, Marketing: ${marketingConsent}`);

    // Send email notification (async, don't wait for it)
    sendEmailNotification(customer).catch((error) =>
      console.error('Email notification failed:', error)
    );

    return res.status(200).json({
      success: true,
      customerId: id,
      message: 'Customer data saved successfully',
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
