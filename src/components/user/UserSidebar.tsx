
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
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Update active item when location changes
    const currentPath = location.pathname;
    const matchedItem = sidebarItems.find(item => currentPath.includes(item.path));
    setActiveItem(matchedItem?.path || "");
  }, [location]);

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

  // Animation variants for sidebar items
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  return (
    <>
      {/* Mobile toggle button with animation */}
      <motion.div 
        className="fixed top-4 left-4 z-50 md:hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-background/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-sm"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </motion.div>

      {/* Mobile overlay with improved animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar with enhanced animations and mobile improvements */}
      <motion.aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full bg-background/95 backdrop-blur-sm border-r border-gray-200 dark:border-gray-700 shadow-lg md:shadow-none transition-all duration-300 flex flex-col",
          isOpen
            ? "w-[280px] translate-x-0"
            : "w-[280px] -translate-x-full md:translate-x-0 md:w-20"
        )}
        initial={false}
        animate={{ 
          boxShadow: isOpen ? "0 0 25px rgba(0,0,0,0.15)" : "none",
        }}
      >
        {/* Mobile close button with animation */}
        <div className="flex justify-between items-center p-5 md:hidden">
          <motion.h2 
            className="font-bold text-lg text-gradient"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Menu
          </motion.h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-primary transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col flex-1 py-8 md:py-6 overflow-y-auto scrollbar-none">
          <div className="flex-1 px-3 space-y-1">
            {sidebarItems.map((item, index) => (
              <motion.div
                key={item.path}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 relative group",
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary dark:bg-primary/20"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60"
                  )}
                >
                  {/* Active indicator */}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  
                  <div className={cn(
                    "flex items-center justify-center w-6 transition-transform",
                    location.pathname === item.path ? "text-primary" : ""
                  )}>
                    {item.icon}
                  </div>
                  
                  <motion.span
                    className={cn(
                      "font-medium transition-all",
                      !isOpen && "hidden md:block md:opacity-0 md:group-hover:opacity-100"
                    )}
                    animate={{
                      opacity: isOpen ? 1 : 0,
                      display: isOpen ? "block" : "none",
                      x: isOpen ? 0 : 10,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.name}
                  </motion.span>
                  
                  {!isOpen && (
                    <ChevronRight className="hidden md:block ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="px-3 mt-auto">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                variant="ghost"
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 justify-start rounded-lg",
                  !isOpen && "md:justify-center"
                )}
                onClick={handleSignOut}
              >
                <LogOut className="h-5 w-5" />
                <motion.span
                  className={cn(
                    "font-medium transition-all", 
                    !isOpen && "hidden md:block md:opacity-0 md:group-hover:opacity-100"
                  )}
                  animate={{
                    opacity: isOpen ? 1 : 0,
                    display: isOpen ? "block" : "none",
                  }}
                >
                  Sign Out
                </motion.span>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default UserSidebar;
