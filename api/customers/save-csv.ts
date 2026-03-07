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

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get Redis connection details from environment (Vercel KV uses VERCEL_ prefix)
    const kvUrl = process.env.VERCEL_KV_REST_API_URL;
    const kvToken = process.env.VERCEL_KV_REST_API_TOKEN;

    if (!kvUrl || !kvToken) {
      console.error('Missing KV environment variables');
      return res.status(500).json({
        error: 'Storage not configured',
        details: 'KV database connection details are missing',
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

    // Save to Redis via REST API
    try {
      // Store individual customer record
      await fetch(`${kvUrl}/set/customer:${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${kvToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(JSON.stringify(customer)),
      });

      // Add to customer list
      await fetch(`${kvUrl}/lpush/customers:all`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${kvToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(JSON.stringify(customer)),
      });

      // If marketing consent, also add to marketing list
      if (marketingConsent) {
        await fetch(`${kvUrl}/lpush/customers:marketing`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${kvToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(JSON.stringify(customer)),
        });
      }
    } catch (kvError) {
      console.error('KV Storage error:', kvError);
      throw kvError;
    }

    // Log for monitoring
    console.log(`[CUSTOMER_SAVED] ID: ${id}, Email: ${email}, Marketing: ${marketingConsent}`);

    return res.status(200).json({
      success: true,
      customerId: id,
      message: 'Customer data saved successfully to Vercel KV',
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
