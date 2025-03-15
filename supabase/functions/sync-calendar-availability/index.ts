
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { format } from 'https://esm.sh/date-fns@2';
import { corsHeaders } from '../_shared/cors.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { startDate, endDate } = await req.json();

    // Fetch Google Calendar events
    const { data: credentials } = await supabase
      .from('calendar_credentials')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (!credentials) {
      return new Response(
        JSON.stringify({ error: 'No calendar credentials found' }),
        { headers: { 'Content-Type': 'application/json', ...corsHeaders }, status: 404 }
      );
    }

    // Fetch events from Google Calendar
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${startDate}&timeMax=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${credentials.access_token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch calendar events');
    }

    const { items: events } = await response.json();

    // Update availability in our database
    for (const event of events) {
      const startDateTime = new Date(event.start.dateTime);
      const endDateTime = new Date(event.end.dateTime);
      
      const date = format(startDateTime, 'yyyy-MM-dd');
      const timeSlot = `${format(startDateTime, 'HH:mm')}-${format(endDateTime, 'HH:mm')}`;

      await supabase
        .from('calendar_availability')
        .upsert({
          date,
          time_slot: timeSlot,
          is_available: false,
          updated_at: new Date().toISOString(),
        });
    }

    return new Response(
      JSON.stringify({ message: 'Calendar availability updated successfully' }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch (error) {
    console.error('Error syncing calendar availability:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to sync calendar availability' }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders }, status: 500 }
    );
  }
});
