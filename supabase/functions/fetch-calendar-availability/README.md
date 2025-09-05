
# fetch-calendar-availability Function

This function fetches availability information from the Google Calendar API for ai@kleaners.de.

## Configuration

Make sure the following environment variables are set in your Supabase project:

- GOOGLE_CLIENT_EMAIL
- GOOGLE_PRIVATE_KEY
- GOOGLE_CLIENT_ID

## Usage

Send a POST request with a JSON body containing:
```json
{
  "startDate": "2024-03-20T00:00:00Z",
  "endDate": "2024-03-21T00:00:00Z"
}
```

The function will return busy periods within the specified date range.
