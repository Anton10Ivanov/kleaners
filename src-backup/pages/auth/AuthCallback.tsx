import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { getRedirectPathForUser } from '@/utils/auth-redirect';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the URL hash and search params
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const searchParams = new URLSearchParams(window.location.search);
        
        // Check for error in URL params
        const errorParam = hashParams.get('error') || searchParams.get('error');
        const errorDescription = hashParams.get('error_description') || searchParams.get('error_description');
        
        if (errorParam) {
          throw new Error(errorDescription || `OAuth error: ${errorParam}`);
        }

        // Handle the OAuth callback
        const { data, error: authError } = await supabase.auth.getSession();
        
        if (authError) {
          throw authError;
        }

        if (data.session) {
          // User is successfully authenticated
          toast({
            title: "Success!",
            description: "You have been logged in successfully.",
          });
          
          // Redirect based on user role
          const redirectPath = await getRedirectPathForUser(data.session.user.id);
          navigate(redirectPath);
        } else {
          // No session found, redirect to login
          navigate('/login');
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        setError(err instanceof Error ? err.message : 'Authentication failed');
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: err instanceof Error ? err.message : 'Failed to authenticate',
        });
        
        // Redirect to login after showing error
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } finally {
        setIsLoading(false);
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-900 card-spacing-sm mt-16">
        <div className="bg-white dark:bg-gray-800 card-spacing-lg rounded-lg shadow-md w-full max-w-md">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <h2 className="text-xl font-semibold mb-4">Completing authentication...</h2>
            <p className="text-sm text-muted-foreground text-center">
              Please wait while we complete your login.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-900 card-spacing-sm mt-16">
        <div className="bg-white dark:bg-gray-800 card-spacing-lg rounded-lg shadow-md w-full max-w-md">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2 text-red-600 dark:text-red-400">Authentication Failed</h2>
            <p className="text-sm text-muted-foreground mb-4">{error}</p>
            <p className="text-xs text-muted-foreground">Redirecting to login page...</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default AuthCallback;
