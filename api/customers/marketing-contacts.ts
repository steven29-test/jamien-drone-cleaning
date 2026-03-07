// api/customers/marketing-contacts.ts (CORRECTED - Using Vercel KV)
import { VercelRequest, VercelResponse } from '@vercel/node';

async function redisCommand(
  command: string,
  args: string[],
  kvUrl: string,
  kvToken: string
): Promise<any> {
  try {
    const endpoint = `${kvUrl.split('?')[0]}/${command}/${args.join('/')}`;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${kvToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Redis error: ${response.status} ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Redis command ${command} failed:`, error);
    throw error;
  }
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

    // Get marketing opt-in customers from Vercel KV via REST API
    const data = await redisCommand('lrange', ['customers:marketing', '0', '-1'], kvUrl, kvToken);
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
