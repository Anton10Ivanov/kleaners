
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/login');
        return;
      }

      const { data: adminRole } = await supabase
        .from('admin_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (!adminRole) {
        navigate('/');
      }
    };

    checkAdminStatus();
  }, [navigate]);

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
