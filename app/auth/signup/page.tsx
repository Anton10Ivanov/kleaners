'use client'


import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from '@/integrations/supabase/client";
import SignupForm from '@/components/auth/SignupForm";
import { getRedirectPathForUser } from '@/utils/auth-redirect";

const Signup = () => {
  const navigate = useRouter();
  const location = usePathname();
  
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
  
  // Check if already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // User is already logged in, redirect based on role
          const redirectPath = await getRedirectPathForUser(user.id);
          navigate(redirectPath);
        }
      } catch (error) {
        console.error("Auth check error:", error);
      }
    };

    checkAuth();
    
    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const redirectPath = await getRedirectPathForUser(session.user.id);
        navigate(redirectPath);
      }
    });

    return () => {
      if (authListener) authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-900 card-spacing-sm mt-16">
      <SignupForm />
    </div>
  );
};

export default Signup;
