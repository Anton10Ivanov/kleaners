
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import LoginForm from "@/components/auth/LoginForm";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { logInfo, logError } from "@/utils/console-cleanup";

const Login = () => {
  const [isResetMode, setIsResetMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the path indicates password reset mode
  useEffect(() => {
    if (location.pathname.includes('forgot-password') || location.pathname.includes('reset-password')) {
      setIsResetMode(true);
    }
  }, [location.pathname]);

  // Store return URL in session storage for persistence through auth flow
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const returnUrl = params.get('returnUrl');
    if (returnUrl) {
      sessionStorage.setItem('authReturnUrl', returnUrl);
    }
  }, [location]);

  useEffect(() => {
    // Check if already logged in
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          logInfo('User logged in', { userId: user.id }, 'Login');
          
          // Redirect to returnUrl or default
          const returnUrl = sessionStorage.getItem('authReturnUrl') || '/';
          logInfo('Redirecting to', { returnUrl }, 'Login');
          sessionStorage.removeItem('authReturnUrl');
          navigate(returnUrl);
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
        // Redirect on sign in
        const returnUrl = sessionStorage.getItem('authReturnUrl') || '/';
        logInfo('Signed in, redirecting to', { returnUrl }, 'Login');
        sessionStorage.removeItem('authReturnUrl');
        navigate(returnUrl);
      }
    });

    return () => {
      if (authListener) authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  // Only show loading if explicitly set to true elsewhere
  if (isLoading) {
    return (
      <div className="flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 mt-16">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <h2 className="text-xl font-semibold mb-4">Loading...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 mt-16">
      {isResetMode ? (
        <ResetPasswordForm onBackToLogin={() => setIsResetMode(false)} />
      ) : (
        <LoginForm onResetMode={() => setIsResetMode(true)} />
      )}
    </div>
  );
};

export default Login;
