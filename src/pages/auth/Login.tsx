
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import LoginForm from "@/components/auth/LoginForm";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

const Login = () => {
  const [isResetMode, setIsResetMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

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
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          console.log('User already logged in:', user.id);
          
          // Check if user is admin
          const { data: isAdmin, error } = await supabase
            .rpc('check_is_admin', {
              user_id: user.id
            });

          if (error) {
            console.error('Error checking admin status:', error);
            setIsLoading(false);
            return;
          }

          // Get the stored return URL (or default)
          const returnUrl = sessionStorage.getItem('authReturnUrl') || 
                           (isAdmin ? '/admin' : '/');
          
          console.log('Redirecting to:', returnUrl);
          
          // Clear the stored URL after use
          sessionStorage.removeItem('authReturnUrl');
          
          // Redirect user based on role and stored return URL
          navigate(returnUrl);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setIsLoading(false);
      }
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      
      if (event === 'SIGNED_IN' && session?.user) {
        try {
          // Check if user is admin
          const { data: isAdmin, error } = await supabase
            .rpc('check_is_admin', {
              user_id: session.user.id
            });

          if (error) {
            console.error('Error checking admin status:', error);
            return;
          }

          // Get the stored return URL (or default)
          const returnUrl = sessionStorage.getItem('authReturnUrl') || 
                           (isAdmin ? '/admin' : '/');
          
          console.log('Signed in, redirecting to:', returnUrl);
          
          // Clear the stored URL after use
          sessionStorage.removeItem('authReturnUrl');
          
          // Redirect user based on role and stored return URL
          navigate(returnUrl);
        } catch (error) {
          console.error("Auth redirect error:", error);
        }
      }
    });

    return () => {
      if (authListener) authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 mt-16">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <h2 className="text-xl font-semibold mb-4">Checking authentication...</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 mt-16">
        {isResetMode ? (
          <ResetPasswordForm onBackToLogin={() => setIsResetMode(false)} />
        ) : (
          <LoginForm onResetMode={() => setIsResetMode(true)} />
        )}
      </div>
    </div>
  );
};

export default Login;
