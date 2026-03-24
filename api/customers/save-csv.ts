// api/customers/save-csv.ts (Simpler approach - save then respond)
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
let transporter: any = null;

async function getRedisClient() {
  if (!redisClient) {
    redisClient = createClient({
      url: process.env.VERCEL_KV_REST_API_URL,
    });
    redisClient.on('error', (err: any) => console.log('Redis Error', err));
    await redisClient.connect();
  }
  return redisClient;
}

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com.au',
      port: 587,
      secure: false,
      auth: {
        user: process.env.ZOHO_EMAIL || 'sales@jamiendrone.com.au',
        pass: process.env.ZOHO_PASSWORD,
      },
      logger: true,
      debug: true,
    });
  }
  return transporter;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id, name, email, phone, message, serviceType, timestamp, marketingConsent } = req.body;

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

    // Save to Redis
    await redis.set(`customer:${id}`, customerJson);
    await redis.lPush('customers:all', customerJson);
    if (marketingConsent) {
      await redis.lPush('customers:marketing', customerJson);
    }

    // Send email NOW (wait for it to complete)
    if (process.env.ZOHO_EMAIL && process.env.ZOHO_PASSWORD) {
      try {
        const transporter = getTransporter();
        
        const emailHtml = `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${customer.name}</p>
          <p><strong>Email:</strong> ${customer.email}</p>
          <p><strong>Phone:</strong> ${customer.phone || 'N/A'}</p>
          <p><strong>Service:</strong> ${customer.serviceType || 'Not specified'}</p>
          <p><strong>Marketing:</strong> ${customer.marketingConsent ? 'Yes' : 'No'}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${customer.message.replace(/\n/g, '<br>')}</p>
        `;

        const info = await transporter.sendMail({
          from: process.env.ZOHO_EMAIL,
          to: 'info@jamiendrone.com.au',
          subject: `New Inquiry - ${customer.name}`,
          html: emailHtml,
        });

        console.log('Email sent:', info.messageId);
      } catch (emailError) {
        console.error('Email error:', emailError);
        // Still return success since data was saved to Redis
      }
    }

    return res.status(200).json({
      success: true,
      customerId: id,
      message: 'Inquiry received. We will contact you shortly!',
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal error' });
  }
}
