
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarClock, Home, Settings, User, Briefcase, Clock } from "lucide-react";

const ProviderSidebar = () => {
  const { pathname } = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const routes = [
    {
      label: "Dashboard",
      icon: <Home className="h-5 w-5 mr-2" />,
      href: "/provider/dashboard",
      active: pathname === "/provider/dashboard",
    },
    {
      label: "Bookings",
      icon: <Briefcase className="h-5 w-5 mr-2" />,
      href: "/provider/bookings",
      active: pathname === "/provider/bookings",
    },
    {
      label: "Availability",
      icon: <CalendarClock className="h-5 w-5 mr-2" />,
      href: "/provider/availability",
      active: pathname === "/provider/availability",
    },
    {
      label: "Profile",
      icon: <User className="h-5 w-5 mr-2" />,
      href: "/provider/profile",
      active: pathname === "/provider/profile",
    },
    {
      label: "Settings",
      icon: <Settings className="h-5 w-5 mr-2" />,
      href: "/provider/settings",
      active: pathname === "/provider/settings",
    },
  ];

  return (
    <div className={cn(
      "bg-white dark:bg-gray-800 h-full shadow-sm flex flex-col",
      isMobile ? "w-16 py-4" : "w-64 py-6 px-4"
    )}>
      <div className="flex items-center mb-8 px-4">
        {!isMobile && (
          <h1 className="text-xl font-bold">Provider Portal</h1>
        )}
        {isMobile && (
          <Clock className="h-6 w-6 mx-auto" />
        )}
      </div>
      <ScrollArea className="flex-1 pt-4">
        <div className="flex flex-col gap-2 px-2">
          {routes.map((route) => (
            <Link 
              key={route.href} 
              to={route.href}
              className="no-underline"
            >
              <Button
                variant={route.active ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isMobile && "justify-center px-2"
                )}
                size={isMobile ? "icon" : "default"}
              >
                {route.icon}
                {!isMobile && <span>{route.label}</span>}
              </Button>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProviderSidebar;
