// api/customers/save-csv.ts (CORRECTED - Extract hostname from Redis URL)
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

// Parse Redis URL and convert to REST API endpoint
function getRestEndpoint(redisUrl: string): string {
  try {
    // Redis URL format: redis://default:PASSWORD@HOST:PORT
    const match = redisUrl.match(/redis:\/\/default:([^@]+)@([^:]+):(\d+)/);
    if (match) {
      const [, password, host, port] = match;
      // Vercel KV uses HTTPS REST API endpoint
      return `https://${host}:${port}`;
    }
  } catch (e) {
    console.error('Failed to parse Redis URL:', e);
  }
  // Fallback - try to use as-is
  return redisUrl.replace(/^redis:/, 'https:');
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
    const restEndpoint = getRestEndpoint(kvUrl);

    // Save to Redis via REST API
    try {
      // SET command - store individual customer
      const setUrl = `${restEndpoint}/set/customer:${id}/${encodeURIComponent(customerJson)}`;
      await fetch(setUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${kvToken}`,
        },
      });

      // LPUSH command - add to all customers list
      const lpushUrl = `${restEndpoint}/lpush/customers:all/${encodeURIComponent(customerJson)}`;
      await fetch(lpushUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${kvToken}`,
        },
      });

      // If marketing consent, add to marketing list
      if (marketingConsent) {
        const marketingUrl = `${restEndpoint}/lpush/customers:marketing/${encodeURIComponent(customerJson)}`;
        await fetch(marketingUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${kvToken}`,
          },
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
