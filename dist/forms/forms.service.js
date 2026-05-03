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
exports.FormsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const form_schema_1 = require("../schemas/form.schema");
let FormsService = class FormsService {
    formModel;
    constructor(formModel) {
        this.formModel = formModel;
    }
    async create(formData) {
        const form = new this.formModel(formData);
        return form.save();
    }
    async findAll() {
        return this.formModel.find().exec();
    }
    async findOne(id) {
        const form = await this.formModel.findById(id).exec();
        if (!form)
            throw new common_1.NotFoundException('Form not found');
        return form;
    }
    async submitResponse(id, responseData) {
        const form = await this.findOne(id);
        form.responses.push({
            submittedAt: new Date(),
            data: responseData,
        });
        return form.save();
    }
    async update(id, updateData) {
        const form = await this.formModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
        if (!form)
            throw new common_1.NotFoundException('Form not found');
        return form;
    }
    async delete(id) {
        return this.formModel.findByIdAndDelete(id).exec();
    }
    async seedForms() {
        const seedData = [
            {
                title: 'General Contact Form',
                description: 'Primary enquiry point for general questions and feedback.',
                fields: [
                    { label: 'Full Name', type: 'text', required: true },
                    { label: 'Email Address', type: 'email', required: true },
                    { label: 'Subject', type: 'text', required: false },
                    { label: 'Message', type: 'textarea', required: true }
                ],
                isActive: true,
                responses: []
            },
            {
                title: 'Bespoke Tasting Session',
                description: 'Booking form for exclusive wedding cake tasting experiences.',
                fields: [
                    { label: 'Name', type: 'text', required: true },
                    { label: 'Proposed Wedding Date', type: 'text', required: true },
                    { label: 'Number of Guests', type: 'number', required: true },
                    { label: 'Dietary Requirements', type: 'textarea', required: false },
                    { label: 'Flavour Preferences', type: 'select', required: true, options: ['Classic Vanilla', 'Nigerian Red Velvet', 'Sicilian Lemon', 'Dark Ganache'] }
                ],
                isActive: true,
                responses: []
            },
            {
                title: 'Corporate Catering Request',
                description: 'Large-scale order management for corporate events and launches.',
                fields: [
                    { label: 'Company Name', type: 'text', required: true },
                    { label: 'Contact Person', type: 'text', required: true },
                    { label: 'Event Date', type: 'text', required: true },
                    { label: 'Volume Estimate', type: 'number', required: true },
                    { label: 'Event Type', type: 'select', required: true, options: ['Product Launch', 'Board Meeting', 'Office Party', 'Client Gifting'] }
                ],
                isActive: true,
                responses: []
            }
        ];
        for (const form of seedData) {
            await this.formModel.findOneAndUpdate({ title: form.title }, form, { upsert: true, new: true });
        }
        return { message: 'Form seeding complete', count: seedData.length };
    }
};
exports.FormsService = FormsService;
exports.FormsService = FormsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(form_schema_1.Form.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FormsService);
//# sourceMappingURL=forms.service.js.map