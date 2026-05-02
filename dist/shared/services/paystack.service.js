"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaystackService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = __importDefault(require("axios"));
let PaystackService = class PaystackService {
    configService;
    secretKey;
    constructor(configService) {
        this.configService = configService;
        this.secretKey = this.configService.get('PAYSTACK_SECRET_KEY') || '';
    }
    async initializePayment(email, amount, metadata) {
        const response = await axios_1.default.post('https://api.paystack.co/transaction/initialize', {
            email,
            amount: amount * 100,
            metadata,
        }, {
            headers: {
                Authorization: `Bearer ${this.secretKey}`,
            },
        });
        return response.data;
    }
    async createCustomer(email, firstName, lastName, phone) {
        const response = await axios_1.default.post('https://api.paystack.co/customer', { email, first_name: firstName, last_name: lastName, phone }, { headers: { Authorization: `Bearer ${this.secretKey}` } });
        return response.data;
    }
    async createVirtualAccount(customerCode) {
        const response = await axios_1.default.post('https://api.paystack.co/dedicated_account', { customer: customerCode, preferred_bank: 'wema-bank' }, { headers: { Authorization: `Bearer ${this.secretKey}` } });
        return response.data;
    }
    async verifyPayment(reference) {
        const response = await axios_1.default.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${this.secretKey}`,
            },
        });
        return response.data;
    }
};
exports.PaystackService = PaystackService;
exports.PaystackService = PaystackService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PaystackService);
//# sourceMappingURL=paystack.service.js.map