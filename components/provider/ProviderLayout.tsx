
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useMediaQuery } from '@/hooks/use-media-query';
import { ScrollArea } from '@/components/ui/scroll-area';
import ProviderBottomNav from "./ProviderBottomNav";
import { TopNav } from "./TopNav";
import { UnifiedContainer } from '@/components/layout/UnifiedContainer';
import { supabase } from '@/integrations/supabase/client';

const ProviderLayout = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useRouter();
  
  useEffect(() => {
    document.title = "Provider Dashboard";
    
    // Check if user is authenticated
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
    <div className="flex h-full min-h-screen flex-col bg-theme-lightblue dark:bg-gray-900">
      {/* Top navigation for desktop */}
      <TopNav />
      
      <main className="flex-1 overflow-auto card-spacing-xs md:card-spacing-md">
        <ScrollArea className="h-full">
        <UnifiedContainer size="xl" className="section-spacing-xs">
          <Outlet />
        </UnifiedContainer>
          {/* Add padding at the bottom on mobile to account for the bottom nav */}
          {isMobile && <div className="h-16" />}
        </ScrollArea>
      </main>
      
      {/* Mobile Bottom Navigation */}
      {isMobile && <ProviderBottomNav />}
    </div>
  );
};

export default ProviderLayout;
