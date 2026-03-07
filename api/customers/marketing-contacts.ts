// api/customers/marketing-contacts.ts (CORRECTED - Extract hostname from Redis URL)
import { VercelRequest, VercelResponse } from '@vercel/node';

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
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const kvUrl = process.env.VERCEL_KV_REST_API_URL;
    const kvToken = process.env.VERCEL_KV_REST_API_TOKEN;

    if (!kvUrl || !kvToken) {
      return res.status(500).json({ error: 'Storage not configured' });
    }

    const restEndpoint = getRestEndpoint(kvUrl);

    // Get marketing opt-in customers from Vercel KV
    const lrangeUrl = `${restEndpoint}/lrange/customers:marketing/0/-1`;

    const response = await fetch(lrangeUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${kvToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Redis error: ${response.status}`);
    }

    const data = await response.json() as any;
    const marketingList = data.result || [];

    if (!marketingList || marketingList.length === 0) {
      return res.status(200).json([]);
    }

    // Parse and return as JSON
    const contacts = marketingList
      .map((item: string) => {
        try {
          const customer = JSON.parse(item);
          return {
            email: customer.email,
            name: customer.name,
            phone: customer.phone,
            serviceType: customer.serviceType,
            signupDate: customer.timestamp,
          };
        } catch {
          return null;
        }
      })
      .filter((item: any) => item !== null);

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(contacts);
  } catch (error) {
    console.error('Fetch error:', error);
    return res.status(500).json({ error: 'Failed to fetch marketing contacts' });
  }
}
