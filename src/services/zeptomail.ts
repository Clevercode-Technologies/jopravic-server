/**
 * ZeptoMail Email Service
 * Handles all email sending through ZeptoMail API
 */

import { SendMailClient } from 'zeptomail';

interface SendEmailOptions {
  to: string;
  toName?: string;
  subject: string;
  htmlBody: string;
  textBody?: string;
  replyTo?: string;
  bcc?: string[];
}

class ZeptoMailService {
  private client: SendMailClient | null = null;
  private fromEmail: string;
  private fromName: string;
  private replyToEmail: string;
  private initialized = false;

  constructor() {
    this.fromEmail = process.env.FROM_EMAIL || 'info@jopravic.com.ng';
    this.fromName = process.env.FROM_NAME || 'JOPRAVIC CDI';
    this.replyToEmail = process.env.REPLY_TO_EMAIL || 'info@jopravic.com.ng';
  }

  private ensureClient() {
    if (this.initialized) return;
    
    const apiKey = process.env.ZEPTOMAIL_API_KEY || '';
    const apiEndpoint = process.env.ZEPTOMAIL_API_ENDPOINT || 'https://api.zeptomail.com/v1.1/email';
    
    if (!apiKey) {
      console.warn('⚠️  ZEPTOMAIL_API_KEY not set - emails will be logged but not sent');
    } else {
      const token = apiKey.startsWith('Zoho-enczapikey ') ? apiKey : `Zoho-enczapikey ${apiKey}`;
      this.client = new SendMailClient({
        url: apiEndpoint,
        token,
      });
      console.log('✅ ZeptoMail client initialized');
    }
    this.initialized = true;
  }

  /**
   * Send email via ZeptoMail SDK
   */
  async sendEmail(options: SendEmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
    this.ensureClient();
    
    // If no client (no API key), log and return (for development)
    if (!this.client) {
      console.log('📧 [DEV MODE] Email would be sent:');
      console.log(`   To: ${options.to}`);
      console.log(`   Subject: ${options.subject}`);
      console.log(`   Reply-To: ${options.replyTo || this.replyToEmail}`);
      return { success: true, messageId: 'dev-mode' };
    }

    try {
      const resp = await this.client.sendMail({
        from: {
          address: this.fromEmail,
          name: this.fromName,
        },
        to: [
          {
            email_address: {
              address: options.to,
              name: options.toName || options.to,
            },
          },
        ],
        reply_to: [
          {
            address: options.replyTo || this.replyToEmail,
            name: this.fromName,
          },
        ],
        ...(options.bcc && options.bcc.length > 0 && {
          bcc: options.bcc.map(email => ({
            email_address: { address: email, name: 'Admin' },
          })),
        }),
        subject: options.subject,
        htmlbody: options.htmlBody,
        ...(options.textBody && { textbody: options.textBody }),
      });

      const data = resp as Record<string, any>;
      console.log(`✅ Email sent successfully to ${options.to}`);
      return {
        success: true,
        messageId: data?.data?.[0]?.message_id || 'unknown',
      };
    } catch (error) {
      console.error('Error sending email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error sending email',
      };
    }
  }

  /**
   * Send multiple emails (batch)
   */
  async sendBatch(emails: SendEmailOptions[]): Promise<{ success: boolean; results: Array<{ to: string; success: boolean; error?: string }> }> {
    const results = await Promise.all(
      emails.map(async (email) => {
        const result = await this.sendEmail(email);
        return {
          to: email.to,
          success: result.success,
          error: result.error,
        };
      })
    );

    const allSuccess = results.every(r => r.success);
    return { success: allSuccess, results };
  }
}

// Export singleton instance
export const zeptoMail = new ZeptoMailService();
export default ZeptoMailService;
