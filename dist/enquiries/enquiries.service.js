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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnquiriesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const enquiry_schema_1 = require("../schemas/enquiry.schema");
let EnquiriesService = class EnquiriesService {
    enquiryModel;
    constructor(enquiryModel) {
        this.enquiryModel = enquiryModel;
    }
    async create(data) {
        return this.enquiryModel.create(data);
    }
    async findAll() {
        return this.enquiryModel.find().sort({ createdAt: -1 }).exec();
    }
    async findOne(id) {
        return this.enquiryModel.findById(id).exec();
    }
    async markAsRead(id) {
        return this.enquiryModel.findByIdAndUpdate(id, { status: 'read' }, { new: true }).exec();
    }
    async reply(id, adminReply) {
        return this.enquiryModel.findByIdAndUpdate(id, { adminReply, status: 'replied' }, { new: true }).exec();
    }
    async delete(id) {
        return this.enquiryModel.findByIdAndDelete(id).exec();
    }
};
exports.EnquiriesService = EnquiriesService;
exports.EnquiriesService = EnquiriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(enquiry_schema_1.Enquiry.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], EnquiriesService);
//# sourceMappingURL=enquiries.service.js.map