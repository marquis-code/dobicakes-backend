import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { SharedModule } from './shared/shared.module';
import { ChatModule } from './chat/chat.module';
import { BlogModule } from './blog/blog.module';
import { FormsModule } from './forms/forms.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { EnquiriesModule } from './enquiries/enquiries.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MarketingModule } from './marketing/marketing.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        try {
          const store = await redisStore({
            socket: {
              host: configService.get('REDIS_HOST') || 'localhost',
              port: parseInt(configService.get('REDIS_PORT') || '6379'),
            },
          });
          return { store };
        } catch (e) {
          console.warn('Failed to connect to Redis, falling back to memory cache:', e.message);
          return { ttl: 300 }; // Default memory store
        }
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    OrdersModule,
    SharedModule,
    ChatModule,
    BlogModule,
    FormsModule,
    AppointmentsModule,
    EnquiriesModule,
    NotificationsModule,
    MarketingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

