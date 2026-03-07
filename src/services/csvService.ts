// src/services/csvService.ts
import Papa from 'papaparse';

export interface CustomerData {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  serviceType?: string;
  timestamp: string;
  marketingConsent: boolean;
}

export interface CSVResponse {
  success: boolean;
  error?: string;
  fileName?: string;
}

/**
 * Save customer information and generate CSV file
 */
export const saveCustomerToCSV = async (data: Omit<CustomerData, 'id' | 'timestamp'>): Promise<CSVResponse> => {
  try {
    const customerData: CustomerData = {
      id: generateCustomerId(),
      ...data,
      timestamp: new Date().toISOString(),
    };

    // Send to backend API to save CSV
    const response = await fetch('/api/customers/save-csv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    });

    if (!response.ok) {
      throw new Error('Failed to save customer data');
    }

    const result = await response.json();
    return { success: true, fileName: result.fileName };
  } catch (error) {
    console.error('Error saving customer data:', error);
    return { success: false, error: String(error) };
  }
};

/**
 * Download CSV file of all customers
 */
export const downloadCustomersCSV = async (): Promise<void> => {
  try {
    const response = await fetch('/api/customers/download-csv');
    if (!response.ok) {
      throw new Error('Failed to download CSV');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `customers_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading CSV:', error);
    throw error;
  }
};

/**
 * Convert customer data to CSV format
 */
export const convertToCSV = (customers: CustomerData[]): string => {
  const headers = [
    'ID',
    'Name',
    'Email',
    'Phone',
    'Message',
    'Service Type',
    'Timestamp',
    'Marketing Consent',
  ];

  const rows = customers.map((customer) => [
    customer.id,
    `"${customer.name}"`,
    customer.email,
    customer.phone,
    `"${customer.message.replace(/"/g, '""')}"`,
    customer.serviceType || '',
    customer.timestamp,
    customer.marketingConsent ? 'Yes' : 'No',
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  return csvContent;
};

/**
 * Helper: Generate unique customer ID
 */
function generateCustomerId(): string {
  return `CUST_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get marketing-opted-in customers for campaigns
 */
export const getMarketingContacts = async (): Promise<CustomerData[]> => {
  try {
    const response = await fetch('/api/customers/marketing-contacts');
    if (!response.ok) {
      throw new Error('Failed to fetch marketing contacts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching marketing contacts:', error);
    return [];
  }
};

/**
 * Export for email service (Mailchimp format)
 */
export const exportForMailchimp = async (): Promise<string> => {
  try {
    const customers = await getMarketingContacts();
    
    const mailchimpData = customers.map((c) => ({
      EMAIL: c.email,
      FNAME: c.name.split(' ')[0],
      LNAME: c.name.split(' ').slice(1).join(' '),
      PHONE: c.phone,
      INTERESTS: c.serviceType,
      SIGNUP_DATE: c.timestamp,
    }));

    return Papa.unparse(mailchimpData);
  } catch (error) {
    console.error('Error exporting for Mailchimp:', error);
    throw error;
  }
};
