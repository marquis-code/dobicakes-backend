import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryService } from './services/cloudinary.service';
import { ResendService } from './services/resend.service';
import { PaystackService } from './services/paystack.service';
import { GoogleCalendarService } from './services/google-calendar.service';

@Module({
  imports: [ConfigModule],
  providers: [CloudinaryService, ResendService, PaystackService, GoogleCalendarService],
  exports: [CloudinaryService, ResendService, PaystackService, GoogleCalendarService],
})
export class SharedModule {}
