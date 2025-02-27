
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Calendar, 
  UserCircle, 
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const UserSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account."
    });
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { 
      name: "Dashboard", 
      path: "/user/dashboard", 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      name: "My Bookings", 
      path: "/user/bookings", 
      icon: <Calendar className="h-5 w-5" /> 
    },
    { 
      name: "Profile", 
      path: "/user/profile", 
      icon: <UserCircle className="h-5 w-5" /> 
    },
    { 
      name: "Settings", 
      path: "/user/settings", 
      icon: <Settings className="h-5 w-5" /> 
    }
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button 
        onClick={toggleSidebar} 
        className="fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-md shadow md:hidden"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 
        w-64 bg-white dark:bg-gray-800 shadow-md transform 
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6">
          <h2 className="text-xl font-bold text-primary">My Account</h2>
        </div>

        <nav className="mt-6">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink 
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center px-6 py-3 text-gray-700 dark:text-gray-200
                    ${isActive ? 'bg-primary/10 text-primary border-r-4 border-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full p-4">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
};

export default UserSidebar;
