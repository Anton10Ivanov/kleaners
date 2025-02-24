
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { user }, error: sessionError } = await supabase.auth.getUser();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          throw sessionError;
        }

        if (!user) {
          console.log('No user session found - redirecting to login');
          navigate('/login');
          return;
        }

        console.log('Checking admin role for user:', user.id);
        const { data: isAdmin, error: adminCheckError } = await supabase
          .rpc('check_is_admin', {
            user_id: user.id
          });

        if (adminCheckError) {
          console.error('Error checking admin status:', adminCheckError);
          throw adminCheckError;
        }

        if (!isAdmin) {
          console.log('Not an admin user');
          toast({
            variant: "destructive",
            title: "Access Denied",
            description: "You don't have permission to access this area.",
          });
          navigate('/login');
          return;
        }

        console.log('Admin access verified');
        setIsLoading(false);
      } catch (error) {
        console.error('Error in admin check:', error);
        navigate('/login');
      }
    };

    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event);
      if (event === 'SIGNED_OUT' || !session) {
        navigate('/login');
      } else {
        checkAdminStatus();
      }
    });

    checkAdminStatus();

    return () => {
      authListener.data.subscription.unsubscribe();
    };
  }, [navigate, toast]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Verifying access...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
