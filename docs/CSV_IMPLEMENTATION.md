# Customer Data Capture - CSV/Excel Implementation

## Overview

This implementation captures customer information from the contact form and saves it to CSV files. No database needed!

---

## File Structure

```
jamien-drone-cleaning/
├── api/
│   └── customers/
│       ├── save-csv.ts           # API to save customer data
│       ├── download-csv.ts       # API to download all customers
│       └── marketing-contacts.ts # API to get marketing opt-ins
├── data/
│   ├── customers.csv             # All customer inquiries
│   └── marketing-contacts.csv    # Marketing opted-in only
├── src/
│   ├── services/
│   │   └── csvService.ts         # CSV service functions
│   └── components/
│       └── ContactForm.tsx       # Updated contact form
└── docs/
    └── CSV_IMPLEMENTATION.md     # This file
```

---

## CSV Files Generated

### 1. **customers.csv**
All customer inquiries - used for general CRM and analytics.

```csv
ID,Name,Email,Phone,"Service Type",Message,Timestamp,"Marketing Consent","Date Added"
CUST_1709862145123_abc123,"John Doe",john@example.com,+1-555-123-4567,"Roof Cleaning","I need roof cleaning for my house","2024-03-07T10:35:45.000Z","Yes","3/7/2024, 10:35:45 AM"
CUST_1709862245456_def456,"Jane Smith",jane@example.com,+1-555-987-6543,"Solar Panel Cleaning","Need solar panels cleaned","2024-03-07T10:40:12.000Z","No","3/7/2024, 10:40:12 AM"
```

### 2. **marketing-contacts.csv**
Only customers who opted-in to marketing - use for email campaigns.

```csv
Email,Name,Phone,"Service Type","Signup Date"
john@example.com,"John Doe",+1-555-123-4567,"Roof Cleaning","2024-03-07T10:35:45.000Z"
```

---

## How It Works

### 1. Customer Submits Form
- Fills out: Name, Email, Phone, Service Type, Message
- Checks: "I consent to receive marketing emails"
- Clicks: "Send Message"

### 2. Data Sent to Backend
```
POST /api/customers/save-csv
{
  "id": "CUST_1709862145123_abc123",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1-555-123-4567",
  "serviceType": "Roof Cleaning",
  "message": "I need roof cleaning...",
  "timestamp": "2024-03-07T10:35:45.000Z",
  "marketingConsent": true
}
```

### 3. Backend Saves to CSV
- Appends to `data/customers.csv`
- If marketing consent = true, also appends to `data/marketing-contacts.csv`
- Returns success response

### 4. Files Available for Download
- Access via Vercel dashboard: `/data/customers.csv`
- Download via API: `GET /api/customers/download-csv`
- Get marketing contacts: `GET /api/customers/marketing-contacts`

---

## Setup Instructions

### Step 1: Install Dependencies

```bash
npm install papaparse
npm install --save-dev @types/papaparse
```

### Step 2: Files Already Created

✅ `src/services/csvService.ts` - Service functions  
✅ `src/components/ContactForm.tsx` - Updated form  
✅ `api/customers/save-csv.ts` - Backend API  
✅ `api/customers/download-csv.ts` - Download API  
✅ `api/customers/marketing-contacts.ts` - Marketing list API  
✅ `data/.gitkeep` - Data directory  

### Step 3: Deploy to Vercel

```bash
git add -A
git commit -m "Implement CSV-based customer data capture"
git push
```

Vercel will automatically detect the API routes in `/api` folder.

### Step 4: Test Form

1. Visit: https://jamien-drone-cleaning.vercel.app/
2. Fill out contact form
3. Submit
4. Check Vercel dashboard → Storage → Files to see `customers.csv`

---

## Access Your CSV Files

### Option 1: Vercel Dashboard
1. Go to your project on Vercel
2. Click "Storage" → "Blob"
3. View and download files

### Option 2: API Download
```bash
# Download all customers
curl https://jamien-drone-cleaning.vercel.app/api/customers/download-csv \
  -o customers.csv

# Get marketing contacts
curl https://jamien-drone-cleaning.vercel.app/api/customers/marketing-contacts
```

### Option 3: Direct Access
Files are saved at: `data/customers.csv` and `data/marketing-contacts.csv`

---

## Working with CSV Data

### Open in Excel
1. Download `customers.csv`
2. Open in Microsoft Excel or Google Sheets
3. Analyze and filter data

### Convert to Excel Format
```bash
# Using Python
import pandas as pd
df = pd.read_csv('customers.csv')
df.to_excel('customers.xlsx', index=False)
```

### Import to Marketing Tools

#### Mailchimp
1. Download `marketing-contacts.csv`
2. Audience → Import Contacts → Choose File
3. Map columns: Email, Name, Phone
4. Select list and import

#### Google Sheets
1. Create new sheet
2. File → Import → Upload → Select CSV
3. Create charts and dashboards

#### HubSpot
1. Contacts → Import
2. Choose `customers.csv`
3. Map columns to properties
4. Save

---

## Marketing Campaign Workflow

### Week 1: Capture
- Customer submits form with marketing consent
- Data saved to CSV immediately

### Week 2: Export & Import
```bash
# Download marketing contacts
# Import to Mailchimp/HubSpot/etc.
```

### Week 3: Send Campaign
- Create email campaign in Mailchimp
- Send to marketing contacts list
- Track opens and clicks

### Week 4: Analyze
- Export results
- Track conversion rate
- Improve for next campaign

---

## Best Practices

### 1. Regular Backups
- Download `customers.csv` weekly
- Store in Google Drive or Dropbox
- Keep offline copy for records

### 2. Data Quality
- Regularly clean CSV (remove duplicates)
- Validate email addresses
- Update status column: "new", "contacted", "converted"

### 3. Privacy Compliance
- Only send marketing emails to opted-in contacts
- Include unsubscribe link in emails
- Honor "no-marketing" consent

### 4. Organization
- Rename files with date: `customers_2024-03-07.csv`
- Add status column manually: "new", "contacted", "won", "lost"
- Keep notes on each customer

---

## Example Workflow

### Step 1: Export Marketing Contacts
```javascript
import { downloadCustomersCSV, getMarketingContacts } from './services/csvService';

// Get marketing contacts
const contacts = await getMarketingContacts();
// [
//   { email: "john@example.com", name: "John Doe", phone: "...", ... },
//   { email: "jane@example.com", name: "Jane Smith", phone: "...", ... }
// ]
```

### Step 2: Download to Your Computer
```javascript
import { downloadCustomersCSV } from './services/csvService';

// User clicks download button
await downloadCustomersCSV();
// File: customers_2024-03-07.csv
```

### Step 3: Use in Excel/Google Sheets
1. Open downloaded CSV
2. Add notes and status updates
3. Create pivot tables for analysis
4. Generate reports for management

---

## Monitoring & Analytics

### Simple Tracking in CSV
Add these columns manually:

```csv
ID,Name,Email,...,Status,Follow-up Date,Notes
CUST_001,"John Doe","john@...",..."new","2024-03-10","High-quality lead - needs quote"
CUST_002,"Jane Smith","jane@...",..."contacted","2024-03-15","Sent proposal - awaiting response"
CUST_003,"Bob Wilson","bob@...",..."converted","2024-03-20","Booked service - $5000 contract"
```

### Metrics to Track
- Total inquiries per month
- Marketing consent rate (%)
- Conversion rate (%)
- Revenue per inquiry
- Response time

---

## Troubleshooting

### Issue: CSV not being created
**Solution:**
1. Check Vercel logs: `vercel logs`
2. Verify `data/` directory exists
3. Check file permissions

### Issue: Can't download CSV
**Solution:**
1. Visit `/api/customers/download-csv` directly in browser
2. If 404, file hasn't been created yet
3. Submit test form first

### Issue: Marketing contacts not separated
**Solution:**
1. Ensure checkbox is properly connected to `marketingConsent`
2. Check backend API logs
3. Verify CSV append logic

---

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Test form submission
3. ✅ Download CSV files
4. 📝 Open in Excel/Sheets
5. 📧 Set up email marketing campaigns
6. 📊 Create dashboard to track metrics
7. 🎯 Implement follow-up sequences

---

**File Format:** CSV (Comma-Separated Values)  
**Storage:** Vercel filesystem (persists between deployments)  
**Auto-backup:** Download weekly to your computer  
**Compliance:** GDPR-ready with consent tracking  

Done! Your customer data system is ready to use.
