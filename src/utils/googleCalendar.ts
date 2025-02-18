
import { supabase } from "@/integrations/supabase/client";

interface GoogleCalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
}

export const addToGoogleCalendar = async (
  date: Date,
  service: string,
  duration: number,
  address: string
): Promise<void> => {
  try {
    const { data: credentials, error: credentialsError } = await supabase
      .from('calendar_credentials')
      .select('*')
      .maybeSingle();

    if (credentialsError) {
      throw new Error('Failed to fetch calendar credentials');
    }

    if (!credentials) {
      // Redirect to Google OAuth consent screen
      const redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(window.location.origin + '/auth/callback')}&response_type=code&scope=https://www.googleapis.com/auth/calendar&access_type=offline&prompt=consent`;
      window.location.href = redirectUrl;
      return;
    }

    // Calculate end time based on duration
    const endDate = new Date(date.getTime() + duration * 60 * 60 * 1000);

    const event: GoogleCalendarEvent = {
      id: crypto.randomUUID(),
      summary: `Cleaning Service: ${service}`,
      description: `Address: ${address}`,
      start: {
        dateTime: date.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };

    // Use the access token to create the event
    const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${credentials.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      throw new Error('Failed to create calendar event');
    }

    const eventData = await response.json();

    // Store the event in our database
    const { error: insertError } = await supabase
      .from('calendar_events')
      .insert({
        event_id: eventData.id,
        title: event.summary,
        description: event.description,
        start_time: event.start.dateTime,
        end_time: event.end.dateTime,
        user_id: (await supabase.auth.getUser()).data.user?.id,
      });

    if (insertError) {
      throw new Error('Failed to store calendar event');
    }

  } catch (error) {
    console.error('Error adding event to Google Calendar:', error);
    throw error;
  }
};
