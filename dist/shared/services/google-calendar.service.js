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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleCalendarService = void 0;
const common_1 = require("@nestjs/common");
const googleapis_1 = require("googleapis");
const config_1 = require("@nestjs/config");
let GoogleCalendarService = class GoogleCalendarService {
    configService;
    calendar;
    constructor(configService) {
        this.configService = configService;
        const credentials = {
            client_email: this.configService.get('GOOGLE_CLIENT_EMAIL'),
            private_key: this.configService.get('GOOGLE_PRIVATE_KEY')?.replace(/\\n/g, '\n'),
        };
        const auth = new googleapis_1.google.auth.JWT({
            email: credentials.client_email,
            key: credentials.private_key,
            scopes: ['https://www.googleapis.com/auth/calendar'],
        });
        this.calendar = googleapis_1.google.calendar({ version: 'v3', auth });
    }
    async createEvent(eventDetails) {
        try {
            const event = {
                summary: eventDetails.summary,
                description: eventDetails.description,
                start: {
                    dateTime: eventDetails.startDateTime.toISOString(),
                    timeZone: 'Africa/Lagos',
                },
                end: {
                    dateTime: eventDetails.endDateTime.toISOString(),
                    timeZone: 'Africa/Lagos',
                },
                attendees: [{ email: eventDetails.attendeeEmail }],
                conferenceData: {
                    createRequest: {
                        requestId: `dobi-meet-${Date.now()}`,
                        conferenceSolutionKey: { type: 'hangoutsMeet' },
                    },
                },
                reminders: {
                    useDefault: false,
                    overrides: [
                        { method: 'email', minutes: 24 * 60 },
                        { method: 'popup', minutes: 30 },
                    ],
                },
            };
            const response = await this.calendar.events.insert({
                calendarId: this.configService.get('GOOGLE_CALENDAR_ID') || 'primary',
                requestBody: event,
                conferenceDataVersion: 1,
            });
            return response.data;
        }
        catch (error) {
            console.error('Google Calendar API Error:', error);
            throw new common_1.InternalServerErrorException('Failed to create calendar event');
        }
    }
    async deleteEvent(eventId) {
        try {
            await this.calendar.events.delete({
                calendarId: this.configService.get('GOOGLE_CALENDAR_ID') || 'primary',
                eventId: eventId,
            });
        }
        catch (error) {
            console.error('Google Calendar Delete Error:', error);
        }
    }
};
exports.GoogleCalendarService = GoogleCalendarService;
exports.GoogleCalendarService = GoogleCalendarService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], GoogleCalendarService);
//# sourceMappingURL=google-calendar.service.js.map