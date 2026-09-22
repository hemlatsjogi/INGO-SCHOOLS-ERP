import { sendContactEmail, sendVisitorConfirmationEmail } from '../services/email.service.js';

// Phone regex: Exactly 10 digits, cannot start with 0
const PHONE_REGEX = /^[1-9]\d{9}$/;

// Inquiries & Contact storage
const inquiries = [];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Handles Contact Form submissions with validation, sanitization, and email notification.
 */
export const submitContact = async (req, res) => {
  try {
    const {
      name = '',
      email = '',
      phone = '',
      schoolName = '',
      role = '',
      studentCount = '',
      subject = '',
      message = '',
      ticketId: clientTicketId
    } = req.body || {};

    const cleanName = typeof name === 'string' ? name.trim() : '';
    const cleanEmail = typeof email === 'string' ? email.trim() : '';
    const cleanPhone = typeof phone === 'string' ? phone.trim() : '';
    const cleanSchoolName = typeof schoolName === 'string' ? schoolName.trim() : '';
    const cleanRole = typeof role === 'string' ? role.trim() : '';
    const cleanStudentCount = typeof studentCount === 'string' ? studentCount.trim() : '';
    const cleanSubject = typeof subject === 'string' ? subject.trim() : '';
    const cleanMessage = typeof message === 'string' ? message.trim() : '';

    // Required Field Validation
    if (!cleanName || cleanName.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Name is required (minimum 2 characters).'
      });
    }

    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: 'A valid email address is required.'
      });
    }

    if (!cleanMessage || cleanMessage.length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a message so we can best assist you.'
      });
    }

    if (!cleanPhone || !PHONE_REGEX.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid 10-digit Indian mobile number (cannot start with 0).'
      });
    }

    // Fixed format +91 for India
    const formattedPhone = `+91${cleanPhone}`;

    const ticketId = clientTicketId && typeof clientTicketId === 'string'
      ? clientTicketId
      : `INGO-${Math.floor(100000 + Math.random() * 900000)}`;

    const contactEntry = {
      id: `cnt_${Date.now()}`,
      ticketId,
      name: cleanName,
      email: cleanEmail,
      phone: formattedPhone,
      schoolName: cleanSchoolName || 'Not specified',
      role: cleanRole || 'Principal / Administrator',
      studentCount: cleanStudentCount || 'Not specified',
      subject: cleanSubject || 'Contact Form Inquiry',
      message: cleanMessage,
      createdAt: new Date().toISOString()
    };

    inquiries.push(contactEntry);

    // Send email notification to Ingoschoolerp@gmail.com
    await sendContactEmail(contactEntry);

    // Send confirmation email to the visitor
    try {
      await sendVisitorConfirmationEmail(contactEntry);
    } catch (err) {
      console.warn('[API Controller] Visitor confirmation email failed, but inquiry recorded and admin notified:', err.message);
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully. We will contact you soon.',
      ticketId
    });
  } catch (error) {
    console.error('[API Controller] Error processing contact submission:', error.message || error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again or contact us directly.'
    });
  }
};

export const submitInquiry = async (req, res) => {
  try {
    const { name, email, phone, schoolName, studentCount, message, type = 'DEMO_REQUEST', ticketId } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required to submit an inquiry.'
      });
    }

    const assignedTicket = ticketId || `INGO-${Math.floor(100000 + Math.random() * 900000)}`;

    const newInquiry = {
      id: `inq_${Date.now()}`,
      ticketId: assignedTicket,
      name: String(name).trim(),
      email: String(email).trim(),
      phone: phone ? String(phone).trim() : '',
      schoolName: schoolName ? String(schoolName).trim() : 'Not specified',
      studentCount: studentCount ? String(studentCount).trim() : '100-500',
      subject: `Demo Request: ${schoolName || name}`,
      message: message ? String(message).trim() : 'Demo walkthrough requested via website modal.',
      type,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };

    inquiries.push(newInquiry);

    // Also attempt email notification for VIP Demo requests
    try {
      await sendContactEmail(newInquiry);
    } catch (mailErr) {
      console.warn('[Inquiry] Email notification failed, but inquiry recorded:', mailErr.message);
    }

    return res.status(201).json({
      success: true,
      message: 'Your inquiry has been received! An INGO Schools specialist will contact you shortly.',
      data: newInquiry
    });
  } catch (error) {
    console.error('Error handling inquiry:', error);
    return res.status(500).json({ success: false, message: 'Server error processing inquiry.' });
  }
};


export const getFeatures = (req, res) => {
  const features = [
    {
      id: 'feat_easy',
      title: 'Easy to Use',
      description: 'Simple and intuitive for everyone.',
      icon: 'GraduationCap',
      color: '#2563EB',
      bgColor: '#EFF6FF'
    },
    {
      id: 'feat_secure',
      title: 'Secure',
      description: 'Your data is always protected.',
      icon: 'ShieldCheck',
      color: '#10B981',
      bgColor: '#ECFDF5'
    },
    {
      id: 'feat_cloud',
      title: 'Cloud Based',
      description: 'Access anytime, anywhere.',
      icon: 'Cloud',
      color: '#8B5CF6',
      bgColor: '#F5F3FF'
    },
    {
      id: 'feat_scalable',
      title: 'Scalable',
      description: "Grows with your school's needs.",
      icon: 'BarChart3',
      color: '#F59E0B',
      bgColor: '#FFFBEB'
    }
  ];

  return res.json({ success: true, count: features.length, data: features });
};

export const getStats = (req, res) => {
  return res.json({
    success: true,
    data: {
      activeSchools: 1250,
      studentsManaged: 480000,
      teacherHoursSavedMonthly: 120000,
      systemUptimePercent: 99.98
    }
  });
};
