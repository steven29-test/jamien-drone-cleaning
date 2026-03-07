// api/customers/download-csv.ts (CORRECTED - Using Vercel KV)
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
    // Get all customers from Vercel KV
    const customerList = await kv.lrange('customers:all', 0, -1);

    if (!customerList || customerList.length === 0) {
      return res.status(200).send('ID,Name,Email,Phone,"Service Type",Message,Timestamp,"Marketing Consent","Date Added"\n');
    }

    // Convert to CSV format
    const csvLines = [
      'ID,Name,Email,Phone,"Service Type",Message,Timestamp,"Marketing Consent","Date Added"'
    ];

    for (const item of customerList) {
      const customer = JSON.parse(item as string);
      const csvLine = `"${customer.id}","${customer.name}","${customer.email}","${customer.phone}","${customer.serviceType}","${customer.message.replace(/"/g, '""')}","${customer.timestamp}","${customer.marketingConsent ? 'Yes' : 'No'}","${customer.dateAdded}"`;
      csvLines.push(csvLine);
    }

    const csvContent = csvLines.join('\n');

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
