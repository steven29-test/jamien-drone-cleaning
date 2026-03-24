// api/customers/save-csv.ts (With detailed logging)
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
    console.log('[TRANSPORTER] Creating new transporter...');
    console.log('[TRANSPORTER] Host:', process.env.ZOHO_SMTP_HOST);
    console.log('[TRANSPORTER] Port:', process.env.ZOHO_SMTP_PORT);
    console.log('[TRANSPORTER] User:', process.env.ZOHO_EMAIL);
    console.log('[TRANSPORTER] Password:', process.env.ZOHO_PASSWORD ? '***SET***' : '***NOT SET***');
    
    transporter = nodemailer.createTransport({
      host: process.env.ZOHO_SMTP_HOST || 'smtp.zoho.com.au',
      port: parseInt(process.env.ZOHO_SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_PASSWORD,
      },
    });

    console.log('[TRANSPORTER] Created successfully');
  }
  return transporter;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  console.log('[HANDLER] Request received:', req.method);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('[HANDLER] Body:', JSON.stringify(req.body).substring(0, 100));
    
    const { id, name, email, phone, message, serviceType, timestamp, marketingConsent } = req.body;

    if (!name || !email || !message) {
      console.log('[HANDLER] Missing fields - name:', !!name, 'email:', !!email, 'message:', !!message);
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

    console.log('[CUSTOMER] Preparing to save:', customer.id);
    
    const customerJson = JSON.stringify(customer);
    const redis = await getRedisClient();

    // Save to Redis
    console.log('[REDIS] Saving customer...');
    await redis.set(`customer:${id}`, customerJson);
    await redis.lPush('customers:all', customerJson);
    if (marketingConsent) {
      await redis.lPush('customers:marketing', customerJson);
    }
    console.log('[REDIS] Customer saved successfully');

    // Send email NOW (wait for it to complete)
    if (process.env.ZOHO_EMAIL && process.env.ZOHO_PASSWORD) {
      console.log('[EMAIL] Credentials exist, attempting to send...');
      try {
        console.log('[EMAIL] Getting transporter...');
        const emailTransporter = getTransporter();
        
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

        console.log('[EMAIL] Sending mail...');
        const info = await emailTransporter.sendMail({
          from: process.env.ZOHO_EMAIL,
          to: 'sales@jamiendrone.com.au',
          subject: `New Inquiry - ${customer.name}`,
          html: emailHtml,
        });

        console.log('[EMAIL] Email sent successfully:', info.messageId);
      } catch (emailError) {
        console.error('[EMAIL] Error occurred:', emailError);
      }
    } else {
      console.log('[EMAIL] Credentials missing - ZOHO_EMAIL:', !!process.env.ZOHO_EMAIL, 'ZOHO_PASSWORD:', !!process.env.ZOHO_PASSWORD);
    }

    console.log('[HANDLER] Returning success response');
    return res.status(200).json({
      success: true,
      customerId: id,
      message: 'Inquiry received. We will contact you shortly!',
    });
  } catch (error) {
    console.error('[ERROR] Unexpected error:', error);
    return res.status(500).json({ error: 'Internal error' });
  }
}
