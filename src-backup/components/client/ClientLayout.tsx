
import { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import ClientSidebar from './ClientSidebar';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Toaster } from '@/components/ui/toaster';
import ClientBottomNav from './ClientBottomNav';

const ClientLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // Store the current URL to redirect back after login
        const returnUrl = window.location.pathname;
        sessionStorage.setItem('authReturnUrl', returnUrl);
        navigate('/login');
      }
    };
    
    checkAuth();
  }, [navigate]);
  
  return (
    <div className="min-h-screen bg-theme-lightblue dark:bg-gray-900 flex">
      {isMobile ? (
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="card-spacing-none">
            <ClientSidebar />
          </SheetContent>
        </Sheet>
      ) : (
        <div className="hidden md:block">
          <ClientSidebar />
        </div>
      )}
      
      <main className="flex-1 overflow-x-hidden pb-16 md:pb-0">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>
      
      {isMobile && <ClientBottomNav />}
      <Toaster />
    </div>
  );
};

export default ClientLayout;
