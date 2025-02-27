
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import {
  Home,
  Calendar,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface UserSidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserSidebar = ({ isOpen, setIsOpen }: UserSidebarProps) => {
  const location = useLocation();
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: "There was a problem signing you out. Please try again.",
      });
    }
  };

  const sidebarItems = [
    {
      name: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      path: "/user/dashboard",
    },
    {
      name: "My Bookings",
      icon: <Calendar className="h-5 w-5" />,
      path: "/user/bookings",
    },
    {
      name: "My Profile",
      icon: <User className="h-5 w-5" />,
      path: "/user/profile",
    },
    {
      name: "Settings",
      icon: <Settings className="h-5 w-5" />,
      path: "/user/settings",
    },
  ];

  if (!isMounted) return null;

  return (
    <>
      {/* Mobile toggle button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-background border-gray-200 dark:border-gray-700"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full bg-background border-r border-gray-200 dark:border-gray-700 shadow-md md:shadow-none transition-all duration-300 flex flex-col",
          isOpen
            ? "w-64 translate-x-0"
            : "w-64 -translate-x-full md:translate-x-0 md:w-20"
        )}
        initial={false}
      >
        {/* Mobile close button */}
        <div className="flex justify-between items-center p-4 md:hidden">
          <h2 className="font-bold text-lg">Menu</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-gray-500"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col flex-1 py-8 md:py-6">
          <div className="flex-1 px-3 space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                <div className="flex items-center justify-center w-6">
                  {item.icon}
                </div>
                <motion.span
                  className={cn(
                    "transition-opacity",
                    !isOpen && "hidden md:block md:opacity-0 md:group-hover:opacity-100"
                  )}
                  animate={{
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  {item.name}
                </motion.span>
                {!isOpen && (
                  <ChevronRight className="hidden md:block ml-auto h-4 w-4 opacity-0 group-hover:opacity-100" />
                )}
              </Link>
            ))}
          </div>

          <div className="px-3 mt-auto">
            <Button
              variant="ghost"
              className={cn(
                "w-full flex items-center gap-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 justify-start",
                !isOpen && "md:justify-center"
              )}
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5" />
              <span
                className={cn("transition-opacity", !isOpen && "hidden md:block md:opacity-0")}
              >
                Sign Out
              </span>
            </Button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default UserSidebar;
