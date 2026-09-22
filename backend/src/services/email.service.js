import nodemailer from 'nodemailer';

/**
 * Escapes HTML characters to prevent XSS/injection in HTML email templates.
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Creates Nodemailer transporter using environment configuration.
 */
function getTransporter() {
  const user = process.env.EMAIL_USER || 'Ingoschoolerp@gmail.com';
  const pass = process.env.EMAIL_PASSWORD;

  // If password is not configured or placeholder, return null to handle gracefully in dev
  if (!pass || pass === 'YOUR_EMAIL_APP_PASSWORD') {
    return null;
  }

  // Create transporter with Gmail SMTP or custom host
  const host = process.env.EMAIL_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.EMAIL_PORT, 10) || 465;
  const secure = process.env.EMAIL_SECURE !== 'false' && port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass
    }
  });
}

/**
 * Sends a formatted contact form email to the designated receiver.
 *
 * @param {Object} data Contact form data
 * @param {string} data.name - Sender full name
 * @param {string} data.email - Sender email address
 * @param {string} data.phone - Sender phone number
 * @param {string} [data.schoolName] - School / Institution name
 * @param {string} [data.role] - Role at school
 * @param {string} [data.studentCount] - Enrolled student count
 * @param {string} [data.subject] - Inquiry subject
 * @param {string} data.message - Detailed message
 * @param {string} [data.ticketId] - Unique reference ticket ID
 * @returns {Promise<{success: boolean, messageId?: string, simulated?: boolean}>}
 */
export async function sendContactEmail(data) {
  const {
    name,
    email,
    phone = 'Not provided',
    schoolName = 'Not specified',
    role = 'Not specified',
    studentCount = 'Not specified',
    subject: userSubject,
    message,
    ticketId = `INGO-${Date.now().toString().slice(-6)}`
  } = data;

  const receiver = process.env.CONTACT_RECEIVER || process.env.EMAIL_USER || 'Ingoschoolerp@gmail.com';
  const senderUser = process.env.EMAIL_USER || 'Ingoschoolerp@gmail.com';

  const emailSubject = userSubject
    ? `New Contact Form Submission: ${userSubject} [${ticketId}]`
    : `New Contact Form Submission - INGO Schools [${ticketId}]`;

  const submissionDate = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium'
  });

  // Plain Text Version
  const textContent = `
New Contact Form Submission - INGO Schools
==================================================

Reference Ticket ID: ${ticketId}
Date & Time: ${submissionDate}

SUBMITTER DETAILS:
--------------------------------------------------
Name:         ${name}
Email:        ${email}
Phone:        ${phone}
School Name:  ${schoolName}
Role:         ${role}
Students:     ${studentCount}
Subject:      ${userSubject || 'General Inquiry'}

MESSAGE:
--------------------------------------------------
${message}

--------------------------------------------------
This email was generated from the INGO Schools ERP website contact form.
To respond directly to the inquirer, reply to: ${email}
`.trim();

  // Rich HTML Version
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(emailSubject)}</title>
  <style>
    body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #1e293b; }
    .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #4338ca 100%); padding: 32px 28px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { margin: 6px 0 0; font-size: 13px; color: #dbeafe; }
    .badge { display: inline-block; background: rgba(255, 255, 255, 0.2); padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; margin-top: 10px; }
    .body { padding: 28px; }
    .info-card { background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; padding: 18px 20px; margin-bottom: 24px; }
    .info-row { display: flex; padding: 8px 0; border-bottom: 1px solid #edf2f7; font-size: 14px; }
    .info-row:last-child { border-bottom: none; }
    .info-label { width: 140px; font-weight: 600; color: #64748b; }
    .info-value { flex: 1; font-weight: 500; color: #0f172a; word-break: break-word; }
    .message-title { font-size: 14px; font-weight: 700; color: #334155; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
    .message-box { background: #eff6ff; border-left: 4px solid #2563eb; padding: 16px 20px; border-radius: 0 10px 10px 0; font-size: 14px; line-height: 1.6; color: #1e3a8a; white-space: pre-wrap; word-break: break-word; }
    .footer { background: #f8fafc; padding: 20px 28px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
    .footer a { color: #2563eb; text-decoration: none; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
      <p>INGO Schools ERP Platform Notification</p>
      <span class="badge">Ticket: ${escapeHtml(ticketId)}</span>
    </div>
    <div class="body">
      <div class="info-card">
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 8px 0; font-weight: 600; color: #64748b; width: 140px; font-size: 13px;">Full Name:</td>
            <td style="padding: 8px 0; font-weight: 700; color: #0f172a; font-size: 14px;">${escapeHtml(name)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 8px 0; font-weight: 600; color: #64748b; font-size: 13px;">Email Address:</td>
            <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${escapeHtml(email)}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${escapeHtml(email)}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 8px 0; font-weight: 600; color: #64748b; font-size: 13px;">Phone Number:</td>
            <td style="padding: 8px 0; font-size: 14px;"><a href="tel:${escapeHtml(phone)}" style="color: #0f172a; text-decoration: none; font-weight: 600;">${escapeHtml(phone)}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 8px 0; font-weight: 600; color: #64748b; font-size: 13px;">School / Institution:</td>
            <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${escapeHtml(schoolName)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 8px 0; font-weight: 600; color: #64748b; font-size: 13px;">Role at School:</td>
            <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${escapeHtml(role)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 8px 0; font-weight: 600; color: #64748b; font-size: 13px;">Student Count:</td>
            <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${escapeHtml(studentCount)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 8px 0; font-weight: 600; color: #64748b; font-size: 13px;">Subject:</td>
            <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${escapeHtml(userSubject || 'Contact Inquiry')}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #64748b; font-size: 13px;">Submitted At:</td>
            <td style="padding: 8px 0; color: #64748b; font-size: 13px;">${escapeHtml(submissionDate)}</td>
          </tr>
        </table>
      </div>

      <div class="message-title">Submitted Inquiry Message:</div>
      <div class="message-box">${escapeHtml(message)}</div>
    </div>
    <div class="footer">
      Sent securely via <strong>INGO Schools ERP</strong> Web Contact Service<br/>
      Destination: <a href="mailto:${escapeHtml(receiver)}">${escapeHtml(receiver)}</a> &bull; Submitter: <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
    </div>
  </div>
</body>
</html>
`.trim();

  const transporter = getTransporter();

  if (!transporter) {
    console.log(
      `[EmailService] SMTP credentials not set (EMAIL_PASSWORD is empty or default placeholder). In development mode, email dispatch is simulated. Recipient: ${receiver}, Subject: "${emailSubject}"`
    );
    return {
      success: true,
      simulated: true,
      ticketId,
      recipient: receiver
    };
  }

  const mailOptions = {
    from: `"INGO Schools ERP" <${senderUser}>`,
    to: receiver,
    replyTo: `"${name}" <${email}>`,
    subject: emailSubject,
    text: textContent,
    html: htmlContent
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[EmailService] Email successfully sent to ${receiver}. MessageId: ${info.messageId}`);
    return {
      success: true,
      messageId: info.messageId,
      ticketId,
      recipient: receiver
    };
  } catch (error) {
    // Log error message safely without leaking passwords or auth secrets
    console.error(`[EmailService] SMTP error sending email to ${receiver}:`, error.message || error);
    throw new Error('Failed to dispatch email via SMTP server');
  }
}

/**
 * Sends a confirmation email to the visitor after successful form submission.
 *
 * @param {Object} data Contact form data
 * @returns {Promise<{success: boolean, messageId?: string, simulated?: boolean}>}
 */
export async function sendVisitorConfirmationEmail(data) {
  const {
    name,
    email,
    schoolName = 'Not specified',
    role = 'Not specified',
    studentCount = 'Not specified',
    subject: userSubject,
    message,
    ticketId = `INGO-${Date.now().toString().slice(-6)}`
  } = data;

  const senderUser = process.env.EMAIL_USER || 'Ingoschoolerp@gmail.com';
  const emailSubject = 'Thank you for contacting INGO Schools ERP';

  const submissionDate = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium'
  });

  const textContent = `
Thank you for contacting INGO Schools ERP. We have successfully received your inquiry.
Our team will review your request and contact you soon.

Reference Ticket ID: ${ticketId}

Your Details:
--------------------------------------------------
Name:         ${name}
School Name:  ${schoolName}
Role:         ${role}
Students:     ${studentCount}
Subject:      ${userSubject || 'General Inquiry'}

Your Message:
--------------------------------------------------
${message}

--------------------------------------------------
Contact Information:
Phone: 99819 66037
Email: Ingoschoolerp@gmail.com
Address: Subhagya Nagar, Hudkeshwar Road, Nagpur, Maharashtra, India
  `.trim();

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(emailSubject)}</title>
  <style>
    body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #1e293b; }
    .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #4338ca 100%); padding: 32px 28px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { margin: 6px 0 0; font-size: 15px; color: #dbeafe; }
    .badge { display: inline-block; background: rgba(255, 255, 255, 0.2); padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; margin-top: 10px; }
    .body { padding: 28px; }
    .info-card { background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; padding: 18px 20px; margin-bottom: 24px; }
    .info-row { display: flex; padding: 8px 0; border-bottom: 1px solid #edf2f7; font-size: 14px; }
    .info-row:last-child { border-bottom: none; }
    .info-label { width: 140px; font-weight: 600; color: #64748b; }
    .info-value { flex: 1; font-weight: 500; color: #0f172a; word-break: break-word; }
    .footer { background: #f8fafc; padding: 20px 28px; text-align: center; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0; }
    .contact-info { margin-top: 15px; text-align: center; line-height: 1.6; color: #334155; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Hello ${escapeHtml(name)},</h1>
      <p>Thank you for contacting INGO Schools ERP. We have successfully received your inquiry. Our team will review your request and contact you soon.</p>
      <span class="badge">Ticket: ${escapeHtml(ticketId)}</span>
    </div>
    <div class="body">
      <div class="info-card">
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 8px 0; font-weight: 600; color: #64748b; width: 140px; font-size: 13px;">School / Institution:</td>
            <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${escapeHtml(schoolName)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 8px 0; font-weight: 600; color: #64748b; font-size: 13px;">Role at School:</td>
            <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${escapeHtml(role)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 8px 0; font-weight: 600; color: #64748b; font-size: 13px;">Student Count:</td>
            <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${escapeHtml(studentCount)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 8px 0; font-weight: 600; color: #64748b; font-size: 13px;">Subject:</td>
            <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${escapeHtml(userSubject || 'Contact Inquiry')}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #64748b; font-size: 13px;">Submitted At:</td>
            <td style="padding: 8px 0; color: #64748b; font-size: 13px;">${escapeHtml(submissionDate)}</td>
          </tr>
        </table>
      </div>

      <div style="font-size: 14px; font-weight: 700; color: #334155; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Your Message:</div>
      <div style="background: #eff6ff; border-left: 4px solid #2563eb; padding: 16px 20px; border-radius: 0 10px 10px 0; font-size: 14px; line-height: 1.6; color: #1e3a8a; white-space: pre-wrap; word-break: break-word;">${escapeHtml(message)}</div>
      
      <div class="contact-info">
        <strong>Contact Information:</strong><br>
        Phone: 99819 66037<br>
        Email: Ingoschoolerp@gmail.com<br>
        Address: Subhagya Nagar, Hudkeshwar Road, Nagpur, Maharashtra, India
      </div>
    </div>
    <div class="footer">
      Sent securely via <strong>INGO Schools ERP</strong>
    </div>
  </div>
</body>
</html>
  `.trim();

  const transporter = getTransporter();

  if (!transporter) {
    console.log(
      `[EmailService] SMTP credentials not set (EMAIL_PASSWORD is empty or default placeholder). Simulated visitor confirmation to: ${email}`
    );
    return {
      success: true,
      simulated: true,
      ticketId,
      recipient: email
    };
  }

  const mailOptions = {
    from: `"INGO Schools ERP" <${senderUser}>`,
    to: email,
    subject: emailSubject,
    text: textContent,
    html: htmlContent
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[EmailService] Confirmation email successfully sent to ${email}. MessageId: ${info.messageId}`);
    return {
      success: true,
      messageId: info.messageId,
      ticketId,
      recipient: email
    };
  } catch (error) {
    console.error(`[EmailService] SMTP error sending confirmation email to ${email}:`, error.message || error);
    throw new Error('Failed to dispatch confirmation email via SMTP server');
  }
}
