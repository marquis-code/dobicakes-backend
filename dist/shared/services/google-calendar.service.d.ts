import { ConfigService } from '@nestjs/config';
export declare class GoogleCalendarService {
    private configService;
    private calendar;
    constructor(configService: ConfigService);
    createEvent(eventDetails: {
        summary: string;
        description: string;
        startDateTime: Date;
        endDateTime: Date;
        attendeeEmail: string;
    }): Promise<import("googleapis").calendar_v3.Schema$Event>;
    deleteEvent(eventId: string): Promise<void>;
}
