
import { NotificationCenter } from '@/components/notifications/NotificationCenter';
import { NavigationMenu as Nav } from "@/components/ui/navigation-menu";
import { navigationLinks } from "./navigationData";
import { AuthButtons } from "./AuthButtons";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSelector } from "./LanguageSelector";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ShoppingCart } from "lucide-react";

export function NavigationMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const location = useLocation();

  // Check if the user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setIsLoggedIn(!!data.session);

        // Fetch user data including user_type if logged in
        if (data.session) {
          const user = await supabase.auth.getUser();
          const { data: profileData } = await supabase
            .from('profiles')
            .select('user_type')
            .eq('id', user.data.user?.id)
            .single();

          if (profileData) {
            setUserType(profileData.user_type);
          }
        }
      } catch (error) {
        console.error("Auth error:", error);
      }
    };

    checkAuth();
  }, [location.pathname]);

  const renderDashboardButton = () => {
    if (!isLoggedIn) return null;

    // Determine dashboard URL based on user type
    let dashboardUrl = '/user/dashboard'; // Default for clients
    if (userType === 'provider') {
      dashboardUrl = '/provider/dashboard';
    } else if (userType === 'admin') {
      dashboardUrl = '/admin';
    }

    return (
      <Link to={dashboardUrl}>
        <Button variant="outline" size="sm">
          Dashboard
        </Button>
      </Link>
    );
  };

  const showUtilityItems = !location.pathname.includes('/admin') && 
                          !location.pathname.includes('/user') &&
                          !location.pathname.includes('/provider');

  return (
    <Nav className="flex items-center space-x-2">
      {showUtilityItems && (
        <>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </Button>
          
          {isLoggedIn && <NotificationCenter />}
          
          <ThemeToggle />
          
          <LanguageSelector />
        </>
      )}
      
      {renderDashboardButton()}
      
      <AuthButtons isLoggedIn={isLoggedIn} userType={userType} />
    </Nav>
  );
}
