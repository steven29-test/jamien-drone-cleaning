// api/customers/save-csv.ts (CORRECTED - Using Vercel KV for persistent storage)
import { VercelRequest, VercelResponse } from '@vercel/node';

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

// Make Redis API call via Upstash

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const kvToken = process.env.VERCEL_KV_REST_API_TOKEN;

    if (!kvToken) {
      console.error('Missing KV token');
      return res.status(500).json({
        error: 'Storage not configured',
        details: 'KV database token is missing',
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

    // Save to Redis via Upstash REST API
    try {
      // Execute commands via Upstash
      await fetch('https://api.upstash.com/v3/redis/multi', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${kvToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commands: [
            ['SET', `customer:${id}`, customerJson],
            ['LPUSH', 'customers:all', customerJson],
            marketingConsent ? ['LPUSH', 'customers:marketing', customerJson] : null,
          ].filter(Boolean)
        }),
      });
    } catch (kvError) {
      console.error('KV Storage error:', kvError);
      throw kvError;
    }

    // Log for monitoring
    console.log(`[CUSTOMER_SAVED] ID: ${id}, Email: ${email}, Marketing: ${marketingConsent}`);

    return res.status(200).json({
      success: true,
      customerId: id,
      message: 'Customer data saved successfully',
      storage: 'vercel-kv',
    });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      details: String(error),
    });
  }
}
