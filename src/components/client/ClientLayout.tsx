
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import ClientSidebar from './ClientSidebar';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

const ClientLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth/login');
      }
    };
    
    checkAuth();
  }, [navigate]);
  
  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar */}
      {isMobile ? (
        <>
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetContent side="left" className="p-0">
              <ClientSidebar />
            </SheetContent>
          </Sheet>
          
          <Button
            variant="ghost"
            size="icon"
            className="fixed left-4 top-4 z-50"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </>
      ) : (
        <div className="hidden md:block">
          <ClientSidebar />
        </div>
      )}
      
      <main className="flex-1 overflow-x-hidden">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>
      
      <Toaster />
    </div>
  );
};

export default ClientLayout;
