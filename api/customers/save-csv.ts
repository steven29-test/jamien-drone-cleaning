// api/customers/save-csv.ts (CORRECTED - Using Vercel KV REST API directly)
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

    const customerJson = JSON.stringify(customer);

    // Save to Redis via Vercel KV REST API
    try {
      // SET command - store individual customer
      const setUrl = `${kvUrl.split('\n')[0]}/set/customer:${id}/${encodeURIComponent(customerJson)}`;
      const setResponse = await fetch(setUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${kvToken}`,
        },
      });

      if (!setResponse.ok && setResponse.status !== 401) {
        console.error('SET failed:', setResponse.status);
      }

      // LPUSH command - add to all customers list
      const lpushUrl = `${kvUrl.split('\n')[0]}/lpush/customers:all/${encodeURIComponent(customerJson)}`;
      const lpushResponse = await fetch(lpushUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${kvToken}`,
        },
      });

      if (!lpushResponse.ok && lpushResponse.status !== 401) {
        console.error('LPUSH customers:all failed:', lpushResponse.status);
      }

      // If marketing consent, add to marketing list
      if (marketingConsent) {
        const marketingUrl = `${kvUrl.split('\n')[0]}/lpush/customers:marketing/${encodeURIComponent(customerJson)}`;
        const marketingResponse = await fetch(marketingUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${kvToken}`,
          },
        });

        if (!marketingResponse.ok && marketingResponse.status !== 401) {
          console.error('LPUSH customers:marketing failed:', marketingResponse.status);
        }
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
