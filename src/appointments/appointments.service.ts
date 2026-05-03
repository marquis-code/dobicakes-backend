import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment } from '../schemas/appointment.schema';
import { GoogleCalendarService } from '../shared/services/google-calendar.service';
import { PaystackService } from '../shared/services/paystack.service';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name) private appointmentModel: Model<Appointment>,
    private calendarService: GoogleCalendarService,
    private paystackService: PaystackService,
  ) {}

  async create(data: any) {
    const appointment = await this.appointmentModel.create({
      ...data,
      status: 'pending',
      paymentStatus: 'unpaid'
    });

    // Initialize Paystack payment
    const payment = await this.paystackService.initializePayment(
      data.customerEmail,
      data.price,
      { appointmentId: appointment._id, type: 'appointment' }
    );

    return {
      appointment,
      paymentUrl: payment.data.authorization_url,
      reference: payment.data.reference
    };
  }

  async verifyAppointmentPayment(reference: string) {
    const verification = await this.paystackService.verifyPayment(reference);
    
    if (verification.data.status === 'success') {
      const appointmentId = verification.data.metadata.appointmentId;
      const appointment = await this.appointmentModel.findById(appointmentId);
      
      if (!appointment) throw new BadRequestException('Appointment not found');
      if (appointment.paymentStatus === 'paid') return appointment;

      appointment.paymentStatus = 'paid';
      appointment.status = 'confirmed';
      appointment.paymentReference = reference;

      // Sync with Google Calendar
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
    
    throw new BadRequestException('Payment verification failed');
  }

  async findAll() {
    return this.appointmentModel.find().sort({ date: -1 }).exec();
  }

  async findOne(id: string) {
    return this.appointmentModel.findById(id).exec();
  }

  async findByUser(userId: string) {
    return this.appointmentModel.find({ user: userId }).sort({ date: -1 }).exec();
  }

  async updateStatus(id: string, status: string) {
    const appointment = await this.appointmentModel.findById(id);
    if (appointment && status === 'cancelled' && appointment.googleCalendarEventId) {
      await this.calendarService.deleteEvent(appointment.googleCalendarEventId);
    }
    return this.appointmentModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }

  async delete(id: string) {
    const appointment = await this.appointmentModel.findById(id);
    if (appointment && appointment.googleCalendarEventId) {
      await this.calendarService.deleteEvent(appointment.googleCalendarEventId);
    }
    return this.appointmentModel.findByIdAndDelete(id).exec();
  }
}
