
import { Link, useLocation } from "react-router-dom";
import { Home, Calendar, MessageSquare, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";

export const ProviderBottomNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      name: "Dashboard",
      icon: Home,
      path: "/provider/dashboard",
    },
    {
      name: "Bookings",
      icon: Calendar,
      path: "/provider/bookings",
    },
    {
      name: "Messages",
      icon: MessageSquare,
      path: "/provider/messages",
    },
    {
      name: "Profile",
      icon: User,
      path: "/provider/profile",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/provider/settings",
    },
  ];

  const isActive = (path: string) => {
    return currentPath === path || 
      (path !== '/provider/dashboard' && currentPath.startsWith(path));
  };

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700 md:hidden">
      <div className="grid h-full grid-cols-5">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center",
              isActive(item.path)
                ? "text-primary"
                : "text-gray-500 hover:text-primary"
            )}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};
