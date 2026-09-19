// api/customers/save-csv.ts (With detailed logging)
import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@vercel/kv';
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

let transporter: any = null;

function getRedisClient() {
  const url = process.env.VERCEL_KV_REST_API_URL || process.env.KV_REST_API_URL;
  const token = process.env.VERCEL_KV_REST_API_TOKEN || process.env.KV_REST_API_TOKEN;

  if (!url || !token) return null;

  // Vercel KV/Upstash exposes an HTTPS REST endpoint. The previous node-redis
  // client expected a redis:// socket URL and stalled every form submission.
  return createClient({ url, token });
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
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 12000,
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
    
    if (!process.env.ZOHO_EMAIL || !process.env.ZOHO_PASSWORD) {
      console.error('[EMAIL] Zoho credentials are not configured');
      return res.status(503).json({
        error: 'The message service is temporarily unavailable. Please call 0435 116 503 or email sales@jamiendrone.com.au.',
      });
    }

    const escapeHtml = (value: string) => value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    // Email delivery is the primary purpose of this endpoint. Only report
    // success after Zoho accepts the message.
    try {
      const emailTransporter = getTransporter();
        
      const emailHtml = `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(customer.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(customer.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(customer.phone || 'N/A')}</p>
          <p><strong>Service:</strong> ${escapeHtml(customer.serviceType || 'Not specified')}</p>
          <p><strong>Marketing:</strong> ${customer.marketingConsent ? 'Yes' : 'No'}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(customer.message).replace(/\n/g, '<br>')}</p>
        `;

      const info = await emailTransporter.sendMail({
        from: `Jamien Drone Website <${process.env.ZOHO_EMAIL}>`,
        to: 'sales@jamiendrone.com.au',
        replyTo: customer.email,
        subject: `New Inquiry - ${customer.name}`,
        html: emailHtml,
      });

      console.log('[EMAIL] Email sent successfully:', info.messageId);
    } catch (emailError) {
      console.error('[EMAIL] Delivery failed:', emailError);
      return res.status(502).json({
        error: 'We could not send your message. Please call 0435 116 503 or email sales@jamiendrone.com.au.',
      });
    }

    // Keep a copy when KV is configured, but never lose an already-delivered
    // enquiry because optional storage is unavailable.
    const redis = getRedisClient();
    if (redis) {
      try {
        const customerJson = JSON.stringify(customer);
        await redis.set(`customer:${id}`, customerJson);
        await redis.lpush('customers:all', customerJson);
        if (marketingConsent) await redis.lpush('customers:marketing', customerJson);
      } catch (redisError) {
        console.error('[REDIS] Customer backup failed:', redisError);
      }
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
// Force redeploy 1774347933
