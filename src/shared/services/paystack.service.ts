import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as crypto from 'crypto';

@Injectable()
export class PaystackService {
  private readonly secretKey: string;
  private readonly logger = new Logger(PaystackService.name);
  private readonly baseUrl = 'https://api.paystack.co';

  constructor(private configService: ConfigService) {
    this.secretKey = this.configService.get<string>('PAYSTACK_SECRET_KEY') || '';
  }

  private get headers() {
    return { Authorization: `Bearer ${this.secretKey}`, 'Content-Type': 'application/json' };
  }

  // ─── Card Payment ───────────────────────────────────
  async initializePayment(email: string, amount: number, metadata: any) {
    const response = await axios.post(
      `${this.baseUrl}/transaction/initialize`,
      { email, amount: Math.round(amount * 100), metadata, callback_url: metadata.callback_url },
      { headers: this.headers }
    );
    return response.data;
  }

  // ─── Customer Management ────────────────────────────
  async createCustomer(email: string, firstName: string, lastName: string, phone: string) {
    // Check if customer already exists
    try {
      const existing = await axios.get(
        `${this.baseUrl}/customer/${encodeURIComponent(email)}`,
        { headers: this.headers }
      );
      if (existing.data?.data?.customer_code) {
        this.logger.log(`Existing Paystack customer found: ${existing.data.data.customer_code}`);
        return existing.data;
      }
    } catch (e) {
      // Customer doesn't exist, create new one
    }

    const response = await axios.post(
      `${this.baseUrl}/customer`,
      { email, first_name: firstName, last_name: lastName, phone },
      { headers: this.headers }
    );
    this.logger.log(`Created Paystack customer: ${response.data?.data?.customer_code}`);
    return response.data;
  }

  // ─── Dedicated Virtual Account (DVA) ────────────────
  async createDedicatedVirtualAccount(customerCode: string, preferredBank: string = 'wema-bank') {
    try {
      const response = await axios.post(
        `${this.baseUrl}/dedicated_account`,
        {
          customer: customerCode,
          preferred_bank: preferredBank,
        },
        { headers: this.headers }
      );
      this.logger.log(`DVA created: ${JSON.stringify(response.data?.data?.account_number)}`);
      return response.data;
    } catch (error) {
      this.logger.error(`DVA creation failed: ${error?.response?.data?.message || error.message}`);
      throw error;
    }
  }

  // ─── Transfer Recipient (for temporary/one-off virtual accounts) ──
  async createTransferRecipient(name: string, email: string, amount: number, metadata: any) {
    // Paystack also supports initializing a transaction with bank channel
    // This is the simpler approach that works on test mode
    const response = await axios.post(
      `${this.baseUrl}/transaction/initialize`,
      {
        email,
        amount: Math.round(amount * 100),
        channels: ['bank_transfer'],
        metadata,
      },
      { headers: this.headers }
    );
    return response.data;
  }

  // ─── Verify Payment ─────────────────────────────────
  async verifyPayment(reference: string) {
    const response = await axios.get(
      `${this.baseUrl}/transaction/verify/${encodeURIComponent(reference)}`,
      { headers: this.headers }
    );
    return response.data;
  }

  // ─── List Transactions by Customer ──────────────────
  async listTransactions(customerEmail: string, from?: string) {
    const params: any = { perPage: 10 };
    if (from) params.from = from;
    
    const response = await axios.get(
      `${this.baseUrl}/transaction?customer=${encodeURIComponent(customerEmail)}`,
      { headers: this.headers, params }
    );
    return response.data;
  }

  // ─── Webhook Signature Verification ─────────────────
  verifyWebhookSignature(payload: string, signature: string): boolean {
    const hash = crypto
      .createHmac('sha512', this.secretKey)
      .update(payload)
      .digest('hex');
    return hash === signature;
  }
}
