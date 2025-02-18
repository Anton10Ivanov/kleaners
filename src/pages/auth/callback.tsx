
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const GoogleCalendarCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const code = new URLSearchParams(window.location.search).get('code');
      
      if (!code) {
        toast.error('No authorization code received');
        navigate('/');
        return;
      }

      try {
        // Exchange the code for tokens
        const response = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            code,
            client_id: process.env.GOOGLE_CLIENT_ID!,
            client_secret: process.env.GOOGLE_CLIENT_SECRET!,
            redirect_uri: window.location.origin + '/auth/callback',
            grant_type: 'authorization_code',
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to exchange authorization code');
        }

        const { access_token, refresh_token, expires_in } = await response.json();

        // Store the tokens in Supabase
        const { error: insertError } = await supabase
          .from('calendar_credentials')
          .insert({
            user_id: (await supabase.auth.getUser()).data.user?.id,
            access_token,
            refresh_token,
            expiry_date: new Date(Date.now() + expires_in * 1000).toISOString(),
          });

        if (insertError) {
          throw new Error('Failed to store calendar credentials');
        }

        toast.success('Successfully connected to Google Calendar');
        navigate('/');
      } catch (error) {
        console.error('Error handling callback:', error);
        toast.error('Failed to connect to Google Calendar');
        navigate('/');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Connecting to Google Calendar...</h2>
        <p className="text-gray-600">Please wait while we complete the setup.</p>
      </div>
    </div>
  );
};

export default GoogleCalendarCallback;
