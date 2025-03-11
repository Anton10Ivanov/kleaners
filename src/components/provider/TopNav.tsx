
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, Briefcase, Clock, MessageSquare, User, Settings } from "lucide-react";

const routes = [
  {
    label: "Dashboard",
    icon: <Home className="h-4 w-4" />,
    href: "/provider/dashboard",
  },
  {
    label: "Bookings",
    icon: <Briefcase className="h-4 w-4" />,
    href: "/provider/bookings",
  },
  {
    label: "Availability",
    icon: <Clock className="h-4 w-4" />,
    href: "/provider/availability",
  },
  {
    label: "Messages",
    icon: <MessageSquare className="h-4 w-4" />,
    href: "/provider/messages",
  },
  {
    label: "Profile",
    icon: <User className="h-4 w-4" />,
    href: "/provider/profile",
  },
  {
    label: "Settings",
    icon: <Settings className="h-4 w-4" />,
    href: "/provider/settings",
  },
];

export const TopNav = () => {
  const { pathname } = useLocation();

  const isActive = (path: string) => {
    if (path === '/provider/dashboard') {
      return pathname === path || pathname === '/provider';
    }
    return pathname === path;
  };

  return (
    <div className="hidden md:block w-full border-b bg-background">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link to="/provider" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Provider Portal</span>
          </Link>
          <nav className="flex items-center space-x-2">
            {routes.map((route) => (
              <Link key={route.href} to={route.href}>
                <Button
                  variant={isActive(route.href) ? "default" : "ghost"}
                  className="h-8"
                  size="sm"
                >
                  {route.icon}
                  <span className="ml-2">{route.label}</span>
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
