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
const google_calendar_service_1 = require("../shared/services/google-calendar.service");
const paystack_service_1 = require("../shared/services/paystack.service");
let AppointmentsService = class AppointmentsService {
    appointmentModel;
    calendarService;
    paystackService;
    constructor(appointmentModel, calendarService, paystackService) {
        this.appointmentModel = appointmentModel;
        this.calendarService = calendarService;
        this.paystackService = paystackService;
    }
    async create(data) {
        const appointment = await this.appointmentModel.create({
            ...data,
            status: 'pending',
            paymentStatus: 'unpaid'
        });
        const payment = await this.paystackService.initializePayment(data.customerEmail, data.price, { appointmentId: appointment._id, type: 'appointment' });
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
            const appointment = await this.appointmentModel.findById(appointmentId);
            if (!appointment)
                throw new common_1.BadRequestException('Appointment not found');
            if (appointment.paymentStatus === 'paid')
                return appointment;
            appointment.paymentStatus = 'paid';
            appointment.status = 'confirmed';
            appointment.paymentReference = reference;
            const event = await this.calendarService.createEvent({
                summary: `Dobi Cakes: ${appointment.type} - ${appointment.customerName}`,
                description: `Appointment with ${appointment.customerName}. Notes: ${appointment.notes || 'None'}`,
                startDateTime: new Date(`${appointment.date.toISOString().split('T')[0]}T${appointment.time}`),
                endDateTime: new Date(new Date(`${appointment.date.toISOString().split('T')[0]}T${appointment.time}`).getTime() + appointment.duration * 60000),
                attendeeEmail: appointment.customerEmail
            });
            appointment.googleCalendarEventId = event.id || '';
            await appointment.save();
            return appointment;
        }
        throw new common_1.BadRequestException('Payment verification failed');
    }
    async findAll() {
        return this.appointmentModel.find().sort({ date: -1 }).exec();
    }
    async findOne(id) {
        return this.appointmentModel.findById(id).exec();
    }
    async findByUser(userId) {
        return this.appointmentModel.find({ user: userId }).sort({ date: -1 }).exec();
    }
    async updateStatus(id, status) {
        const appointment = await this.appointmentModel.findById(id);
        if (appointment && status === 'cancelled' && appointment.googleCalendarEventId) {
            await this.calendarService.deleteEvent(appointment.googleCalendarEventId);
        }
        return this.appointmentModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
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
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(appointment_schema_1.Appointment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        google_calendar_service_1.GoogleCalendarService,
        paystack_service_1.PaystackService])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map