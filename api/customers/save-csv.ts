// api/customers/save-csv.ts (CORRECTED - Using Vercel KV for persistent storage)
import { VercelRequest, VercelResponse } from '@vercel/node';
import { kv } from '@vercel/kv';

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

    // Save to Vercel KV (persistent storage)
    // Store individual customer record
    await kv.set(`customer:${id}`, JSON.stringify(customer));

    // Add to customer list for easy retrieval
    await kv.lpush('customers:all', JSON.stringify(customer));

    // If marketing consent, also add to marketing list
    if (marketingConsent) {
      await kv.lpush('customers:marketing', JSON.stringify(customer));
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
      storageNote: 'Make sure VERCEL_KV_REST_API_URL and VERCEL_KV_REST_API_TOKEN are set in environment'
    });
  }
}
