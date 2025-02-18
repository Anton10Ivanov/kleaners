
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { calendar_v3, auth } from "https://esm.sh/@googleapis/calendar@9.6.0";
import { corsHeaders } from "../_shared/cors.ts";

const CALENDAR_ID = 'ai@kleaners.de';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const client = new auth.OAuth2Client({
      clientId: Deno.env.get("GOOGLE_CLIENT_ID"),
      clientEmail: Deno.env.get("GOOGLE_CLIENT_EMAIL"),
    });

    // Initialize the Calendar API client
    const calendar = new calendar_v3.Calendar({
      auth: client,
    });

    // Parse request body for date range
    const { startDate, endDate } = await req.json();
    
    // Convert dates to RFC3339 format
    const timeMin = new Date(startDate).toISOString();
    const timeMax = new Date(endDate).toISOString();

    console.log(`Fetching calendar availability from ${timeMin} to ${timeMax}`);

    // Fetch busy time slots
    const freeBusyResponse = await calendar.freebusy.query({
      requestBody: {
        timeMin,
        timeMax,
        items: [{ id: CALENDAR_ID }],
      },
    });

    // Get the busy periods for the calendar
    const busyPeriods = freeBusyResponse.data.calendars?.[CALENDAR_ID]?.busy || [];

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
