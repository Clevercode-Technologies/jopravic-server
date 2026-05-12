/**
 * Email Templates for JOPRAVIC CDI
 * All email templates use responsive HTML design with brand colors
 */

interface EmailTemplateData {
  name: string;
  email: string;
  [key: string]: string | number | boolean | undefined;
}

// Brand colors from frontend
const BRAND_COLORS = {
  primary: '#1a4731',      // Deep green
  secondary: '#10b981',    // Emerald
  accent: '#ecfdf5',       // Light mint
  text: '#374151',         // Gray-700
  lightText: '#6b7280',    // Gray-500
  white: '#ffffff',
  border: '#e5e7eb',       // Gray-200
};

/**
 * Base email template wrapper
 */
const baseTemplate = (content: string, title: string): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; padding: 20px !important; }
      .content { padding: 20px !important; }
      .header { padding: 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" class="container" style="max-width: 600px; background-color: ${BRAND_COLORS.white}; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td class="header" style="background: linear-gradient(135deg, ${BRAND_COLORS.primary} 0%, ${BRAND_COLORS.secondary} 100%); padding: 32px; text-align: center;">
              <img src="https://jopravic.com.ng/assets/logo-idL6VhKK.png" alt="JOPRAVIC CDI" width="180" style="display: block; margin: 0 auto;" onerror="this.style.display='none'">
              <h1 style="color: ${BRAND_COLORS.white}; margin: 16px 0 0 0; font-size: 24px; font-weight: 700; letter-spacing: -0.025em;">
                JOPRAVIC CDI
              </h1>
              <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0 0; font-size: 14px;">
                Strengthening Systems, Protecting the Vulnerable
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td class="content" style="padding: 32px; background-color: ${BRAND_COLORS.white};">
              ${content}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: ${BRAND_COLORS.accent}; border-top: 1px solid ${BRAND_COLORS.border}; text-align: center;">
              <p style="color: ${BRAND_COLORS.lightText}; font-size: 12px; margin: 0 0 8px 0;">
                <strong style="color: ${BRAND_COLORS.primary};">JOPRAVIC Centre for Development Initiative</strong>
              </p>
              <p style="color: ${BRAND_COLORS.lightText}; font-size: 12px; margin: 0 0 8px 0;">
                Ezleon Academy Premises, 5th Lane, Off Jehovah Street<br>
                Evbovwe Community, Benin City, Edo State, Nigeria
              </p>
              <p style="color: ${BRAND_COLORS.lightText}; font-size: 12px; margin: 0;">
                <a href="mailto:info@jopravic.com.ng" style="color: ${BRAND_COLORS.secondary}; text-decoration: none;">info@jopravic.com.ng</a> | 
                <a href="tel:+2347039436510" style="color: ${BRAND_COLORS.secondary}; text-decoration: none;">+234 703 943 6510</a>
              </p>
              <p style="color: ${BRAND_COLORS.lightText}; font-size: 11px; margin: 16px 0 0 0;">
                <a href="https://jopravic.com.ng" style="color: ${BRAND_COLORS.secondary}; text-decoration: none;">www.jopravic.com.ng</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

/**
 * Contact Form Confirmation Email
 */
export const contactConfirmationTemplate = (data: EmailTemplateData): { subject: string; html: string; text: string } => {
  const subject = `Thank you for contacting JOPRAVIC CDI`;
  
  const html = baseTemplate(`
    <h2 style="color: ${BRAND_COLORS.primary}; font-size: 20px; margin: 0 0 16px 0; font-weight: 600;">
      Hello ${data.name},
    </h2>
    
    <p style="color: ${BRAND_COLORS.text}; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
      Thank you for reaching out to JOPRAVIC Centre for Development Initiative. We have received your message and appreciate your interest in our work.
    </p>
    
    <div style="background-color: ${BRAND_COLORS.accent}; border-left: 4px solid ${BRAND_COLORS.secondary}; padding: 16px; margin: 24px 0; border-radius: 0 8px 8px 0;">
      <p style="color: ${BRAND_COLORS.primary}; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;">Your Message Details:</p>
      <p style="color: ${BRAND_COLORS.text}; font-size: 14px; margin: 0 0 4px 0;"><strong>Subject:</strong> ${data.subject}</p>
      <p style="color: ${BRAND_COLORS.lightText}; font-size: 13px; margin: 8px 0 0 0; font-style: italic;">"${data.message?.toString().substring(0, 200)}${(data.message?.toString().length || 0) > 200 ? '...' : ''}"</p>
    </div>
    
    <p style="color: ${BRAND_COLORS.text}; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
      Our team will review your inquiry and get back to you within <strong>48 hours</strong>.
    </p>
    
    <p style="color: ${BRAND_COLORS.text}; font-size: 16px; line-height: 1.6; margin: 0 0 8px 0;">
      In the meantime, you can:
    </p>
    
    <ul style="color: ${BRAND_COLORS.text}; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0; padding-left: 20px;">
      <li>Learn more about our <a href="https://jopravic.com.ng/programs" style="color: ${BRAND_COLORS.secondary}; text-decoration: none;">programs and initiatives</a></li>
      <li>Explore our <a href="https://jopravic.com.ng/impact" style="color: ${BRAND_COLORS.secondary}; text-decoration: none;">impact stories</a></li>
      <li>Consider <a href="https://jopravic.com.ng/get-involved" style="color: ${BRAND_COLORS.secondary}; text-decoration: none;">supporting our work</a></li>
    </ul>
    
    <p style="color: ${BRAND_COLORS.text}; font-size: 16px; line-height: 1.6; margin: 24px 0 0 0;">
      Best regards,<br>
      <strong style="color: ${BRAND_COLORS.primary};">The JOPRAVIC CDI Team</strong>
    </p>
  `, subject);

  const text = `
Hello ${data.name},

Thank you for reaching out to JOPRAVIC Centre for Development Initiative. We have received your message and appreciate your interest in our work.

Your Message Details:
Subject: ${data.subject}
Message: ${data.message}

Our team will review your inquiry and get back to you within 48 hours.

In the meantime, you can:
- Learn more about our programs: https://jopravic.com.ng/programs
- Explore our impact stories: https://jopravic.com.ng/impact
- Consider supporting our work: https://jopravic.com.ng/get-involved

Best regards,
The JOPRAVIC CDI Team

---
JOPRAVIC Centre for Development Initiative
Ezleon Academy Premises, 5th Lane, Off Jehovah Street
Evbovwe Community, Benin City, Edo State, Nigeria
Email: info@jopravic.com.ng | Phone: +234 703 943 6510
Website: https://jopravic.com.ng
`;

  return { subject, html, text };
};

/**
 * Donation Form Confirmation Email
 */
export const donationConfirmationTemplate = (data: EmailTemplateData): { subject: string; html: string; text: string } => {
  const subject = `Thank you for your donation intent - JOPRAVIC CDI`;
  
  const html = baseTemplate(`
    <h2 style="color: ${BRAND_COLORS.primary}; font-size: 20px; margin: 0 0 16px 0; font-weight: 600;">
      Dear ${data.name},
    </h2>
    
    <p style="color: ${BRAND_COLORS.text}; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
      Thank you for expressing interest in supporting JOPRAVIC Centre for Development Initiative. Your generosity will help us continue our mission of strengthening systems and protecting vulnerable communities across Nigeria.
    </p>
    
    <div style="background-color: ${BRAND_COLORS.accent}; border-left: 4px solid ${BRAND_COLORS.secondary}; padding: 16px; margin: 24px 0; border-radius: 0 8px 8px 0;">
      <p style="color: ${BRAND_COLORS.primary}; font-size: 14px; font-weight: 600; margin: 0 0 12px 0;">Your Donation Intent:</p>
      <p style="color: ${BRAND_COLORS.text}; font-size: 14px; margin: 0 0 4px 0;"><strong>Amount:</strong> ${data.amount || 'To be determined'}</p>
      <p style="color: ${BRAND_COLORS.text}; font-size: 14px; margin: 0 0 4px 0;"><strong>Project:</strong> ${data.project || 'General Donation'}</p>
      ${data.message ? `<p style="color: ${BRAND_COLORS.text}; font-size: 14px; margin: 8px 0 0 0;"><strong>Message:</strong> ${data.message}</p>` : ''}
    </div>
    
    <h3 style="color: ${BRAND_COLORS.primary}; font-size: 16px; margin: 24px 0 12px 0; font-weight: 600;">
      Next Steps:
    </h3>
    
    <ol style="color: ${BRAND_COLORS.text}; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0; padding-left: 20px;">
      <li style="margin-bottom: 8px;">Make your transfer to our bank account:</li>
    </ol>
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f9fafb; border-radius: 8px; margin: 12px 0 24px 0;">
      <tr>
        <td style="padding: 16px;">
          <p style="color: ${BRAND_COLORS.primary}; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;">JOPRAVIC Centre for Development Initiative Ltd/Gte</p>
          <p style="color: ${BRAND_COLORS.text}; font-size: 14px; margin: 0 0 4px 0;"><strong>Bank:</strong> Zenith Bank</p>
          <p style="color: ${BRAND_COLORS.text}; font-size: 14px; margin: 0 0 4px 0;"><strong>Naira Account:</strong> 1311124511</p>
          <p style="color: ${BRAND_COLORS.text}; font-size: 14px; margin: 0 0 4px 0;"><strong>Dollar Account:</strong> 5075731442</p>
          <p style="color: ${BRAND_COLORS.text}; font-size: 14px; margin: 0 0 4px 0;"><strong>Pounds Account:</strong> 5061730347</p>
          <p style="color: ${BRAND_COLORS.text}; font-size: 14px; margin: 0;"><strong>Euro Account:</strong> 5081447874</p>
        </td>
      </tr>
    </table>
    
    <ol start="2" style="color: ${BRAND_COLORS.text}; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0; padding-left: 20px;">
      <li style="margin-bottom: 8px;">Send your transfer receipt to <a href="mailto:info@jopravic.com.ng" style="color: ${BRAND_COLORS.secondary}; text-decoration: none;">info@jopravic.com.ng</a></li>
      <li>We will issue an official receipt and update you on the impact of your contribution</li>
    </ol>
    
    <p style="color: ${BRAND_COLORS.text}; font-size: 16px; line-height: 1.6; margin: 24px 0 0 0;">
      Every contribution, no matter the size, creates real, documented impact in the lives of children, survivors, and communities we serve.
    </p>
    
    <p style="color: ${BRAND_COLORS.text}; font-size: 16px; line-height: 1.6; margin: 24px 0 0 0;">
      With gratitude,<br>
      <strong style="color: ${BRAND_COLORS.primary};">The JOPRAVIC CDI Team</strong>
    </p>
  `, subject);

  const text = `
Dear ${data.name},

Thank you for expressing interest in supporting JOPRAVIC Centre for Development Initiative. Your generosity will help us continue our mission of strengthening systems and protecting vulnerable communities across Nigeria.

Your Donation Intent:
Amount: ${data.amount || 'To be determined'}
Project: ${data.project || 'General Donation'}
${data.message ? `Message: ${data.message}` : ''}

Next Steps:
1. Make your transfer to our bank account:

   JOPRAVIC Centre for Development Initiative Ltd/Gte
   Bank: Zenith Bank
   Naira Account: 1311124511
   Dollar Account: 5075731442
   Pounds Account: 5061730347
   Euro Account: 5081447874

2. Send your transfer receipt to info@jopravic.com.ng
3. We will issue an official receipt and update you on the impact of your contribution

Every contribution, no matter the size, creates real, documented impact in the lives of children, survivors, and communities we serve.

With gratitude,
The JOPRAVIC CDI Team

---
JOPRAVIC Centre for Development Initiative
Ezleon Academy Premises, 5th Lane, Off Jehovah Street
Evbovwe Community, Benin City, Edo State, Nigeria
Email: info@jopravic.com.ng | Phone: +234 703 943 6510
Website: https://jopravic.com.ng
`;

  return { subject, html, text };
};

/**
 * Newsletter Subscription Confirmation
 */
export const newsletterConfirmationTemplate = (data: EmailTemplateData): { subject: string; html: string; text: string } => {
  const subject = `Welcome to JOPRAVIC CDI Newsletter`;
  
  const html = baseTemplate(`
    <h2 style="color: ${BRAND_COLORS.primary}; font-size: 20px; margin: 0 0 16px 0; font-weight: 600;">
      Welcome to the JOPRAVIC CDI Community, ${data.name}!
    </h2>
    
    <p style="color: ${BRAND_COLORS.text}; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
      Thank you for subscribing to our newsletter. You're now part of a community dedicated to strengthening systems and protecting vulnerable populations across Nigeria.
    </p>
    
    <div style="background-color: ${BRAND_COLORS.accent}; border-left: 4px solid ${BRAND_COLORS.secondary}; padding: 16px; margin: 24px 0; border-radius: 0 8px 8px 0;">
      <p style="color: ${BRAND_COLORS.primary}; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;">What to Expect:</p>
      <ul style="color: ${BRAND_COLORS.text}; font-size: 14px; line-height: 1.5; margin: 0; padding-left: 16px;">
        <li>Quarterly impact reports and success stories</li>
        <li>Updates on our policy advocacy work</li>
        <li>Information about upcoming events and opportunities</li>
        <li>Ways to get involved and support our mission</li>
      </ul>
    </div>
    
    <p style="color: ${BRAND_COLORS.text}; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
      We respect your inbox and promise to only share meaningful updates that matter.
    </p>
    
    <p style="color: ${BRAND_COLORS.text}; font-size: 16px; line-height: 1.6; margin: 0 0 8px 0;">
      Follow our work:
    </p>
    
    <p style="color: ${BRAND_COLORS.text}; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">
      <a href="https://www.linkedin.com/in/jopravic-centre-for-development-initiative-46ab7435a" style="color: ${BRAND_COLORS.secondary}; text-decoration: none; margin-right: 16px;">LinkedIn</a>
      <a href="https://x.com/JOPRAVIC_CDI" style="color: ${BRAND_COLORS.secondary}; text-decoration: none; margin-right: 16px;">X/Twitter</a>
      <a href="https://www.facebook.com/JopravicNGO" style="color: ${BRAND_COLORS.secondary}; text-decoration: none;">Facebook</a>
    </p>
    
    <p style="color: ${BRAND_COLORS.text}; font-size: 16px; line-height: 1.6; margin: 0;">
      Best regards,<br>
      <strong style="color: ${BRAND_COLORS.primary};">The JOPRAVIC CDI Team</strong>
    </p>
  `, subject);

  const text = `
Welcome to the JOPRAVIC CDI Community, ${data.name}!

Thank you for subscribing to our newsletter. You're now part of a community dedicated to strengthening systems and protecting vulnerable populations across Nigeria.

What to Expect:
- Quarterly impact reports and success stories
- Updates on our policy advocacy work
- Information about upcoming events and opportunities
- Ways to get involved and support our mission

We respect your inbox and promise to only share meaningful updates that matter.

Follow our work:
LinkedIn: https://www.linkedin.com/in/jopravic-centre-for-development-initiative-46ab7435a
X/Twitter: https://x.com/JOPRAVIC_CDI
Facebook: https://www.facebook.com/JopravicNGO

Best regards,
The JOPRAVIC CDI Team

---
JOPRAVIC Centre for Development Initiative
Ezleon Academy Premises, 5th Lane, Off Jehovah Street
Evbovwe Community, Benin City, Edo State, Nigeria
Email: info@jopravic.com.ng | Phone: +234 703 943 6510
Website: https://jopravic.com.ng
`;

  return { subject, html, text };
};

/**
 * Partner Inquiry Confirmation Email
 */
export const partnerConfirmationTemplate = (data: EmailTemplateData): { subject: string; html: string; text: string } => {
  const subject = `Partnership Inquiry Received - JOPRAVIC CDI`;
  
  const html = baseTemplate(`
    <h2 style="color: ${BRAND_COLORS.primary}; font-size: 20px; margin: 0 0 16px 0; font-weight: 600;">
      Dear ${data.contactPerson},
    </h2>
    
    <p style="color: ${BRAND_COLORS.text}; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
      Thank you for your interest in partnering with JOPRAVIC Centre for Development Initiative. We have received your partnership inquiry and are excited about the possibility of working together.
    </p>
    
    <div style="background-color: ${BRAND_COLORS.accent}; border-left: 4px solid ${BRAND_COLORS.secondary}; padding: 16px; margin: 24px 0; border-radius: 0 8px 8px 0;">
      <p style="color: ${BRAND_COLORS.primary}; font-size: 14px; font-weight: 600; margin: 0 0 12px 0;">Inquiry Details:</p>
      <p style="color: ${BRAND_COLORS.text}; font-size: 14px; margin: 0 0 4px 0;"><strong>Organization:</strong> ${data.organization}</p>
      <p style="color: ${BRAND_COLORS.text}; font-size: 14px; margin: 0 0 4px 0;"><strong>Partnership Type:</strong> ${data.partnershipType}</p>
      ${data.message ? `<p style="color: ${BRAND_COLORS.lightText}; font-size: 13px; margin: 8px 0 0 0; font-style: italic;">"${data.message?.toString().substring(0, 200)}${(data.message?.toString().length || 0) > 200 ? '...' : ''}"</p>` : ''}
    </div>
    
    <p style="color: ${BRAND_COLORS.text}; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
      Our partnerships team will review your inquiry and respond within <strong>48 hours</strong>. We look forward to exploring how we can collaborate for sustainable development.
    </p>
    
    <p style="color: ${BRAND_COLORS.text}; font-size: 16px; line-height: 1.6; margin: 24px 0 0 0;">
      Best regards,<br>
      <strong style="color: ${BRAND_COLORS.primary};">The JOPRAVIC CDI Team</strong>
    </p>
  `, subject);

  const text = `
Dear ${data.contactPerson},

Thank you for your interest in partnering with JOPRAVIC Centre for Development Initiative. We have received your partnership inquiry and are excited about the possibility of working together.

Inquiry Details:
Organization: ${data.organization}
Partnership Type: ${data.partnershipType}
Message: ${data.message}

Our partnerships team will review your inquiry and respond within 48 hours.

Best regards,
The JOPRAVIC CDI Team

---
JOPRAVIC Centre for Development Initiative
Email: info@jopravic.com.ng | Phone: +234 703 943 6510
Website: https://jopravic.com.ng
`;

  return { subject, html, text };
};

/**
 * Volunteer Application Confirmation Email
 */
export const volunteerConfirmationTemplate = (data: EmailTemplateData): { subject: string; html: string; text: string } => {
  const subject = `Volunteer Application Received - JOPRAVIC CDI`;
  
  const html = baseTemplate(`
    <h2 style="color: ${BRAND_COLORS.primary}; font-size: 20px; margin: 0 0 16px 0; font-weight: 600;">
      Dear ${data.fullName},
    </h2>
    
    <p style="color: ${BRAND_COLORS.text}; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
      Thank you for applying to volunteer with JOPRAVIC Centre for Development Initiative. We value your willingness to contribute your skills to development work in Nigeria.
    </p>
    
    <div style="background-color: ${BRAND_COLORS.accent}; border-left: 4px solid ${BRAND_COLORS.secondary}; padding: 16px; margin: 24px 0; border-radius: 0 8px 8px 0;">
      <p style="color: ${BRAND_COLORS.primary}; font-size: 14px; font-weight: 600; margin: 0 0 12px 0;">Application Summary:</p>
      <p style="color: ${BRAND_COLORS.text}; font-size: 14px; margin: 0 0 4px 0;"><strong>Area of Interest:</strong> ${data.areaOfInterest}</p>
      <p style="color: ${BRAND_COLORS.text}; font-size: 14px; margin: 0 0 4px 0;"><strong>Skills:</strong> ${data.skills}</p>
      <p style="color: ${BRAND_COLORS.text}; font-size: 14px; margin: 0 0 4px 0;"><strong>Availability:</strong> ${data.availability}</p>
      <p style="color: ${BRAND_COLORS.text}; font-size: 14px; margin: 0;"><strong>Location:</strong> ${data.location}</p>
    </div>
    
    <h3 style="color: ${BRAND_COLORS.primary}; font-size: 16px; margin: 24px 0 12px 0; font-weight: 600;">
      What Happens Next:
    </h3>
    
    <ol style="color: ${BRAND_COLORS.text}; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0; padding-left: 20px;">
      <li style="margin-bottom: 8px;">Our team will review your application within <strong>5 working days</strong></li>
      <li style="margin-bottom: 8px;">If your skills match current needs, we'll schedule a brief introductory call</li>
      <li>You'll receive onboarding materials and a volunteer engagement plan</li>
    </ol>
    
    <p style="color: ${BRAND_COLORS.text}; font-size: 16px; line-height: 1.6; margin: 24px 0 0 0;">
      We appreciate your commitment to making a difference. Together, we can strengthen systems and protect vulnerable communities.
    </p>
    
    <p style="color: ${BRAND_COLORS.text}; font-size: 16px; line-height: 1.6; margin: 24px 0 0 0;">
      Best regards,<br>
      <strong style="color: ${BRAND_COLORS.primary};">The JOPRAVIC CDI Team</strong>
    </p>
  `, subject);

  const text = `
Dear ${data.fullName},

Thank you for applying to volunteer with JOPRAVIC Centre for Development Initiative. We value your willingness to contribute your skills to development work in Nigeria.

Application Summary:
Area of Interest: ${data.areaOfInterest}
Skills: ${data.skills}
Availability: ${data.availability}
Location: ${data.location}

What Happens Next:
1. Our team will review your application within 5 working days
2. If your skills match current needs, we'll schedule a brief introductory call
3. You'll receive onboarding materials and a volunteer engagement plan

We appreciate your commitment to making a difference.

Best regards,
The JOPRAVIC CDI Team

---
JOPRAVIC Centre for Development Initiative
Email: info@jopravic.com.ng | Phone: +234 703 943 6510
Website: https://jopravic.com.ng
`;

  return { subject, html, text };
};

/**
 * Admin Notification Email (for internal use)
 */
export const adminNotificationTemplate = (data: EmailTemplateData & { formType: string }): { subject: string; html: string; text: string } => {
  const subject = `New ${data.formType} Submission - JOPRAVIC CDI`;
  
  const detailsHtml = Object.entries(data)
    .filter(([key]) => key !== 'formType')
    .map(([key, value]) => `<p style="color: ${BRAND_COLORS.text}; font-size: 14px; margin: 0 0 4px 0;"><strong>${key}:</strong> ${value}</p>`)
    .join('');
  
  const html = baseTemplate(`
    <h2 style="color: ${BRAND_COLORS.primary}; font-size: 20px; margin: 0 0 16px 0; font-weight: 600;">
      New ${data.formType} Submission
    </h2>
    
    <p style="color: ${BRAND_COLORS.text}; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
      A new ${data.formType.toLowerCase()} has been submitted through the website.
    </p>
    
    <div style="background-color: ${BRAND_COLORS.accent}; border-left: 4px solid ${BRAND_COLORS.secondary}; padding: 16px; margin: 24px 0; border-radius: 0 8px 8px 0;">
      <p style="color: ${BRAND_COLORS.primary}; font-size: 14px; font-weight: 600; margin: 0 0 12px 0;">Submission Details:</p>
      ${detailsHtml}
    </div>
    
    <p style="color: ${BRAND_COLORS.lightText}; font-size: 13px; margin: 0;">
      Received at: ${new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' })}
    </p>
  `, subject);

  const detailsText = Object.entries(data)
    .filter(([key]) => key !== 'formType')
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');
  
  const text = `
New ${data.formType} Submission

A new ${data.formType.toLowerCase()} has been submitted through the website.

Submission Details:
${detailsText}

Received at: ${new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' })}

---
JOPRAVIC CDI Admin Notification
`;

  return { subject, html, text };
};
