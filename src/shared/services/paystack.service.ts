import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class PaystackService {
  private readonly secretKey: string;

  constructor(private configService: ConfigService) {
    this.secretKey = this.configService.get<string>('PAYSTACK_SECRET_KEY') || '';
  }

  async initializePayment(email: string, amount: number, metadata: any) {
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount: amount * 100, // Paystack uses kobo/cents
        metadata,
      },
      {
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
        },
      }
    );
    return response.data;
  }

  async createCustomer(email: string, firstName: string, lastName: string, phone: string) {
    const response = await axios.post(
      'https://api.paystack.co/customer',
      { email, first_name: firstName, last_name: lastName, phone },
      { headers: { Authorization: `Bearer ${this.secretKey}` } }
    );
    return response.data;
  }

  async createVirtualAccount(customerCode: string) {
    const response = await axios.post(
      'https://api.paystack.co/dedicated_account',
      { customer: customerCode, preferred_bank: 'wema-bank' }, // Example bank
      { headers: { Authorization: `Bearer ${this.secretKey}` } }
    );
    return response.data;
  }

  async verifyPayment(reference: string) {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
        },
      }
    );
    return response.data;
  }
}
