// api/customers/save-csv.ts (Vercel Function)
import { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';
import { parse as json2csv } from 'json2csv';

const CSV_FILE_PATH = path.join(process.cwd(), 'data', 'customers.csv');
const MARKETING_CSV_PATH = path.join(process.cwd(), 'data', 'marketing-contacts.csv');

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.dirname(CSV_FILE_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

interface CustomerData {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  serviceType?: string;
  timestamp: string;
  marketingConsent: boolean;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    ensureDataDir();

    const {
      id,
      name,
      email,
      phone,
      message,
      serviceType,
      timestamp,
      marketingConsent,
    }: CustomerData = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Sanitize data
    const customer = {
      ID: id,
      Name: name.trim(),
      Email: email.toLowerCase().trim(),
      Phone: phone?.trim() || '',
      'Service Type': serviceType?.trim() || '',
      Message: message.trim(),
      Timestamp: timestamp,
      'Marketing Consent': marketingConsent ? 'Yes' : 'No',
      'Date Added': new Date().toLocaleString(),
    };

    // Read existing CSV or create header
    let existingData: any[] = [];
    if (fs.existsSync(CSV_FILE_PATH)) {
      const csvContent = fs.readFileSync(CSV_FILE_PATH, 'utf-8');
      // Simple parsing (in production, use csv-parse library)
      existingData = csvContent.split('\n').length - 1; // rough count
    }

    // Append to CSV file
    const csvLine = `"${customer.ID}","${customer.Name}","${customer.Email}","${customer.Phone}","${customer['Service Type']}","${customer.Message.replace(/"/g, '""')}","${customer.Timestamp}","${customer['Marketing Consent']}","${customer['Date Added']}"`;

    // Write header if file doesn't exist
    if (!fs.existsSync(CSV_FILE_PATH)) {
      const header = 'ID,Name,Email,Phone,"Service Type",Message,Timestamp,"Marketing Consent","Date Added"\n';
      fs.writeFileSync(CSV_FILE_PATH, header);
    }

    // Append new customer
    fs.appendFileSync(CSV_FILE_PATH, csvLine + '\n');

    // If marketing consent, also save to marketing list
    if (marketingConsent) {
      const marketingLine = `"${customer.Email}","${customer.Name}","${customer.Phone}","${customer['Service Type']}","${customer.Timestamp}"`;

      if (!fs.existsSync(MARKETING_CSV_PATH)) {
        const header = 'Email,Name,Phone,"Service Type",Signup Date\n';
        fs.writeFileSync(MARKETING_CSV_PATH, header);
      }

      fs.appendFileSync(MARKETING_CSV_PATH, marketingLine + '\n');
    }

    // Log for monitoring
    console.log(`[CUSTOMER_SAVED] ID: ${id}, Email: ${email}, Marketing: ${marketingConsent}`);

    return res.status(200).json({
      success: true,
      customerId: id,
      message: 'Customer data saved successfully',
      fileName: 'customers.csv',
    });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal server error', details: String(error) });
  }
}
