import express from 'express';
import { z } from 'zod';
import { zeptoMail } from '../services/zeptomail.js';
import {
  contactFormSchema,
  donationFormSchema,
  newsletterSchema,
  partnerFormSchema,
  volunteerFormSchema,
  formatValidationErrors,
} from '../validation/schemas.js';
import {
  contactConfirmationTemplate,
  donationConfirmationTemplate,
  newsletterConfirmationTemplate,
  partnerConfirmationTemplate,
  volunteerConfirmationTemplate,
  adminNotificationTemplate,
} from '../templates/emails.js';

const router = express.Router();

// Admin email for notifications
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@jopravic.com.ng';

/**
 * Contact Form Submission
 * POST /api/forms/contact
 */
router.post('/contact', async (req, res) => {
  try {
    // Validate request body
    const validatedData = contactFormSchema.parse(req.body);

    // Generate email templates
    const { subject, html, text } = contactConfirmationTemplate(validatedData);

    // Send confirmation email to user
    const userEmailResult = await zeptoMail.sendEmail({
      to: validatedData.email,
      toName: validatedData.name,
      subject,
      htmlBody: html,
      textBody: text,
    });

    // Send notification to admin
    const { subject: adminSubject, html: adminHtml, text: adminText } = adminNotificationTemplate({
      ...validatedData,
      formType: 'Contact Form',
    });

    const adminEmailResult = await zeptoMail.sendEmail({
      to: ADMIN_EMAIL,
      subject: adminSubject,
      htmlBody: adminHtml,
      textBody: adminText,
      replyTo: validatedData.email,
    });

    // Return response
    res.status(200).json({
      success: true,
      message: 'Your message has been received. We will get back to you within 48 hours.',
      details: {
        userEmailSent: userEmailResult.success,
        adminEmailSent: adminEmailResult.success,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: formatValidationErrors(error),
      });
    }

    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process your message. Please try again later.',
    });
  }
});

/**
 * Donation Form Submission
 * POST /api/forms/donate
 */
router.post('/donate', async (req, res) => {
  try {
    // Validate request body
    const validatedData = donationFormSchema.parse(req.body);

    // Generate email templates
    const { subject, html, text } = donationConfirmationTemplate(validatedData);

    // Send confirmation email to user
    const userEmailResult = await zeptoMail.sendEmail({
      to: validatedData.email,
      toName: validatedData.name,
      subject,
      htmlBody: html,
      textBody: text,
    });

    // Send notification to admin
    const { subject: adminSubject, html: adminHtml, text: adminText } = adminNotificationTemplate({
      ...validatedData,
      formType: 'Donation Intent',
    });

    const adminEmailResult = await zeptoMail.sendEmail({
      to: ADMIN_EMAIL,
      subject: adminSubject,
      htmlBody: adminHtml,
      textBody: adminText,
      replyTo: validatedData.email,
    });

    // Return response
    res.status(200).json({
      success: true,
      message: 'Thank you for your donation intent. Check your email for next steps.',
      details: {
        userEmailSent: userEmailResult.success,
        adminEmailSent: adminEmailResult.success,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: formatValidationErrors(error),
      });
    }

    console.error('Donation form error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process your donation intent. Please try again later.',
    });
  }
});

/**
 * Newsletter Subscription
 * POST /api/forms/newsletter
 */
router.post('/newsletter', async (req, res) => {
  try {
    // Validate request body
    const validatedData = newsletterSchema.parse(req.body);

    // Generate email templates
    const { subject, html, text } = newsletterConfirmationTemplate(validatedData);

    // Send welcome email to subscriber
    const userEmailResult = await zeptoMail.sendEmail({
      to: validatedData.email,
      toName: validatedData.name,
      subject,
      htmlBody: html,
      textBody: text,
    });

    // Send notification to admin
    const { subject: adminSubject, html: adminHtml, text: adminText } = adminNotificationTemplate({
      ...validatedData,
      formType: 'Newsletter Subscription',
    });

    const adminEmailResult = await zeptoMail.sendEmail({
      to: ADMIN_EMAIL,
      subject: adminSubject,
      htmlBody: adminHtml,
      textBody: adminText,
    });

    // Return response
    res.status(200).json({
      success: true,
      message: 'Welcome to the JOPRAVIC CDI community! Check your email for confirmation.',
      details: {
        emailSent: userEmailResult.success,
        adminNotified: adminEmailResult.success,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: formatValidationErrors(error),
      });
    }

    console.error('Newsletter subscription error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to subscribe. Please try again later.',
    });
  }
});

/**
 * Partner Inquiry Submission
 * POST /api/forms/partner
 */
router.post('/partner', async (req, res) => {
  try {
    const validatedData = partnerFormSchema.parse(req.body);

    const { subject, html, text } = partnerConfirmationTemplate({ ...validatedData, name: validatedData.contactPerson });

    const userEmailResult = await zeptoMail.sendEmail({
      to: validatedData.email,
      toName: validatedData.contactPerson,
      subject,
      htmlBody: html,
      textBody: text,
    });

    const { subject: adminSubject, html: adminHtml, text: adminText } = adminNotificationTemplate({
      ...validatedData,
      name: validatedData.contactPerson,
      formType: 'Partnership Inquiry',
    });

    const adminEmailResult = await zeptoMail.sendEmail({
      to: ADMIN_EMAIL,
      subject: adminSubject,
      htmlBody: adminHtml,
      textBody: adminText,
      replyTo: validatedData.email,
    });

    res.status(200).json({
      success: true,
      message: 'Thank you for your partnership inquiry. We will respond within 48 hours.',
      details: {
        userEmailSent: userEmailResult.success,
        adminEmailSent: adminEmailResult.success,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: formatValidationErrors(error),
      });
    }

    console.error('Partner form error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process your inquiry. Please try again later.',
    });
  }
});

/**
 * Volunteer Application Submission
 * POST /api/forms/volunteer
 */
router.post('/volunteer', async (req, res) => {
  try {
    const validatedData = volunteerFormSchema.parse(req.body);

    const { subject, html, text } = volunteerConfirmationTemplate({ ...validatedData, name: validatedData.fullName });

    const userEmailResult = await zeptoMail.sendEmail({
      to: validatedData.email,
      toName: validatedData.fullName,
      subject,
      htmlBody: html,
      textBody: text,
    });

    const { subject: adminSubject, html: adminHtml, text: adminText } = adminNotificationTemplate({
      ...validatedData,
      name: validatedData.fullName,
      formType: 'Volunteer Application',
    } as any);

    const adminEmailResult = await zeptoMail.sendEmail({
      to: ADMIN_EMAIL,
      subject: adminSubject,
      htmlBody: adminHtml,
      textBody: adminText,
      replyTo: validatedData.email,
    });

    res.status(200).json({
      success: true,
      message: 'Your volunteer application has been received. We will be in touch soon.',
      details: {
        userEmailSent: userEmailResult.success,
        adminEmailSent: adminEmailResult.success,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: formatValidationErrors(error),
      });
    }

    console.error('Volunteer form error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process your application. Please try again later.',
    });
  }
});

/**
 * Get form configuration (for frontend)
 * GET /api/forms/config
 */
router.get('/config', (req, res) => {
  res.json({
    success: true,
    config: {
      rateLimit: {
        windowMs: 60 * 60 * 1000, // 1 hour
        maxRequests: 10,
      },
      supportedForms: ['contact', 'donate', 'newsletter', 'partner', 'volunteer'],
      contactEmail: 'info@jopravic.com.ng',
    },
  });
});

export default router;
