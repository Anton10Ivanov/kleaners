
import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import UserSidebar from './UserSidebar';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import { useAuth } from '@/hooks/useAuth';

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading } = useAuth();
  
  // Handle navigation based on current location path
  useEffect(() => {
    // If at the user/ root path, redirect to dashboard
    if (location.pathname === '/user' || location.pathname === '/user/') {
      navigate('/user/dashboard');
    }
  }, [location.pathname, navigate]);
  
  // For development, we're not enforcing authentication
  // In production, you would uncomment this code
  /*
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth/login');
    }
  }, [user, isLoading, navigate]);
  
  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>;
  }
  */
  
  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar */}
      {isMobile ? (
        <>
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetContent side="left" className="p-0">
              <UserSidebar />
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
          <UserSidebar />
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

export default UserLayout;
