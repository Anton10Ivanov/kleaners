
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
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          navigate('/login');
          return;
        }

        const { data: adminRole, error } = await supabase
          .from('admin_roles')
          .select('role')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error checking admin status:', error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to verify admin access. Please try again.",
          });
          navigate('/');
          return;
        }

        if (!adminRole) {
          toast({
            variant: "destructive",
            title: "Access Denied",
            description: "You don't have permission to access this area.",
          });
          navigate('/');
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error in admin check:', error);
        navigate('/login');
      }
    };

    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate('/login');
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
