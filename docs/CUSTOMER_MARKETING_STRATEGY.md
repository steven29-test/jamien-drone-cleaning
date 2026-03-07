# Customer Data Capture & Marketing Strategy
## Jamien Drone Cleaning

---

## Overview

This document outlines a professional approach to capture customer information from contact form submissions and save it for marketing purposes while maintaining privacy and compliance.

---

## Architecture

### Components

1. **Frontend Contact Form** (`src/components/ContactForm.tsx`)
   - Collects: Name, Email, Phone, Service Type, Message
   - Captures: Marketing Consent, Timestamp, IP Address, User Agent
   - Validates input before submission
   - Shows success/error feedback

2. **Email Service** (`src/services/emailService.ts`)
   - Saves customer data to backend
   - Sends admin notification email
   - Sends customer confirmation email
   - Tracks customer data lifecycle

3. **Backend API** (Vercel Function or Node.js)
   - Validates and sanitizes data
   - Stores in database
   - Integrates with CRM/Webhooks
   - Logs for audit trail

4. **Database** (Supabase, MongoDB, PostgreSQL, etc.)
   - Stores customer records
   - Tracks customer journey
   - Enables marketing segmentation

---

## Customer Data Structure

```typescript
{
  id: "CUST_1709862145123_abc123def",
  name: "John Doe",
  email: "john@example.com",
  phone: "+1-555-123-4567",
  message: "I need roof cleaning for my house",
  serviceType: "Roof Cleaning",
  timestamp: "2024-03-07T10:35:45.000Z",
  ipAddress: "192.168.1.100",
  userAgent: "Mozilla/5.0...",
  marketingConsent: true,
  status: "new", // new, contacted, converted
  created_at: "2024-03-07T10:35:45.000Z"
}
```

---

## Setup Instructions

### 1. Database Setup (Supabase Example)

```sql
CREATE TABLE customers (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  message TEXT NOT NULL,
  service_type VARCHAR(100),
  timestamp TIMESTAMP NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  marketing_consent BOOLEAN DEFAULT FALSE,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  INDEX idx_email (email),
  INDEX idx_status (status),
  INDEX idx_marketing (marketing_consent),
  INDEX idx_created (created_at)
);

CREATE TABLE customer_emails (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  customer_id VARCHAR(255) NOT NULL,
  email_type VARCHAR(50) NOT NULL, -- 'inquiry', 'confirmation', 'followup'
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  opened_at TIMESTAMP,
  clicked_at TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE marketing_campaigns (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  segment VARCHAR(100) NOT NULL, -- 'all', 'high-intent', 'marketing-opted-in'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  sent_count INT DEFAULT 0,
  opened_count INT DEFAULT 0
);
```

### 2. Environment Variables

```bash
# .env.local
REACT_APP_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
REACT_APP_ADMIN_EMAIL=admin@jamiendronecleaning.com
REACT_APP_API_URL=https://jamien-drone-cleaning.vercel.app/api

# Backend (.env)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_key
WEBHOOK_URL=https://your-crm.com/webhook
SENDGRID_API_KEY=your_sendgrid_key (optional)
```

### 3. EmailJS Setup

1. Create account at https://www.emailjs.com/
2. Set up service (Gmail, Outlook, etc.)
3. Create email templates:
   - **Admin Notification**: Alert admin of new inquiry
   - **Customer Confirmation**: Confirm receipt to customer
   - **Follow-up**: Automated follow-up after 3 days

### 4. Install Dependencies

```bash
npm install @emailjs/browser
npm install @supabase/supabase-js  # if using Supabase
```

---

## Marketing Strategy

### Segmentation

**Segment 1: All Contacts**
- Everyone who submits the form
- Use for general analytics

**Segment 2: Marketing Opted-In**
- Only those who checked "I consent to marketing emails"
- Use for promotional campaigns

**Segment 3: High-Intent Customers**
- Submitted multiple inquiries
- Mentioned specific services
- Follow up with targeted offers

**Segment 4: Converted Customers**
- Customers who became paying clients
- Use for testimonials, referral programs

### Email Campaigns

1. **Immediate (0 mins)**
   - Send confirmation email
   - Admin receives alert

2. **Day 1**
   - Send service information packet

3. **Day 3**
   - Auto follow-up if no response

4. **Day 7**
   - Special offer/discount

5. **Monthly**
   - Newsletter with tips & seasonal offers

---

## Data Export for Marketing

Export customer data for marketing tools (Mailchimp, HubSpot, etc.):

```typescript
// Export customers who opted-in to marketing
const customers = await exportCustomerDataForMarketing({
  marketingConsentOnly: true,
  startDate: '2024-01-01'
});

// Format for Mailchimp/other tools
const csvData = customers.map(c => ({
  email: c.email,
  firstName: c.name.split(' ')[0],
  lastName: c.name.split(' ')[1],
  phone: c.phone,
  interests: c.serviceType,
  dateAdded: c.timestamp
}));
```

---

## Privacy & Compliance

### GDPR Compliance
- ✅ Marketing consent is explicitly captured
- ✅ Easy opt-out mechanism in emails
- ✅ Data retention policy: Delete after 2 years if inactive
- ✅ CCPA-compliant data collection

### Data Security
- All data transmitted over HTTPS
- Database encryption enabled
- Regular backups
- Access logs maintained
- No third-party sharing without consent

### Privacy Policy Addition
```
We collect contact information to respond to your inquiry and, 
if you consent, to send you marketing communications about our services. 
You can opt out at any time by clicking "unsubscribe" in our emails.
```

---

## Monitoring & Analytics

### Key Metrics

```typescript
// Dashboard queries
const totalInquiries = await getCount('customers'); // 245
const marketingOptIn = await getCount('customers', { marketing_consent: true }); // 180
const conversionRate = convertedCount / totalInquiries; // 22%
const responseTime = avgResponseTime(); // 4.2 hours
const emailOpenRate = openedEmails / sentEmails; // 35%
```

### Reports

1. **Weekly**: New inquiries, response metrics
2. **Monthly**: Segmentation analysis, conversion rates
3. **Quarterly**: Campaign ROI, customer lifetime value

---

## Implementation Checklist

- [ ] Set up database tables
- [ ] Configure environment variables
- [ ] Set up EmailJS account
- [ ] Implement backend API endpoint
- [ ] Update ContactForm component
- [ ] Test form submission end-to-end
- [ ] Set up email templates
- [ ] Configure CRM webhook integration
- [ ] Add privacy policy to website
- [ ] Set up analytics dashboard
- [ ] Create marketing email sequences
- [ ] Test GDPR/CCPA compliance
- [ ] Train team on customer data handling
- [ ] Set up data retention policy

---

## Support & Troubleshooting

### Common Issues

1. **Emails not sending**
   - Check EmailJS credentials
   - Verify SMTP settings
   - Check spam folder

2. **Data not saving**
   - Verify database connection
   - Check API logs
   - Validate form data

3. **Marketing consent not recorded**
   - Check checkbox binding
   - Verify database field
   - Check form submission logic

---

## Future Enhancements

- [ ] SMS notifications
- [ ] WhatsApp integration
- [ ] Customer portal to view quotes
- [ ] Automated quote generation
- [ ] CRM integration (HubSpot, Pipedrive)
- [ ] A/B testing for email campaigns
- [ ] Customer feedback surveys
- [ ] NPS tracking

---

**Document Version:** 1.0  
**Last Updated:** March 2024  
**Owner:** Jamien Drone Cleaning Marketing Team
