import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { validatePassword } from '@/utils/security';
import { logger } from '@/utils/logging';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const checkSession = async () => {
      try {
        // Check if we have a valid session from the password reset link
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          logger.error('Session check error', { error: error.message }, 'ResetPassword');
          toast({
            variant: "destructive",
            title: "Invalid Reset Link",
            description: "This password reset link is invalid or has expired. Please request a new one.",
          });
          navigate('/login');
          return;
        }

        if (session) {
          setIsValidSession(true);
        } else {
          // Try to get session from URL hash (for email links)
          const hashParams = new URLSearchParams(window.location.hash.substring(1));
          const accessToken = hashParams.get('access_token');
          const refreshToken = hashParams.get('refresh_token');
          
          if (accessToken && refreshToken) {
            const { data, error: setSessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken
            });
            
            if (setSessionError) {
              logger.error('Set session error', { error: setSessionError.message }, 'ResetPassword');
              toast({
                variant: "destructive",
                title: "Invalid Reset Link",
                description: "This password reset link is invalid or has expired. Please request a new one.",
              });
              navigate('/login');
              return;
            }
            
            setIsValidSession(true);
          } else {
            toast({
              variant: "destructive",
              title: "Invalid Reset Link",
              description: "This password reset link is invalid or has expired. Please request a new one.",
            });
            navigate('/login');
          }
        }
      } catch (error) {
        logger.error('Session check failed', { error }, 'ResetPassword');
        toast({
          variant: "destructive",
          title: "Error",
          description: "An error occurred while verifying your reset link. Please try again.",
        });
        navigate('/login');
      } finally {
        setIsCheckingSession(false);
      }
    };

    checkSession();
  }, [navigate, toast]);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match",
      });
      return;
    }

    // Enhanced password validation
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      toast({
        variant: "destructive",
        title: "Password Requirements",
        description: passwordValidation.errors.join(', '),
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;

      toast({
        title: "Password Updated",
        description: "Your password has been successfully updated. You can now log in with your new password.",
      });

      // Sign out and redirect to login
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error) {
      logger.error('Password reset failed', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }, "ResetPassword");
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingSession) {
    return (
      <div className="flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-900 card-spacing-sm mt-16">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <h2 className="text-xl font-semibold mb-4">Verifying reset link...</h2>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isValidSession) {
    return null; // Will redirect to login
  }

  return (
    <div className="flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-900 card-spacing-sm mt-16">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Set New Password</CardTitle>
          <CardDescription>
            Enter your new password below
          </CardDescription>
        </CardHeader>
        <form onSubmit={handlePasswordReset}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your new password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm your new password"
              />
            </div>
          </CardContent>
          <CardContent className="pt-0">
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Updating Password..." : "Update Password"}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default ResetPassword;
