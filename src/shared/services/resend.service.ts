import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class ResendService {
  private resend: Resend;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    if (apiKey) {
      this.resend = new Resend(apiKey);
    } else {
      console.warn('RESEND_API_KEY is not defined. Email functionality will be disabled.');
    }
  }

  async sendEmail(to: string, subject: string, html: string) {
    if (!this.resend) {
      console.error('Cannot send email: Resend is not initialized.');
      return;
    }
    return this.resend.emails.send({
      from: 'Adaobi Cakes <orders@adaobicakes.com>',
      to,
      subject,
      html,
    });
  }
}
