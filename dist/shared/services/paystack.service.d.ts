import { ConfigService } from '@nestjs/config';
export declare class PaystackService {
    private configService;
    private readonly secretKey;
    private readonly logger;
    private readonly baseUrl;
    constructor(configService: ConfigService);
    private get headers();
    initializePayment(email: string, amount: number, metadata: any): Promise<any>;
    createCustomer(email: string, firstName: string, lastName: string, phone: string): Promise<any>;
    createDedicatedVirtualAccount(customerCode: string, preferredBank?: string): Promise<any>;
    createTransferRecipient(name: string, email: string, amount: number, metadata: any): Promise<any>;
    verifyPayment(reference: string): Promise<any>;
    listTransactions(customerEmail: string, from?: string): Promise<any>;
    verifyWebhookSignature(payload: string, signature: string): boolean;
}
