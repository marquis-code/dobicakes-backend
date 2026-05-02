import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryService } from './services/cloudinary.service';
import { ResendService } from './services/resend.service';
import { PaystackService } from './services/paystack.service';

@Module({
  imports: [ConfigModule],
  providers: [CloudinaryService, ResendService, PaystackService],
  exports: [CloudinaryService, ResendService, PaystackService],
})
export class SharedModule {}
