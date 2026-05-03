import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Appointment } from '../schemas/appointment.schema';
import { AppointmentProduct } from '../schemas/appointment-product.schema';
import { GoogleCalendarService } from '../shared/services/google-calendar.service';
import { PaystackService } from '../shared/services/paystack.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ResendService } from '../shared/services/resend.service';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name) private appointmentModel: Model<Appointment>,
    @InjectModel(AppointmentProduct.name) private productModel: Model<AppointmentProduct>,
    private calendarService: GoogleCalendarService,
    private paystackService: PaystackService,
    private resendService: ResendService,
  ) {}

  // Appointment Product Management
  async createProduct(data: any) {
    return this.productModel.create(data);
  }

  async findAllProducts() {
    return this.productModel.find({ isActive: true }).exec();
  }

  async findOneProduct(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) throw new NotFoundException('Appointment product not found');
    return product;
  }

  async updateProduct(id: string, data: any) {
    return this.productModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async deleteProduct(id: string) {
    return this.productModel.findByIdAndUpdate(id, { isActive: false }).exec();
  }

  // Booking Logic
  async checkAvailability(productId: string, requestedDate: Date) {
    const product = await this.findOneProduct(productId);
    const dayName = requestedDate.toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
    
    // 1. Check if the day is available
    if (!product.availability.days.includes(dayName)) {
      throw new BadRequestException('Consultant is not available on this day');
    }

    // 2. Check time range
    const [startHour, startMin] = product.availability.startTime.split(':').map(Number);
    const [endHour, endMin] = product.availability.endTime.split(':').map(Number);
    
    const reqHour = requestedDate.getHours();
    const reqMin = requestedDate.getMinutes();

    if (reqHour < startHour || (reqHour === startHour && reqMin < startMin) ||
        reqHour > endHour || (reqHour === endHour && reqMin > endMin)) {
      throw new BadRequestException('Selected time is outside available hours');
    }

    // 3. Check for existing overlapping appointments
    const endTime = new Date(requestedDate.getTime() + product.duration * 60000);
    const overlap = await this.appointmentModel.findOne({
      product: productId as any,
      status: 'confirmed',
      scheduledAt: { $lt: endTime, $gte: requestedDate }
    });

    if (overlap) {
      throw new BadRequestException('This slot is already secured');
    }

    return true;
  }

  async createAppointment(data: any) {
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

    const payment = await this.paystackService.initializePayment(
      data.customerEmail,
      product.price,
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
      const appointment = await this.appointmentModel.findById(appointmentId).populate('product');
      
      if (!appointment) throw new BadRequestException('Appointment record not found');
      if (appointment.paymentStatus === 'paid') return appointment;

      appointment.paymentStatus = 'paid';
      appointment.status = 'confirmed';
      appointment.paymentReference = reference;

      // Generate Meet Link and Sync with Calendar
      const event: any = await this.calendarService.createEvent({
        summary: `Dobi Cakes: ${(appointment.product as any).title} - ${appointment.customerName}`,
        description: `Bespoke Consultation. Notes: ${appointment.notes || 'None'}`,
        startDateTime: appointment.scheduledAt,
        endDateTime: new Date(appointment.scheduledAt.getTime() + appointment.duration * 60000),
        attendeeEmail: appointment.customerEmail
      });

      appointment.googleCalendarEventId = event.id || '';
      appointment.googleMeetLink = event.hangoutLink || '';
      await appointment.save();

      // Send Confirmation Email
      await this.resendService.sendEmail(
        appointment.customerEmail,
        'Consultation Confirmed - Dobi Cakes',
        `
        <div style="font-family: serif; padding: 40px; color: #1a1a1a;">
          <h2 style="letter-spacing: 2px;">Consultation Secured</h2>
          <p>Your artisanal consultation for <strong>${(appointment.product as any).title}</strong> is confirmed.</p>
          <div style="margin: 20px 0; padding: 20px; background: #fcfbfa; border: 1px solid #c5a059;">
            <p><strong>Date:</strong> ${appointment.scheduledAt.toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${appointment.scheduledAt.toLocaleTimeString()}</p>
            <p><strong>Meeting Link:</strong> <a href="${appointment.googleMeetLink}">${appointment.googleMeetLink}</a></p>
          </div>
          <p style="font-size: 12px; color: #666;">Please join the link at the scheduled time. A reminder will be sent 1 hour before.</p>
        </div>
        `
      );
      
      return appointment;
    }
    
    throw new BadRequestException('Payment verification protocol failed');
  }

  async findAll() {
    return this.appointmentModel.find().populate('product').sort({ scheduledAt: -1 }).exec();
  }

  async findOne(id: string) {
    const appointment = await this.appointmentModel.findById(id).populate('product').exec();
    if (!appointment) throw new NotFoundException('Appointment record not found');
    return appointment;
  }

  async findByUser(userId: string) {
    return this.appointmentModel.find({ user: userId as any }).populate('product').sort({ scheduledAt: -1 }).exec();
  }

  // Cron for Hourly Reminders
  @Cron(CronExpression.EVERY_HOUR)
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
      await this.resendService.sendEmail(
        app.customerEmail,
        'Reminder: Your Dobi Cakes Consultation starts in 1 hour',
        `
        <div style="font-family: serif; padding: 40px; color: #1a1a1a;">
          <p>Just a gentle reminder that your <strong>${(app.product as any).title}</strong> starts in one hour.</p>
          <p><strong>Link:</strong> <a href="${app.googleMeetLink}">${app.googleMeetLink}</a></p>
        </div>
        `
      );
      app.reminderSent = true;
      await app.save();
    }
  }

  async delete(id: string) {
    const appointment = await this.appointmentModel.findById(id);
    if (appointment && appointment.googleCalendarEventId) {
      await this.calendarService.deleteEvent(appointment.googleCalendarEventId);
    }
    return this.appointmentModel.findByIdAndDelete(id).exec();
  }
}
