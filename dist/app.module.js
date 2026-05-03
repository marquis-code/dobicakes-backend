"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const products_module_1 = require("./products/products.module");
const orders_module_1 = require("./orders/orders.module");
const shared_module_1 = require("./shared/shared.module");
const chat_module_1 = require("./chat/chat.module");
const blog_module_1 = require("./blog/blog.module");
const forms_module_1 = require("./forms/forms.module");
const appointments_module_1 = require("./appointments/appointments.module");
const enquiries_module_1 = require("./enquiries/enquiries.module");
const notifications_module_1 = require("./notifications/notifications.module");
const marketing_module_1 = require("./marketing/marketing.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const cache_manager_1 = require("@nestjs/cache-manager");
const cache_manager_redis_yet_1 = require("cache-manager-redis-yet");
const nestjs_pino_1 = require("nestjs-pino");
const schedule_1 = require("@nestjs/schedule");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_pino_1.LoggerModule.forRoot({
                pinoHttp: {
                    transport: process.env.NODE_ENV !== 'production'
                        ? { target: 'pino-pretty', options: { colorize: true } }
                        : undefined,
                }
            }),
            schedule_1.ScheduleModule.forRoot(),
            cache_manager_1.CacheModule.registerAsync({
                isGlobal: true,
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => {
                    try {
                        const store = await (0, cache_manager_redis_yet_1.redisStore)({
                            socket: {
                                host: configService.get('REDIS_HOST') || 'localhost',
                                port: parseInt(configService.get('REDIS_PORT') || '6379'),
                            },
                        });
                        return { store };
                    }
                    catch (e) {
                        console.warn('Failed to connect to Redis, falling back to memory cache:', e.message);
                        return { ttl: 300 };
                    }
                },
                inject: [config_1.ConfigService],
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    uri: configService.get('MONGODB_URI'),
                    maxPoolSize: 50,
                    minPoolSize: 5,
                    connectTimeoutMS: 10000,
                    socketTimeoutMS: 45000,
                }),
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            products_module_1.ProductsModule,
            orders_module_1.OrdersModule,
            shared_module_1.SharedModule,
            chat_module_1.ChatModule,
            blog_module_1.BlogModule,
            forms_module_1.FormsModule,
            appointments_module_1.AppointmentsModule,
            enquiries_module_1.EnquiriesModule,
            notifications_module_1.NotificationsModule,
            marketing_module_1.MarketingModule,
            dashboard_module_1.DashboardModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map