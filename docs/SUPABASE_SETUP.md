# Supabase Setup Guide for Customer Data

## Step 1: Create Supabase Account

1. Go to https://supabase.com
2. Sign up with email or GitHub
3. Create a new project
4. Select region closest to your users

## Step 2: Get API Keys

1. Go to Project Settings → API
2. Copy:
   - `ANON PUBLIC` key
   - `PROJECT URL`
   - `SERVICE_ROLE` key (keep secret!)

## Step 3: Create Tables

Go to SQL Editor and run:

```sql
-- Create customers table
CREATE TABLE customers (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
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
  notes TEXT
);

-- Create indexes for faster queries
CREATE INDEX idx_email ON customers(email);
CREATE INDEX idx_status ON customers(status);
CREATE INDEX idx_marketing ON customers(marketing_consent);
CREATE INDEX idx_created ON customers(created_at);

-- Create customer_interactions table
CREATE TABLE customer_interactions (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  customer_id VARCHAR(255) NOT NULL,
  interaction_type VARCHAR(50), -- 'email_sent', 'email_opened', 'call', 'quote_sent'
  interaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- Enable Row Level Security (RLS)
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_interactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Allow all inserts to customers" ON customers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated reads" ON customers FOR SELECT TO authenticated USING (true);
```

## Step 4: Setup Supabase Client

Create `lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  service_type?: string;
  timestamp: string;
  ip_address?: string;
  user_agent?: string;
  marketing_consent: boolean;
  status: string;
  created_at: string;
};
```

## Step 5: Update Backend API

Create `api/customers/save.ts` (Vercel Function):

```typescript
import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id, name, email, phone, message, serviceType, timestamp, ipAddress, userAgent, marketingConsent } = req.body;

    const { data, error } = await supabase.from('customers').insert([
      {
        id,
        name,
        email: email.toLowerCase(),
        phone,
        message,
        service_type: serviceType,
        timestamp,
        ip_address: ipAddress,
        user_agent: userAgent,
        marketing_consent: marketingConsent,
      },
    ]);

    if (error) throw error;

    return res.status(200).json({ success: true, customerId: id });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Failed to save customer' });
  }
}
```

## Step 6: Environment Variables

Add to `.env.local`:

```
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

Add to `.env` (backend):

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...
```

## Step 7: Test Connection

```typescript
import { supabase } from './lib/supabase';

const test = async () => {
  const { data, error } = await supabase.from('customers').select('*');
  console.log(data, error);
};
```

## Step 8: View Data in Dashboard

1. Go to Supabase Dashboard
2. Click "customers" table
3. View all submitted inquiries in real-time

## Useful Queries

```typescript
// Get all customers who opted in to marketing
const { data: marketingCustomers } = await supabase
  .from('customers')
  .select('*')
  .eq('marketing_consent', true);

// Get customers from last 7 days
const { data: recentCustomers } = await supabase
  .from('customers')
  .select('*')
  .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

// Get by service type
const { data: roofCleaners } = await supabase
  .from('customers')
  .select('*')
  .eq('service_type', 'Roof Cleaning');
```

## Backup & Export

1. Go to Project Settings → Backups
2. Enable daily backups
3. Export data to CSV via Supabase Dashboard → customers table → Export

Done! Your customer data is now safely stored and ready for marketing campaigns.
