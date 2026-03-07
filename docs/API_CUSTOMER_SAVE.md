// For Vercel Functions or Node.js Backend: api/customers/save.ts or api/customers/save.js

import { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../../lib/supabase'; // or your database

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
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
      ipAddress,
      userAgent,
      marketingConsent,
    } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Sanitize email
    const sanitizedEmail = email.toLowerCase().trim();

    // Save to database (Supabase, MongoDB, PostgreSQL, etc.)
    const { data, error } = await supabase
      .from('customers')
      .insert([
        {
          id,
          name: name.trim(),
          email: sanitizedEmail,
          phone: phone?.trim(),
          message: message.trim(),
          service_type: serviceType?.trim(),
          timestamp,
          ip_address: ipAddress,
          user_agent: userAgent,
          marketing_consent: marketingConsent,
          created_at: new Date().toISOString(),
          status: 'new', // new, contacted, converted
        },
      ])
      .select();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Failed to save customer data' });
    }

    // Log customer inquiry for audit
    console.log(`[CUSTOMER_INQUIRY] ID: ${id}, Email: ${sanitizedEmail}, Marketing: ${marketingConsent}`);

    // Trigger webhook for CRM integration (optional)
    if (process.env.WEBHOOK_URL) {
      fetch(process.env.WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: id,
          email: sanitizedEmail,
          name,
          marketingConsent,
          timestamp,
        }),
      }).catch(err => console.error('Webhook error:', err));
    }

    return res.status(200).json({
      success: true,
      customerId: id,
      message: 'Customer data saved successfully',
    });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
