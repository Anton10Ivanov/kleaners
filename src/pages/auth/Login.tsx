
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import LoginForm from "@/components/auth/LoginForm";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

const Login = () => {
  const [isResetMode, setIsResetMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        console.log('Checking admin status for user:', user.id);
        const { data: isAdmin, error } = await supabase
          .rpc('check_is_admin', {
            user_id: user.id
          });

        if (error) {
          console.error('Error checking admin status:', error);
          return;
        }

        if (isAdmin) {
          console.log('User is admin, redirecting to dashboard');
          navigate('/admin/dashboard');
        } else {
          console.log('User is not admin');
          navigate('/');
        }
      }
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        console.log('User signed in, checking admin status');
        const { data: isAdmin, error } = await supabase
          .rpc('check_is_admin', {
            user_id: session?.user.id as string
          });

        if (error) {
          console.error('Error checking admin status:', error);
          return;
        }

        if (isAdmin) {
          console.log('User is admin, redirecting to dashboard');
          navigate('/admin/dashboard');
        } else {
          console.log('User is not admin');
          navigate('/');
        }
      }
    });

    return () => {
      if (authListener) authListener.subscription.unsubscribe();
    };
  }, [navigate]);

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
