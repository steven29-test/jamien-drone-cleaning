# Vercel KV Setup - Where Your Customer Data is Stored

## Answer to Your Questions

### 1. **Where are CSV files saved?**

**Answer: Vercel KV (Key-Value Storage) - a persistent Redis database**

- NOT on the filesystem (Vercel filesystem is ephemeral)
- NOT in a `.csv` file on the server (would be lost on redeploy)
- **STORED IN: Vercel KV** (persistent database that survives redeploys)

### 2. **URL for Domain Registration**

**Your main URL is FIXED:**
```
https://jamien-drone-cleaning.vercel.app
```

**You can also use custom domain:**
- Register your domain (e.g., jamiendronecleaning.com)
- In Vercel dashboard, add custom domain
- Points to same app

### 3. **Stage vs Production Branches**

**Current setup:**
- `main` branch → Production (deployed to jamien-drone-cleaning.vercel.app)
- `Stage` branch → Staging (can be deployed separately if needed)

**For domain registration:**
- Use the production URL: `jamien-drone-cleaning.vercel.app`
- Or register a custom domain and point it there

---

## How Data Storage Works Now

### Storage Architecture

```
Customer submits form
        ↓
Data sent to API: /api/customers/save-csv
        ↓
Backend saves to VERCEL KV (Redis Database)
        ↓
✅ Persistent storage (survives redeploys)
```

### Two Storage Locations in Vercel KV

1. **All Customers**
   - Key: `customers:all` (list)
   - Contains: All customer inquiries
   - Used for: General CRM, analytics

2. **Marketing Contacts**
   - Key: `customers:marketing` (list)
   - Contains: Only customers who opted-in
   - Used for: Email marketing campaigns

---

## Setup Instructions

### Step 1: Create Vercel KV Database

1. Go to https://vercel.com/dashboard
2. Click "Storage" → "Create Database"
3. Select "KV" → "Continue"
4. Choose region (closest to your users)
5. Name it: `jamien-drone-cleaning-kv`
6. Click "Create"

### Step 2: Copy Environment Variables

After creating KV:
1. Vercel automatically adds these to your project:
   - `VERCEL_KV_REST_API_URL`
   - `VERCEL_KV_REST_API_TOKEN`
   - `VERCEL_KV_ADMIN_REST_API_TOKEN`

2. Verify in Vercel Dashboard:
   - Project Settings → Environment Variables
   - Should see `VERCEL_KV_*` variables

### Step 3: Deploy

```bash
git add -A
git commit -m "feat: Use Vercel KV for persistent customer data storage"
git push
```

Vercel will automatically redeploy and use the KV database.

---

## Accessing Your Customer Data

### Option 1: Download CSV from Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Select jamien-drone-cleaning project
3. Click "Storage" → "KV"
4. View data in the database UI

### Option 2: API Download

```bash
curl "https://jamien-drone-cleaning.vercel.app/api/customers/download-csv" \
  -o customers.csv
```

This downloads all customers as CSV file.

### Option 3: Get Marketing Contacts Only

```bash
curl "https://jamien-drone-cleaning.vercel.app/api/customers/marketing-contacts"
```

Returns JSON array of marketing opt-in customers.

---

## CSV File Format (What You Download)

### Downloaded customers_YYYY-MM-DD.csv

```csv
ID,Name,Email,Phone,"Service Type",Message,Timestamp,"Marketing Consent","Date Added"
CUST_1709862145123_abc,"John Doe","john@example.com","+1-555-123-4567","Roof Cleaning","I need...","2024-03-07T10:35:45.000Z","Yes","3/7/2024, 10:35:45 AM"
```

---

## Data Persistence

### How Vercel KV Ensures Your Data Doesn't Disappear

1. **Automatic Backups** - Vercel backs up KV data daily
2. **High Availability** - Data replicated across multiple servers
3. **Survives Redeployments** - Data persists even when you push new code
4. **Survives Server Restarts** - Data is stored in Redis cluster, not on server

### Data Retention

- Default: Data kept indefinitely
- You can set TTL (time-to-live) if you want auto-deletion
- Currently: No TTL, data persists forever

---

## Domain Registration Guide

### Using Vercel's Default URL

**For testing/staging:**
```
https://jamien-drone-cleaning.vercel.app
```
- Works immediately (no domain registration needed)
- Free, no additional cost
- Good for testing before buying domain

### Using a Custom Domain

**If you want jamiendronecleaning.com or similar:**

1. Register domain at:
   - Namecheap.com
   - GoDaddy.com
   - Google Domains
   - Or your preferred registrar

2. In Vercel Dashboard:
   - Project → Domains
   - Add → Enter your custom domain
   - Follow Vercel's DNS setup instructions
   - Add CNAME record pointing to Vercel

3. Wait 24-48 hours for DNS propagation

**Result:** https://jamiendronecleaning.com points to your app

---

## Current URLs

### Production (Main Branch)
```
https://jamien-drone-cleaning.vercel.app/
```
- Status: ✅ Live now
- Use for: Domain registration (either as-is or add custom domain)
- Data stored in: Vercel KV

### Staging (Stage Branch)
```
Optional - can be deployed separately if needed
```
- Use for: Testing new features before production
- Same data storage as production

---

## Example Customer Data Flow

```
1. Customer fills form at:
   https://jamien-drone-cleaning.vercel.app/
   ↓
2. Clicks "Send Message"
   ↓
3. Data sent to API: /api/customers/save-csv
   ↓
4. Backend saves to Vercel KV:
   - customers:all → all records
   - customers:marketing → opted-in records
   ↓
5. You download anytime:
   GET /api/customers/download-csv
   ↓
6. Opens as CSV in Excel/Sheets for analysis
```

---

## Troubleshooting

### Q: "I can't access customer data"
**A:** Verify Vercel KV is created:
- Dashboard → Storage → KV
- Should show your database
- If missing, create it

### Q: "Data keeps disappearing after redeploy"
**A:** Verify KV environment variables:
- Settings → Environment Variables
- Should have `VERCEL_KV_REST_API_URL` and token
- If missing, recreate KV database

### Q: "How much does Vercel KV cost?"
**A:** 
- Free tier: Up to 100 commands/day
- Paid: $0.20 per 100K commands/month
- Your use case: Should be free (likely < 100 commands/day)

---

## Summary

| Question | Answer |
|----------|--------|
| Where stored? | Vercel KV (persistent Redis) |
| CSV file location? | Not on filesystem - in KV database |
| How to access? | Download via `/api/customers/download-csv` |
| URL for domain? | `jamien-drone-cleaning.vercel.app` |
| Custom domain? | Register domain, add to Vercel, point DNS to Vercel |
| Data persistence? | Yes, survives redeploys & server restarts |
| Cost? | Free for typical usage |

**Next step: Create Vercel KV database in your Vercel dashboard, then redeploy.**
