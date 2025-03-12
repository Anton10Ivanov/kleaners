
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const VerifyProvider = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setError('No verification token found in URL');
        setIsLoading(false);
        return;
      }

      try {
        // Call the edge function to verify the token
        const { data, error: verifyError } = await supabase.functions.invoke('verify-provider-magic-link', {
          body: { token }
        });
        
        if (verifyError) throw verifyError;
        
        if (data.success) {
          setIsVerified(true);
          toast.success('Your account has been verified successfully!');
          
          // Log the user in after a short delay
          setTimeout(() => {
            navigate('/provider');
          }, 3000);
        } else {
          setError(data.error || 'Verification failed');
        }
      } catch (err) {
        console.error('Error verifying provider:', err);
        setError('There was an error verifying your account. Please try again or contact support.');
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Provider Verification</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4 text-center">
          {isLoading ? (
            <div className="flex flex-col items-center space-y-4">
              <Spinner size="lg" />
              <p className="text-gray-600 dark:text-gray-300">Verifying your account...</p>
            </div>
          ) : isVerified ? (
            <div className="space-y-4">
              <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg font-medium text-green-600">Your account has been verified successfully!</p>
              <p className="text-gray-600 dark:text-gray-300">You'll be redirected to your dashboard shortly.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-full bg-red-100 w-16 h-16 flex items-center justify-center mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="text-lg font-medium text-red-600">Verification Failed</p>
              <p className="text-gray-600 dark:text-gray-300">{error || 'There was an error verifying your account.'}</p>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center">
          {!isLoading && !isVerified && (
            <Button onClick={() => navigate('/auth/login')}>Back to Login</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyProvider;
