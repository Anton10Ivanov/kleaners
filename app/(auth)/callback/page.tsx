'use client'


import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";

const GoogleCalendarCallback = () => {

  useEffect(() => {
    const handleCallback = async () => {
      const code = new URLSearchParams(window.location.search).get('code');
      
      if (!code) {
        toast.error('No authorization code received');
        navigate('/');
        return;
      }

      try {
        // Get current session for authentication
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          toast.error('Please log in to connect Google Calendar');
          navigate('/');
          return;
        }

        // Use secure edge function to exchange tokens
        const { data, error } = await supabase.functions.invoke('google-oauth-exchange', {
          body: {
            code,
            redirectUri: window.location.origin + '/auth/callback'
          },
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (error) {
          throw new Error(error.message || 'Failed to exchange authorization code');
        }

        if (!data?.success) {
          throw new Error(data?.error || 'Failed to connect to Google Calendar');
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
