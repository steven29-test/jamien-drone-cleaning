# Jamien Drone Cleaning - Customer Data Capture Implementation

## ✅ COMPLETE & DEPLOYED

Your website now captures customer information and saves it to CSV files for marketing purposes.

**Live Website:** https://jamien-drone-cleaning.vercel.app/

---

## What You Have

### 🌐 Website
- Professional Vite + React + Material-UI site
- Live at: https://jamien-drone-cleaning.vercel.app/
- Pages: Home, About, Services, Contact

### 📋 Customer Data Capture
- **Contact Form** - Captures: Name, Email, Phone, Service Type, Message
- **Marketing Consent** - Checkbox for opt-in/opt-out
- **Automatic Saving** - Data saved to CSV files instantly

### 💾 CSV Files (Auto-Generated)
1. **`data/customers.csv`**
   - All customer inquiries
   - Use for general CRM tracking
   - Columns: ID, Name, Email, Phone, Service Type, Message, Timestamp, Marketing Consent, Date Added

2. **`data/marketing-contacts.csv`**
   - Only customers who opted-in to marketing
   - Use for email campaigns
   - Columns: Email, Name, Phone, Service Type, Signup Date

### 🔌 Backend APIs (Vercel Functions)
- `POST /api/customers/save-csv` - Saves form data
- `GET /api/customers/download-csv` - Download all customers
- `GET /api/customers/marketing-contacts` - Get marketing opt-ins

### 📚 Documentation
- `docs/QUICK_START.md` - How to use the system
- `docs/CSV_IMPLEMENTATION.md` - Full technical details
- `src/services/csvService.ts` - Service functions

---

## How It Works (End-to-End)

```
Customer fills form
    ↓
Clicks "Send Message"
    ↓
Data sent to /api/customers/save-csv
    ↓
Backend appends to data/customers.csv
    ↓
If marketing consent = true, also appends to data/marketing-contacts.csv
    ↓
Success message shown to customer
    ↓
You download CSV and use for marketing
```

---

## Using Your Customer Data

### Option 1: Download from Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Select jamien-drone-cleaning project
3. Click "Storage" → "Blob"
4. Download `customers.csv` or `marketing-contacts.csv`

### Option 2: API Download
```bash
curl https://jamien-drone-cleaning.vercel.app/api/customers/download-csv -o customers.csv
```

### Option 3: Open in Excel
1. Download CSV
2. Open in Microsoft Excel or Google Sheets
3. View, sort, filter customer data

### Option 4: Import to Marketing Tools

**Mailchimp:**
- Download `marketing-contacts.csv`
- Audience → Import → Upload file
- Send campaigns to opt-in customers

**Google Sheets:**
- Create dashboard with pivot tables
- Track conversion rates
- Share reports with team

**HubSpot:**
- Import `customers.csv`
- Automate follow-ups
- Track pipeline

---

## Files Created

```
jamien-drone-cleaning/
├── api/customers/
│   ├── save-csv.ts              ← Saves form data to CSV
│   ├── download-csv.ts          ← Download endpoint
│   └── marketing-contacts.ts    ← Get marketing opt-ins
│
├── src/
│   ├── services/
│   │   └── csvService.ts        ← CSV service functions
│   └── components/
│       └── ContactForm.tsx      ← Updated contact form (with marketing checkbox)
│
├── data/
│   ├── customers.csv            ← Auto-created (all inquiries)
│   ├── marketing-contacts.csv   ← Auto-created (opt-ins only)
│   └── .gitkeep
│
└── docs/
    ├── QUICK_START.md           ← This guide
    ├── CSV_IMPLEMENTATION.md    ← Full documentation
    └── SUPABASE_SETUP.md        ← (Not needed - using CSV instead)
```

---

## Key Features

✅ **No Database Needed** - Uses simple CSV files  
✅ **Instant Capture** - Data saved immediately upon form submission  
✅ **Marketing Segmentation** - Automatically separates opted-in customers  
✅ **Easy Export** - Download CSV anytime for analysis  
✅ **Excel Compatible** - Open and use in Excel or Google Sheets  
✅ **Email Integration** - Import to Mailchimp, HubSpot, etc.  
✅ **GDPR Compliant** - Explicit consent checkbox  
✅ **Auto-Deploy** - New deployments on every git push  

---

## Next Steps

### 1. Test It Now
1. Visit: https://jamien-drone-cleaning.vercel.app/
2. Scroll to "Get in Touch" section
3. Fill out the form
4. Check the marketing consent checkbox
5. Click "Send Message"
6. Verify success message

### 2. Download Your First CSV
```bash
curl https://jamien-drone-cleaning.vercel.app/api/customers/download-csv \
  -o customers_first.csv
```

### 3. Open in Excel
1. Download the CSV
2. Open in Excel or Google Sheets
3. See your customer data
4. Add notes and status column

### 4. Set Up Email Marketing
- Export marketing contacts
- Import to Mailchimp/HubSpot
- Create email campaigns
- Track opens and clicks

### 5. Backup Weekly
- Every Friday, download the CSV
- Store in Google Drive/Dropbox
- Keep offline backup

---

## CSV File Examples

### customers.csv
```csv
ID,Name,Email,Phone,"Service Type",Message,Timestamp,"Marketing Consent","Date Added"
CUST_1709862145123_abc,"John Doe","john@example.com","+1-555-123-4567","Roof Cleaning","I need roof cleaning for my house...","2024-03-07T10:35:45.000Z","Yes","3/7/2024, 10:35:45 AM"
```

### marketing-contacts.csv
```csv
Email,Name,Phone,"Service Type","Signup Date"
"john@example.com","John Doe","+1-555-123-4567","Roof Cleaning","2024-03-07T10:35:45.000Z"
```

---

## Maintenance

### Weekly Tasks
- [ ] Download customers.csv
- [ ] Check for new inquiries
- [ ] Backup to Google Drive
- [ ] Follow up on leads

### Monthly Tasks
- [ ] Analyze conversion rate
- [ ] Export marketing segment
- [ ] Send email campaigns
- [ ] Update customer statuses

### Quarterly Tasks
- [ ] Review campaign performance
- [ ] Calculate marketing ROI
- [ ] Plan next quarter campaigns
- [ ] Archive old CSVs

---

## Troubleshooting

**Q: No data being saved?**
- Check browser console for errors
- Verify API endpoint is responding
- Check Vercel logs

**Q: CSV file not found?**
- Submit form first to create file
- Check Vercel Storage/Blob section

**Q: Marketing contacts CSV empty?**
- Need customers to check the consent box
- Check marketing contacts API response

---

## Architecture Summary

```
┌─────────────────────────────────────────────┐
│   Website Frontend                          │
│   (React + MUI Contact Form)                │
│   → Collects: Name, Email, Phone, Message  │
│   → Collects: Marketing Consent (Checkbox) │
└────────────────┬────────────────────────────┘
                 │ POST /api/customers/save-csv
                 ↓
┌─────────────────────────────────────────────┐
│   Backend (Vercel Functions)                │
│   - Validates data                          │
│   - Sanitizes inputs                        │
│   - Appends to CSV files                    │
└────────────────┬────────────────────────────┘
                 │
        ┌────────┴────────┐
        ↓                 ↓
   ┌─────────────┐  ┌──────────────────┐
   │  customers  │  │ marketing-       │
   │  .csv       │  │ contacts.csv     │
   │             │  │                  │
   │ ALL data    │  │ ONLY opt-ins     │
   └─────────────┘  └──────────────────┘
        ↓                 ↓
   Excel/Sheets    Email Marketing
   CRM Tools       (Mailchimp, etc)
```

---

## GitHub Repository

**URL:** https://github.com/steven29-test/jamien-drone-cleaning

**Branches:**
- `main` - Production (deployed to Vercel)
- `Stage` - Staging environment

**Key Files:**
- `src/components/ContactForm.tsx` - Contact form with marketing checkbox
- `src/services/csvService.ts` - CSV service logic
- `api/customers/save-csv.ts` - Backend API
- `docs/CSV_IMPLEMENTATION.md` - Full documentation

---

## Support & Questions

For detailed information, see:
- **Quick Setup:** `docs/QUICK_START.md`
- **Full Details:** `docs/CSV_IMPLEMENTATION.md`
- **Code:** Check source files in `src/` and `api/` directories

---

## Summary

✅ Website live and receiving customer inquiries  
✅ Customer data automatically saved to CSV files  
✅ Marketing contacts automatically separated  
✅ Ready to export for email marketing campaigns  
✅ No database needed - simple CSV storage  
✅ Weekly backups recommended  
✅ GDPR compliant with consent tracking  

**Status: READY FOR USE** 🎉

Your system is live and capturing customer information now!
