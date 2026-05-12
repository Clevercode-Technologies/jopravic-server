import { z } from 'zod';

/**
 * Contact Form Validation Schema
 */
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(200, 'Subject must be less than 200 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000, 'Message must be less than 5000 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Donation Form Validation Schema
 */
export const donationFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  amount: z.string().max(50, 'Amount must be less than 50 characters').optional().or(z.literal('')),
  project: z.string().max(200, 'Project must be less than 200 characters').optional().or(z.literal('')),
  message: z.string().max(2000, 'Message must be less than 2000 characters').optional().or(z.literal('')),
});

export type DonationFormData = z.infer<typeof donationFormSchema>;

/**
 * Newsletter Subscription Validation Schema
 */
export const newsletterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address'),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;

/**
 * Partner Form Validation Schema
 */
export const partnerFormSchema = z.object({
  organization: z.string().min(2, 'Organization name must be at least 2 characters').max(200),
  contactPerson: z.string().min(2, 'Contact person must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  partnershipType: z.string().min(1, 'Please select a partnership type').max(100),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
});

export type PartnerFormData = z.infer<typeof partnerFormSchema>;

/**
 * Volunteer Application Validation Schema
 */
export const volunteerFormSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Phone number must be at least 7 characters').max(20),
  location: z.string().min(2, 'Location must be at least 2 characters').max(200),
  areaOfInterest: z.string().min(1, 'Please select an area of interest').max(100),
  skills: z.string().min(2, 'Skills must be at least 2 characters').max(500),
  availability: z.string().min(1, 'Please select your availability').max(50),
  motivation: z.string().min(10, 'Motivation must be at least 10 characters').max(3000),
});

export type VolunteerFormData = z.infer<typeof volunteerFormSchema>;

/**
 * Helper function to format validation errors
 */
export const formatValidationErrors = (error: z.ZodError): string => {
  return error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
};
