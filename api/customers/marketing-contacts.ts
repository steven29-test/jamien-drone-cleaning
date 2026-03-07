// api/customers/marketing-contacts.ts (CORRECTED - Using Vercel KV)
import { VercelRequest, VercelResponse } from '@vercel/node';
import { kv } from '@vercel/kv';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get marketing opt-in customers from Vercel KV
    const marketingList = await kv.lrange('customers:marketing', 0, -1);

    if (!marketingList || marketingList.length === 0) {
      return res.status(200).json([]);
    }

    // Parse and return as JSON
    const contacts = marketingList.map((item) => {
      const customer = JSON.parse(item as string);
      return {
        email: customer.email,
        name: customer.name,
        phone: customer.phone,
        serviceType: customer.serviceType,
        signupDate: customer.timestamp,
      };
    });

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(contacts);
  } catch (error) {
    console.error('Fetch error:', error);
    return res.status(500).json({ error: 'Failed to fetch marketing contacts' });
  }
}
