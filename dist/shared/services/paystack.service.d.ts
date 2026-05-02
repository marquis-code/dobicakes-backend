import { ConfigService } from '@nestjs/config';
export declare class PaystackService {
    private configService;
    private readonly secretKey;
    constructor(configService: ConfigService);
    initializePayment(email: string, amount: number, metadata: any): Promise<any>;
    createCustomer(email: string, firstName: string, lastName: string, phone: string): Promise<any>;
    createVirtualAccount(customerCode: string): Promise<any>;
    verifyPayment(reference: string): Promise<any>;
}
