
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import LoginForm from "@/components/auth/LoginForm";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

  // Parse the return URL from query params or use default routes
  const getReturnUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.get('returnUrl') || '/';
  };

  // Store return URL in session storage for persistence through auth flow
  useEffect(() => {
    const returnUrl = getReturnUrl();
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
          console.log('User logged in:', user.id);
          
          // Redirect to returnUrl or default
          const returnUrl = sessionStorage.getItem('authReturnUrl') || '/';
          console.log('Redirecting to:', returnUrl);
          sessionStorage.removeItem('authReturnUrl');
          navigate(returnUrl);
        }
      } catch (error) {
        console.error("Auth check error:", error);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      
      if (event === 'SIGNED_IN' && session?.user) {
        // Redirect on sign in
        const returnUrl = sessionStorage.getItem('authReturnUrl') || '/';
        console.log('Signed in, redirecting to:', returnUrl);
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
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 mt-16">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <h2 className="text-xl font-semibold mb-4">Loading...</h2>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 mt-16">
        {isResetMode ? (
          <ResetPasswordForm onBackToLogin={() => setIsResetMode(false)} />
        ) : (
          <LoginForm onResetMode={() => setIsResetMode(true)} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Login;
