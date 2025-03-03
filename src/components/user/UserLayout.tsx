
import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import UserSidebar from "./UserSidebar";
import { Loader2, Menu } from "lucide-react";
import type { User } from "@/types/supabase";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";

const UserLayout = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

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
      {/* Mobile menu toggle button */}
      {isMobile && (
        <div className="fixed top-4 left-4 z-50">
          <Button 
            variant="outline" 
            size="icon" 
            className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-md"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      )}
      
      {/* Sidebar - modal on mobile, fixed on desktop */}
      <div className={`${isMobile ? 'fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out' : ''} ${isMobile && !sidebarOpen ? '-translate-x-full' : ''}`}>
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <UserSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>
      
      {/* Main content - full width on mobile */}
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`flex-1 p-4 md:p-6 overflow-y-auto ${isMobile ? 'pt-20' : 'pt-6'} ${!isMobile && (sidebarOpen ? 'md:ml-64' : 'md:ml-20')} transition-all duration-300`}
      >
        <Outlet context={{ user }} />
      </motion.main>
    </div>
  );
};

export default UserLayout;
