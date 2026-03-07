// api/customers/download-csv.ts (Vercel Function)
import { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

const CSV_FILE_PATH = path.join(process.cwd(), 'data', 'customers.csv');

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!fs.existsSync(CSV_FILE_PATH)) {
      return res.status(404).json({ error: 'No customer data found' });
    }

    const csvContent = fs.readFileSync(CSV_FILE_PATH, 'utf-8');

    // Set headers for file download
    res.setHeader('Content-Type', 'text/csv;charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="customers_${new Date().toISOString().split('T')[0]}.csv"`
    );

    return res.status(200).send(csvContent);
  } catch (error) {
    console.error('Download error:', error);
    return res.status(500).json({ error: 'Failed to download CSV' });
  }
}
