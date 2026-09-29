import emailjs from '@emailjs/browser';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  schoolName: string;
  role: string;
  studentCount: string;
  subject: string;
  message: string;
  ticketId: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone?: string;
  schoolName?: string;
  studentCount?: string;
  message?: string;
  moduleName?: string;
  ticketId?: string;
}

export interface EmailServiceResult {
  success: boolean;
  message: string;
  ticketId: string;
}

// Retrieve environment credentials
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Validates that the necessary EmailJS environment variables are set.
 */
const checkConfig = (ticketId: string): EmailServiceResult | null => {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.error('EmailJS configuration error: Missing environment variables', {
      serviceId: !!SERVICE_ID,
      templateId: !!TEMPLATE_ID,
      publicKey: !!PUBLIC_KEY
    });
    return {
      success: false,
      message: 'Email service is not properly configured. Please check your environment variables.',
      ticketId
    };
  }
  return null;
};

/**
 * Sends a contact form email directly via EmailJS without any backend API.
 */
export const sendContactEmail = async (
  formData: ContactFormData
): Promise<EmailServiceResult> => {
  const configError = checkConfig(formData.ticketId);
  if (configError) return configError;

  // Template parameters mapped to common EmailJS template placeholders
  const templateParams: Record<string, unknown> = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    school_name: formData.schoolName,
    schoolName: formData.schoolName,
    role: formData.role,
    student_count: formData.studentCount,
    studentCount: formData.studentCount,
    subject: formData.subject || 'New Contact Request - INGO Schools',
    message: formData.message,
    ticket_id: formData.ticketId,
    ticketId: formData.ticketId,
    from_name: formData.name,
    from_email: formData.email,
    reply_to: formData.email
  };

  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    if (response.status === 200 || response.text === 'OK') {
      return {
        success: true,
        message: 'Thank you! Your message has been sent successfully. We will contact you soon.',
        ticketId: formData.ticketId
      };
    }

    return {
      success: false,
      message: 'Failed to send message. Please try again or contact us directly.',
      ticketId: formData.ticketId
    };
  } catch (error: any) {
    console.error('EmailJS error:', error);
    const errorMessage =
      error?.text ||
      error?.message ||
      'Unable to send message via EmailJS. Please try again.';

    return {
      success: false,
      message: errorMessage,
      ticketId: formData.ticketId
    };
  }
};

/**
 * Sends a demo inquiry / Book Now email directly via EmailJS without any backend API.
 */
export const sendBookingInquiry = async (
  formData: BookingFormData
): Promise<EmailServiceResult> => {
  const ticketId =
    formData.ticketId || `INGO-DEMO-${Math.floor(100000 + Math.random() * 900000)}`;

  const configError = checkConfig(ticketId);
  if (configError) return configError;

  const validModuleName = typeof formData.moduleName === 'string' && formData.moduleName.trim()
    ? formData.moduleName.trim()
    : undefined;

  const subject = validModuleName
    ? `Demo Inquiry: ${validModuleName} - INGO Schools`
    : 'New VIP Demo Walkthrough Request - INGO Schools';

  const templateParams: Record<string, unknown> = {
    name: String(formData.name || ''),
    email: String(formData.email || ''),
    phone: String(formData.phone || 'Not provided'),
    school_name: String(formData.schoolName || 'Not specified'),
    schoolName: String(formData.schoolName || 'Not specified'),
    student_count: String(formData.studentCount || '100-500'),
    studentCount: String(formData.studentCount || '100-500'),
    module_name: validModuleName || 'Interactive ERP Walkthrough',
    moduleName: validModuleName || 'Interactive ERP Walkthrough',
    subject,
    message:
      String(formData.message || '') ||
      `Request for ${validModuleName ? `${validModuleName} module` : 'personalized VIP Demo'} walkthrough.`,
    ticket_id: ticketId,
    ticketId,
    from_name: String(formData.name || ''),
    from_email: String(formData.email || ''),
    reply_to: String(formData.email || '')
  };

  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    if (response.status === 200 || response.text === 'OK') {
      return {
        success: true,
        message: 'Thank you! Your demo request has been sent successfully.',
        ticketId
      };
    }

    return {
      success: false,
      message: 'Failed to send demo request. Please try again or contact us directly.',
      ticketId
    };
  } catch (error: any) {
    console.error('EmailJS Booking error:', error);
    const errorMessage =
      error?.text ||
      error?.message ||
      'Unable to submit demo inquiry via EmailJS. Please try again.';

    return {
      success: false,
      message: errorMessage,
      ticketId
    };
  }
};
