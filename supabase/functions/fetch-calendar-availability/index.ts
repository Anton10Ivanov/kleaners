
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { google } from "https://esm.sh/@googleapis/calendar@9.6.0";
import { corsHeaders } from "../_shared/cors.ts";

const CALENDAR_ID = 'ai@kleaners.de';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: Deno.env.get("GOOGLE_CLIENT_EMAIL"),
        private_key: Deno.env.get("GOOGLE_PRIVATE_KEY")?.replace(/\\n/g, '\n'),
        client_id: Deno.env.get("GOOGLE_CLIENT_ID"),
      },
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // Parse request body for date range
    const { startDate, endDate } = await req.json();
    
    // Convert dates to RFC3339 format
    const timeMin = new Date(startDate).toISOString();
    const timeMax = new Date(endDate).toISOString();

    console.log(`Fetching calendar availability from ${timeMin} to ${timeMax}`);

    // Fetch busy time slots
    const { data: freeBusyResponse } = await calendar.freebusy.query({
      requestBody: {
        timeMin,
        timeMax,
        items: [{ id: CALENDAR_ID }],
      },
    });

    // Get the busy periods for the calendar
    const busyPeriods = freeBusyResponse.calendars?.[CALENDAR_ID]?.busy || [];

    console.log('Busy periods found:', busyPeriods.length);

    return new Response(
      JSON.stringify({
        busyPeriods,
        calendarId: CALENDAR_ID,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error('Error fetching calendar availability:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch calendar availability',
        details: error.message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  }
});
