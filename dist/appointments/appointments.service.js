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
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const appointment_schema_1 = require("../schemas/appointment.schema");
const appointment_product_schema_1 = require("../schemas/appointment-product.schema");
const google_calendar_service_1 = require("../shared/services/google-calendar.service");
const paystack_service_1 = require("../shared/services/paystack.service");
const schedule_1 = require("@nestjs/schedule");
const resend_service_1 = require("../shared/services/resend.service");
let AppointmentsService = class AppointmentsService {
    appointmentModel;
    productModel;
    calendarService;
    paystackService;
    resendService;
    constructor(appointmentModel, productModel, calendarService, paystackService, resendService) {
        this.appointmentModel = appointmentModel;
        this.productModel = productModel;
        this.calendarService = calendarService;
        this.paystackService = paystackService;
        this.resendService = resendService;
    }
    async createProduct(data) {
        return this.productModel.create(data);
    }
    async findAllProducts() {
        return this.productModel.find({ isActive: true }).exec();
    }
    async findOneProduct(id) {
        const product = await this.productModel.findById(id).exec();
        if (!product)
            throw new common_1.NotFoundException('Appointment product not found');
        return product;
    }
    async updateProduct(id, data) {
        return this.productModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async deleteProduct(id) {
        return this.productModel.findByIdAndUpdate(id, { isActive: false }).exec();
    }
    async checkAvailability(productId, requestedDate) {
        const product = await this.findOneProduct(productId);
        const dayName = requestedDate.toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
        if (!product.availability.days.includes(dayName)) {
            throw new common_1.BadRequestException('Consultant is not available on this day');
        }
        const [startHour, startMin] = product.availability.startTime.split(':').map(Number);
        const [endHour, endMin] = product.availability.endTime.split(':').map(Number);
        const reqHour = requestedDate.getHours();
        const reqMin = requestedDate.getMinutes();
        if (reqHour < startHour || (reqHour === startHour && reqMin < startMin) ||
            reqHour > endHour || (reqHour === endHour && reqMin > endMin)) {
            throw new common_1.BadRequestException('Selected time is outside available hours');
        }
        const endTime = new Date(requestedDate.getTime() + product.duration * 60000);
        const overlap = await this.appointmentModel.findOne({
            product: productId,
            status: 'confirmed',
            scheduledAt: { $lt: endTime, $gte: requestedDate }
        });
        if (overlap) {
            throw new common_1.BadRequestException('This slot is already secured');
        }
        return true;
    }
    async createAppointment(data) {
        const product = await this.findOneProduct(data.productId);
        const scheduledAt = new Date(data.scheduledAt);
        await this.checkAvailability(data.productId, scheduledAt);
        const appointment = await this.appointmentModel.create({
            user: data.userId,
            product: data.productId,
            customerName: data.customerName,
            customerEmail: data.customerEmail,
            customerPhone: data.customerPhone,
            scheduledAt,
            duration: product.duration,
            price: product.price,
            notes: data.notes,
            status: 'pending',
            paymentStatus: 'unpaid'
        });
        const payment = await this.paystackService.initializePayment(data.customerEmail, product.price, { appointmentId: appointment._id, type: 'appointment' });
        return {
            appointment,
            paymentUrl: payment.data.authorization_url,
            reference: payment.data.reference
        };
    }
    async verifyAppointmentPayment(reference) {
        const verification = await this.paystackService.verifyPayment(reference);
        if (verification.data.status === 'success') {
            const appointmentId = verification.data.metadata.appointmentId;
            const appointment = await this.appointmentModel.findById(appointmentId).populate('product');
            if (!appointment)
                throw new common_1.BadRequestException('Appointment record not found');
            if (appointment.paymentStatus === 'paid')
                return appointment;
            appointment.paymentStatus = 'paid';
            appointment.status = 'confirmed';
            appointment.paymentReference = reference;
            const event = await this.calendarService.createEvent({
                summary: `Dobi Cakes: ${appointment.product.title} - ${appointment.customerName}`,
                description: `Bespoke Consultation. Notes: ${appointment.notes || 'None'}`,
                startDateTime: appointment.scheduledAt,
                endDateTime: new Date(appointment.scheduledAt.getTime() + appointment.duration * 60000),
                attendeeEmail: appointment.customerEmail
            });
            appointment.googleCalendarEventId = event.id || '';
            appointment.googleMeetLink = event.hangoutLink || '';
            await appointment.save();
            await this.resendService.sendEmail(appointment.customerEmail, 'Consultation Confirmed - Dobi Cakes', `
        <div style="font-family: serif; padding: 40px; color: #1a1a1a;">
          <h2 style="letter-spacing: 2px;">Consultation Secured</h2>
          <p>Your artisanal consultation for <strong>${appointment.product.title}</strong> is confirmed.</p>
          <div style="margin: 20px 0; padding: 20px; background: #fcfbfa; border: 1px solid #c5a059;">
            <p><strong>Date:</strong> ${appointment.scheduledAt.toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${appointment.scheduledAt.toLocaleTimeString()}</p>
            <p><strong>Meeting Link:</strong> <a href="${appointment.googleMeetLink}">${appointment.googleMeetLink}</a></p>
          </div>
          <p style="font-size: 12px; color: #666;">Please join the link at the scheduled time. A reminder will be sent 1 hour before.</p>
        </div>
        `);
            return appointment;
        }
        throw new common_1.BadRequestException('Payment verification protocol failed');
    }
    async findAll() {
        return this.appointmentModel.find().populate('product').sort({ scheduledAt: -1 }).exec();
    }
    async findOne(id) {
        const appointment = await this.appointmentModel.findById(id).populate('product').exec();
        if (!appointment)
            throw new common_1.NotFoundException('Appointment record not found');
        return appointment;
    }
    async findByUser(userId) {
        return this.appointmentModel.find({ user: userId }).populate('product').sort({ scheduledAt: -1 }).exec();
    }
    async sendAppointmentReminders() {
        const oneHourFromNow = new Date(Date.now() + 60 * 60 * 1000);
        const twoHoursFromNow = new Date(Date.now() + 120 * 60 * 1000);
        const upcoming = await this.appointmentModel.find({
            status: 'confirmed',
            paymentStatus: 'paid',
            reminderSent: false,
            scheduledAt: { $gte: oneHourFromNow, $lt: twoHoursFromNow }
        }).populate('product');
        for (const app of upcoming) {
            await this.resendService.sendEmail(app.customerEmail, 'Reminder: Your Dobi Cakes Consultation starts in 1 hour', `
        <div style="font-family: serif; padding: 40px; color: #1a1a1a;">
          <p>Just a gentle reminder that your <strong>${app.product.title}</strong> starts in one hour.</p>
          <p><strong>Link:</strong> <a href="${app.googleMeetLink}">${app.googleMeetLink}</a></p>
        </div>
        `);
            app.reminderSent = true;
            await app.save();
        }
    }
    async delete(id) {
        const appointment = await this.appointmentModel.findById(id);
        if (appointment && appointment.googleCalendarEventId) {
            await this.calendarService.deleteEvent(appointment.googleCalendarEventId);
        }
        return this.appointmentModel.findByIdAndDelete(id).exec();
    }
};
exports.AppointmentsService = AppointmentsService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppointmentsService.prototype, "sendAppointmentReminders", null);
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(appointment_schema_1.Appointment.name)),
    __param(1, (0, mongoose_1.InjectModel)(appointment_product_schema_1.AppointmentProduct.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        google_calendar_service_1.GoogleCalendarService,
        paystack_service_1.PaystackService,
        resend_service_1.ResendService])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map