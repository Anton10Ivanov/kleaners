
import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import UserSidebar from "./UserSidebar";
import { Loader2 } from "lucide-react";
import type { User } from "@/types/supabase";
import { motion } from "framer-motion";

const UserLayout = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    
    getUser();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <UserSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`flex-1 p-4 md:p-6 overflow-y-auto pt-20 md:pt-6 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'} transition-all duration-300`}
      >
        <Outlet context={{ user }} />
      </motion.main>
    </div>
  );
};

export default UserLayout;
