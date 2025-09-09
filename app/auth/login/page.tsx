'use client'


import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { supabase } from '@/integrations/supabase/client';
import LoginForm from '@/components/auth/LoginForm';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import { getRedirectPathForUser } from '@/utils/auth-redirect';
import { logInfo, logError } from '@/utils/console-cleanup';

const Login = () => {
  const [isResetMode, setIsResetMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Check if the path indicates password reset mode
  useEffect(() => {
    if (pathname.includes('forgot-password') || pathname.includes('reset-password')) {
      setIsResetMode(true);
    }
  }, [pathname]);

  // Store return URL in session storage for persistence through auth flow
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const returnUrl = params.get('returnUrl');
    if (returnUrl) {
      sessionStorage.setItem('authReturnUrl', returnUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    // Check if already logged in
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          logInfo('User logged in', { userId: user.id }, 'Login');
          
          // Get the appropriate redirect path based on user role
          const redirectPath = await getRedirectPathForUser(user.id);
          logInfo('Redirecting to', { redirectPath }, 'Login');
          navigate(redirectPath);
        }
      } catch (error) {
        logError("Auth check error", error, 'Login');
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      logInfo('Auth state changed', { event }, 'Login');
      
      if (event === 'SIGNED_IN' && session?.user) {
        // Redirect on sign in based on user role
        const redirectPath = await getRedirectPathForUser(session.user.id);
        logInfo('Signed in, redirecting to', { redirectPath }, 'Login');
        navigate(redirectPath);
      }
    });

    return () => {
      if (authListener) authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  // Only show loading if explicitly set to true elsewhere
  if (isLoading) {
    return (
      <div className="flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-900 card-spacing-sm mt-16">
        <div className="bg-white dark:bg-gray-800 card-spacing-lg rounded-lg shadow-md w-full max-w-md">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <h2 className="text-xl font-semibold mb-4">Loading...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-900 card-spacing-sm mt-16">
      {isResetMode ? (
        <ResetPasswordForm onBackToLogin={() => setIsResetMode(false)} />
      ) : (
        <LoginForm onResetMode={() => setIsResetMode(true)} />
      )}
    </div>
  );
};

export default Login;
