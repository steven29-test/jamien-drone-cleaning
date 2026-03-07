# Quick Start: Customer Data Capture

## What's Ready

✅ **Contact Form** - Updated with marketing consent checkbox  
✅ **CSV Storage** - No database needed  
✅ **Backend APIs** - Automatic data saving  
✅ **Download Feature** - Export customer data anytime  
✅ **Website** - Live at https://jamien-drone-cleaning.vercel.app/

---

## How Customer Data Works

### 1. Customer Submits Form
They fill out the contact form and optionally check "I consent to receive marketing emails"

### 2. Data Automatically Saved to CSV
- **`data/customers.csv`** - All inquiries
- **`data/marketing-contacts.csv`** - Marketing opt-ins only

### 3. You Download & Use the Data
- Open in Excel or Google Sheets
- Import to Mailchimp, HubSpot, or other marketing tools
- Track and follow up with customers

---

## Files Created

```
api/customers/
├── save-csv.ts              # Saves form data to CSV
├── download-csv.ts          # Download all customers
└── marketing-contacts.ts    # Get marketing opt-ins only

src/services/
└── csvService.ts            # Service functions for CSV handling

src/components/
└── ContactForm.tsx          # Updated contact form

data/
├── customers.csv            # All customer data (auto-created)
└── marketing-contacts.csv   # Marketing contacts (auto-created)

docs/
└── CSV_IMPLEMENTATION.md    # Full documentation
```

---

## How to Use

### A. Download Customer Data (Manual)

**Via Vercel Dashboard:**
1. Go to Vercel → Your Project
2. Click "Storage" → "Blob"
3. Find and download `customers.csv` or `marketing-contacts.csv`

**Via API:**
```bash
curl https://jamien-drone-cleaning.vercel.app/api/customers/download-csv \
  -o customers.csv
```

### B. Use in Excel

1. Download `customers.csv`
2. Open in Microsoft Excel or Google Sheets
3. View all customer information:
   - Name, Email, Phone
   - Service Type, Message
   - Timestamp, Marketing Consent
   - Date Added

### C. Use in Marketing Tools

**Mailchimp:**
1. Download `marketing-contacts.csv`
2. Go to Audience → Import
3. Upload CSV and map fields
4. Send marketing campaigns

**Google Sheets (Dashboard):**
1. Create new sheet
2. File → Import → Upload CSV
3. Create charts and pivot tables
4. Share with team

**HubSpot:**
1. Contacts → Import
2. Upload `customers.csv`
3. Map columns to properties
4. Track leads automatically

---

## CSV File Format

### customers.csv
```
ID,Name,Email,Phone,"Service Type",Message,Timestamp,"Marketing Consent","Date Added"
```

### marketing-contacts.csv
```
Email,Name,Phone,"Service Type","Signup Date"
```

---

## Marketing Workflow

```
Customer Submits Form
        ↓
Data Saved to CSV (instant)
        ↓
You Download CSV Weekly
        ↓
Import to Mailchimp/HubSpot
        ↓
Send Email Campaigns
        ↓
Track Opens & Clicks
        ↓
Follow Up on Leads
```

---

## Best Practices

1. **Backup Weekly**
   - Download CSV every Friday
   - Store in Google Drive or Dropbox
   - Keep offline copy

2. **Add Status Tracking**
   - Manually add "Status" column: new, contacted, converted
   - Add "Follow-up Date" and "Notes"
   - Track your pipeline

3. **Honor Consent**
   - Only email contacts with "Marketing Consent" = Yes
   - Include unsubscribe in all marketing emails
   - Delete opt-out addresses

4. **Monitor Performance**
   - Track conversion rate (leads → customers)
   - Measure response time
   - Calculate ROI per campaign

---

## Commands (if running locally)

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Push to Vercel (auto-deploys)
git push
```

---

## Testing

1. Go to https://jamien-drone-cleaning.vercel.app/
2. Scroll to "Get in Touch" contact form
3. Fill out form with:
   - Name: "Test Customer"
   - Email: "test@example.com"
   - Service: "Roof Cleaning"
   - Check "I consent to marketing emails"
   - Click "Send Message"
4. Check success message
5. Download CSV to verify data was saved

---

## FAQ

**Q: Where is my customer data stored?**
A: In CSV files (`data/customers.csv`) on Vercel's filesystem

**Q: Can I access the data without downloading?**
A: Yes, via API: `/api/customers/download-csv` or `/api/customers/marketing-contacts`

**Q: How often should I backup?**
A: Weekly recommended. Download every Friday to Google Drive

**Q: Can I import to Mailchimp directly?**
A: Yes. Download `marketing-contacts.csv` and import via Mailchimp's interface

**Q: What if I need to delete a customer?**
A: Edit the CSV file directly and re-upload to Vercel

**Q: Is my data secure?**
A: Yes. Data is stored on Vercel's secure servers with encryption

---

## Support

For full documentation, see: `docs/CSV_IMPLEMENTATION.md`

Questions? Check the documentation or review the code in:
- `src/services/csvService.ts` - Service logic
- `api/customers/save-csv.ts` - Backend API
- `src/components/ContactForm.tsx` - Frontend form

---

## Next Steps

1. ✅ Form is live - start capturing customers
2. 📥 Download CSVs weekly
3. 📊 Import to Excel/Sheets for analysis
4. 📧 Use for email marketing campaigns
5. 📈 Track conversions and ROI

**You're all set! Start collecting customer data now.**
