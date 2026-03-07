// src/services/emailService.ts
import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');

export interface CustomerData {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  serviceType?: string;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
  marketingConsent: boolean;
}

export interface EmailResponse {
  success: boolean;
  customerId?: string;
  error?: string;
}

/**
 * Save customer information to backend database
 */
export const saveCustomerData = async (data: Omit<CustomerData, 'id' | 'timestamp' | 'ipAddress' | 'userAgent'>): Promise<EmailResponse> => {
  try {
    const customerData: CustomerData = {
      id: generateCustomerId(),
      ...data,
      timestamp: new Date().toISOString(),
      ipAddress: await getClientIP(),
      userAgent: navigator.userAgent,
    };

    // Send to backend API
    const response = await fetch('/api/customers/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    });

    if (!response.ok) {
      throw new Error('Failed to save customer data');
    }

    return { success: true, customerId: customerData.id };
  } catch (error) {
    console.error('Error saving customer data:', error);
    return { success: false, error: String(error) };
  }
};

/**
 * Send email notification to admin
 */
export const sendAdminEmail = async (data: CustomerData): Promise<EmailResponse> => {
  try {
    const response = await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', {
      from_name: data.name,
      from_email: data.email,
      phone: data.phone,
      message: data.message,
      to_email: process.env.REACT_APP_ADMIN_EMAIL,
    });

    if (response.status !== 200) {
      throw new Error('Failed to send email');
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: String(error) };
  }
};

/**
 * Send confirmation email to customer
 */
export const sendCustomerConfirmationEmail = async (email: string, name: string): Promise<EmailResponse> => {
  try {
    const response = await emailjs.send('SERVICE_ID', 'CONFIRMATION_TEMPLATE_ID', {
      to_email: email,
      customer_name: name,
    });

    if (response.status !== 200) {
      throw new Error('Failed to send confirmation email');
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return { success: false, error: String(error) };
  }
};

/**
 * Helper: Generate unique customer ID
 */
function generateCustomerId(): string {
  return `CUST_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Helper: Get client IP address
 */
async function getClientIP(): Promise<string | undefined> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Failed to get client IP:', error);
    return undefined;
  }
}

/**
 * Export customer data for marketing campaigns
 */
export const exportCustomerDataForMarketing = async (filters?: {
  startDate?: string;
  endDate?: string;
  marketingConsentOnly?: boolean;
}): Promise<CustomerData[]> => {
  try {
    const queryParams = new URLSearchParams();
    if (filters?.startDate) queryParams.append('startDate', filters.startDate);
    if (filters?.endDate) queryParams.append('endDate', filters.endDate);
    if (filters?.marketingConsentOnly) queryParams.append('marketingConsentOnly', 'true');

    const response = await fetch(`/api/customers/export?${queryParams.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to export customer data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error exporting customer data:', error);
    return [];
  }
};
