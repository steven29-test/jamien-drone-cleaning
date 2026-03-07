// api/customers/marketing-contacts.ts (Vercel Function)
import { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

const MARKETING_CSV_PATH = path.join(process.cwd(), 'data', 'marketing-contacts.csv');

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!fs.existsSync(MARKETING_CSV_PATH)) {
      return res.status(200).json([]);
    }

    const csvContent = fs.readFileSync(MARKETING_CSV_PATH, 'utf-8');
    const lines = csvContent.trim().split('\n');

    if (lines.length <= 1) {
      return res.status(200).json([]);
    }

    // Parse CSV (simple parser)
    const contacts = lines.slice(1).map((line) => {
      const match = line.match(/"([^"]*)"/g) || [];
      return {
        email: match[0]?.replace(/"/g, '') || '',
        name: match[1]?.replace(/"/g, '') || '',
        phone: match[2]?.replace(/"/g, '') || '',
        serviceType: match[3]?.replace(/"/g, '') || '',
        signupDate: match[4]?.replace(/"/g, '') || '',
      };
    });

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(contacts);
  } catch (error) {
    console.error('Fetch error:', error);
    return res.status(500).json({ error: 'Failed to fetch marketing contacts' });
  }
}
