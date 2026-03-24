// api/debug.ts - Debug endpoint to check environment variables
import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  return res.json({
    zoho_email: process.env.ZOHO_EMAIL ? '✓ Set' : '✗ Missing',
    zoho_password: process.env.ZOHO_PASSWORD ? '✓ Set' : '✗ Missing',
    zoho_host: process.env.ZOHO_SMTP_HOST || 'Not set',
    zoho_port: process.env.ZOHO_SMTP_PORT || 'Not set',
    redis_url: process.env.VERCEL_KV_REST_API_URL ? '✓ Set' : '✗ Missing',
    node_env: process.env.NODE_ENV,
  });
}
