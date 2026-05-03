"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var PaystackService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaystackService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = __importDefault(require("axios"));
const crypto = __importStar(require("crypto"));
let PaystackService = PaystackService_1 = class PaystackService {
    configService;
    secretKey;
    logger = new common_1.Logger(PaystackService_1.name);
    baseUrl = 'https://api.paystack.co';
    constructor(configService) {
        this.configService = configService;
        this.secretKey = this.configService.get('PAYSTACK_SECRET_KEY') || '';
    }
    get headers() {
        return { Authorization: `Bearer ${this.secretKey}`, 'Content-Type': 'application/json' };
    }
    async initializePayment(email, amount, metadata) {
        const response = await axios_1.default.post(`${this.baseUrl}/transaction/initialize`, { email, amount: Math.round(amount * 100), metadata, callback_url: metadata.callback_url }, { headers: this.headers });
        return response.data;
    }
    async createCustomer(email, firstName, lastName, phone) {
        try {
            const existing = await axios_1.default.get(`${this.baseUrl}/customer/${encodeURIComponent(email)}`, { headers: this.headers });
            if (existing.data?.data?.customer_code) {
                this.logger.log(`Existing Paystack customer found: ${existing.data.data.customer_code}`);
                return existing.data;
            }
        }
        catch (e) {
        }
        const response = await axios_1.default.post(`${this.baseUrl}/customer`, { email, first_name: firstName, last_name: lastName, phone }, { headers: this.headers });
        this.logger.log(`Created Paystack customer: ${response.data?.data?.customer_code}`);
        return response.data;
    }
    async createDedicatedVirtualAccount(customerCode, preferredBank = 'wema-bank') {
        try {
            const response = await axios_1.default.post(`${this.baseUrl}/dedicated_account`, {
                customer: customerCode,
                preferred_bank: preferredBank,
            }, { headers: this.headers });
            this.logger.log(`DVA created: ${JSON.stringify(response.data?.data?.account_number)}`);
            return response.data;
        }
        catch (error) {
            this.logger.error(`DVA creation failed: ${error?.response?.data?.message || error.message}`);
            throw error;
        }
    }
    async createTransferRecipient(name, email, amount, metadata) {
        const response = await axios_1.default.post(`${this.baseUrl}/transaction/initialize`, {
            email,
            amount: Math.round(amount * 100),
            channels: ['bank_transfer'],
            metadata,
        }, { headers: this.headers });
        return response.data;
    }
    async verifyPayment(reference) {
        const response = await axios_1.default.get(`${this.baseUrl}/transaction/verify/${encodeURIComponent(reference)}`, { headers: this.headers });
        return response.data;
    }
    async listTransactions(customerEmail, from) {
        const params = { perPage: 10 };
        if (from)
            params.from = from;
        const response = await axios_1.default.get(`${this.baseUrl}/transaction?customer=${encodeURIComponent(customerEmail)}`, { headers: this.headers, params });
        return response.data;
    }
    verifyWebhookSignature(payload, signature) {
        const hash = crypto
            .createHmac('sha512', this.secretKey)
            .update(payload)
            .digest('hex');
        return hash === signature;
    }
};
exports.PaystackService = PaystackService;
exports.PaystackService = PaystackService = PaystackService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PaystackService);
//# sourceMappingURL=paystack.service.js.map