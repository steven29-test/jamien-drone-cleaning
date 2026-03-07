// api/customers/marketing-contacts.ts (CORRECTED - Using Vercel KV via Upstash API)
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const kvToken = process.env.VERCEL_KV_REST_API_TOKEN;

    if (!kvToken) {
      return res.status(500).json({ error: 'Storage not configured' });
    }

    // Get marketing opt-in customers from Vercel KV via Upstash API
    const response = await fetch('https://api.upstash.com/v3/redis/multi', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${kvToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        commands: [['LRANGE', 'customers:marketing', '0', '-1']],
      }),
    });

    if (!response.ok) {
      throw new Error(`Upstash error: ${response.status}`);
    }

    const data = await response.json() as any;
    
    // Handle both response formats from Upstash
    let marketingList: any[] = [];
    
    if (Array.isArray(data.result)) {
      // Format 1: result is array of command results
      const commandResult = data.result[0];
      marketingList = (commandResult && commandResult.result) ? commandResult.result : (Array.isArray(commandResult) ? commandResult : []);
    } else if (data.result) {
      // Format 2: result is direct array
      marketingList = Array.isArray(data.result) ? data.result : [];
    }

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
    return res.status(500).json({ error: 'Failed to fetch marketing contacts', details: String(error) });
  }
}
