
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
    // Get the access token from the request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header provided');
    }
    const accessToken = authHeader.replace('Bearer ', '');

    // Create Google Calendar API client
    const calendar = google.calendar('v3');
    
    // Parse request body for date range
    const { startDate, endDate } = await req.json();
    
    console.log('Requesting freebusy for time range:', { startDate, endDate });

    // Make the freebusy query
    const freeBusyRequest = await fetch(
      `https://www.googleapis.com/calendar/v3/freeBusy`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timeMin: startDate,
          timeMax: endDate,
          items: [{ id: CALENDAR_ID }],
        }),
      }
    );

    if (!freeBusyRequest.ok) {
      const errorData = await freeBusyRequest.json();
      console.error('FreeBusy API error:', errorData);
      throw new Error(`FreeBusy API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const freeBusyResponse = await freeBusyRequest.json();
    console.log('FreeBusy response:', freeBusyResponse);

    const busyPeriods = freeBusyResponse.calendars?.[CALENDAR_ID]?.busy || [];
    console.log('Extracted busy periods:', busyPeriods);

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
      }
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
      }
    );
  }
});
