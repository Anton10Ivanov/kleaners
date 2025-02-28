
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Settings, User, CalendarDays, ShieldAlert } from "lucide-react";
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
    return location.pathname === path ? 
      "bg-primary text-primary-foreground" : 
      "hover:bg-muted hover:text-foreground";
  };
  
  const handleAdminClick = () => {
    toast({
      title: "Admin Panel",
      description: "Navigating to the admin cockpit",
    });
  };

  // Use the isOpen prop to determine sidebar width
  const sidebarClass = isOpen !== false ? "w-full md:w-64 lg:w-72" : "w-full md:w-20";

  return (
    <aside className={`${sidebarClass} h-auto md:h-screen bg-background border-r md:fixed left-0 top-0 p-4 transition-all duration-300`}>
      <div className="space-y-2 py-4">
        <h2 className="text-lg font-semibold px-4 py-2">User Dashboard</h2>
        <nav className="space-y-1">
          <Link
            to="/user/dashboard"
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm ${isActive('/user/dashboard')}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className={isOpen === false ? "md:hidden" : ""}>Dashboard</span>
          </Link>
          
          <Link
            to="/user/bookings"
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm ${isActive('/user/bookings')}`}
          >
            <CalendarDays className="w-5 h-5" />
            <span className={isOpen === false ? "md:hidden" : ""}>My Bookings</span>
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
    </aside>
  );
}
