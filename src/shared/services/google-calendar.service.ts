import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { google } from 'googleapis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleCalendarService {
  private calendar;

  constructor(private configService: ConfigService) {
    const credentials = {
      client_email: this.configService.get('GOOGLE_CLIENT_EMAIL'),
      private_key: this.configService.get('GOOGLE_PRIVATE_KEY')?.replace(/\\n/g, '\n'),
    };

    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    this.calendar = google.calendar({ version: 'v3', auth });
  }

  async createEvent(eventDetails: {
    summary: string;
    description: string;
    startDateTime: Date;
    endDateTime: Date;
    attendeeEmail: string;
  }) {
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
    } catch (error) {
      console.error('Google Calendar API Error:', error);
      throw new InternalServerErrorException('Failed to create calendar event');
    }
  }

  async deleteEvent(eventId: string) {
    try {
      await this.calendar.events.delete({
        calendarId: this.configService.get('GOOGLE_CALENDAR_ID') || 'primary',
        eventId: eventId,
      });
    } catch (error) {
      console.error('Google Calendar Delete Error:', error);
    }
  }
}
