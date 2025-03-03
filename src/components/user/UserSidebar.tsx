
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Settings, User, CalendarDays, ShieldAlert, FileText, LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase, hasAdminAccess } from "@/integrations/supabase/client";

interface UserSidebarProps {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserSidebar({ isOpen, setIsOpen }: UserSidebarProps) {
  const location = useLocation();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const adminAccess = await hasAdminAccess(user.id);
          setIsAdmin(adminAccess);
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
      }
    };
    
    checkAdminStatus();
    
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const adminAccess = await hasAdminAccess(session.user.id);
        setIsAdmin(adminAccess);
      } else if (event === 'SIGNED_OUT') {
        setIsAdmin(false);
      }
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path || (path !== '/user/bookings' && location.pathname.startsWith(path)) ? 
      "bg-primary text-primary-foreground" : 
      "hover:bg-muted hover:text-foreground";
  };
  
  const handleAdminClick = () => {
    toast({
      title: "Admin Panel",
      description: "Navigating to the admin cockpit",
    });
  };
  
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
      });
      // Redirect happens automatically due to auth state change
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Use the isOpen prop to determine sidebar width
  const sidebarClass = isOpen !== false ? "w-full md:w-64 lg:w-72" : "w-full md:w-20";

  return (
    <aside className={`${sidebarClass} h-auto md:h-screen bg-background border-r md:fixed left-0 top-0 p-4 transition-all duration-300`}>
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="space-y-2 py-4">
            <Link to="/" className="flex items-center justify-center md:justify-start mb-6">
              <img
                src="/lovable-uploads/81a146c8-f4d6-4adf-8dd6-7d590780093e.png"
                alt="Kleaners.de Logo"
                className="h-6 w-6 object-contain"
                style={{ filter: 'brightness(0) saturate(100%) invert(65%) sepia(23%) saturate(1351%) hue-rotate(170deg) brightness(92%) contrast(87%)' }}
              />
              <span className={`${isOpen === false ? "md:hidden" : ""} font-raleway font-bold text-lg text-primary ml-2`}>
                Kleaners.de
              </span>
            </Link>
            
            <div className="border-t border-border pt-4 mb-6">
              <h3 className={`text-xs uppercase text-muted-foreground mb-2 px-4 ${isOpen === false ? "md:hidden" : ""}`}>User Access</h3>
              <nav className="space-y-1">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm bg-amber-100 text-amber-800 dark:bg-amber-800/20 dark:text-amber-500 hover:bg-amber-200 dark:hover:bg-amber-800/30`}
                    onClick={handleAdminClick}
                  >
                    <ShieldAlert className="w-5 h-5" />
                    <span className={isOpen === false ? "md:hidden" : ""}>Cockpit</span>
                  </Link>
                )}
              </nav>
            </div>
            
            <h2 className={`text-xs uppercase text-muted-foreground mb-2 px-4 ${isOpen === false ? "md:hidden" : ""}`}>Services</h2>
            <nav className="space-y-1">
              <Link
                to="/user/bookings"
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm ${isActive('/user/bookings')}`}
              >
                <CalendarDays className="w-5 h-5" />
                <span className={isOpen === false ? "md:hidden" : ""}>My Bookings</span>
              </Link>
              
              <Link
                to="/user/invoices"
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm ${isActive('/user/invoices')}`}
              >
                <FileText className="w-5 h-5" />
                <span className={isOpen === false ? "md:hidden" : ""}>My Invoices</span>
              </Link>
              
              <Link
                to="/user/profile"
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm ${isActive('/user/profile')}`}
              >
                <User className="w-5 h-5" />
                <span className={isOpen === false ? "md:hidden" : ""}>Profile</span>
              </Link>
              
              <Link
                to="/user/settings"
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm ${isActive('/user/settings')}`}
              >
                <Settings className="w-5 h-5" />
                <span className={isOpen === false ? "md:hidden" : ""}>Settings</span>
              </Link>
            </nav>
          </div>
        </div>
        
        <div className="mt-auto pt-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 w-full px-4 py-2 rounded-md text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <LogOut className="w-5 h-5" />
            <span className={isOpen === false ? "md:hidden" : ""}>Log Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
