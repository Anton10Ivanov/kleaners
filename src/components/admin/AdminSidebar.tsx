
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Settings, 
  ChevronRight, 
  ChevronLeft,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CleaningIcon } from "@/components/icons/CleaningIcon";

export const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-3 left-4 md:hidden z-50"
        onClick={toggleMobileSidebar}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-white dark:bg-gray-950 border-r dark:border-gray-800 h-screen flex flex-col transition-all duration-300 fixed md:relative z-50",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="p-4 border-b dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <CleaningIcon className="h-6 w-6 text-primary flex-shrink-0" />
            {!collapsed && <span className="font-bold">Cleaning BMS</span>}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={toggleSidebar}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <nav className="p-2 flex-1 overflow-y-auto">
          <div className="space-y-1">
            <NavLink to="/admin/dashboard"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-gray-100 dark:hover:bg-gray-900",
                  collapsed && "justify-center px-0"
                )
              }
            >
              <LayoutDashboard className="h-5 w-5" />
              {!collapsed && <span>Dashboard</span>}
            </NavLink>
            <NavLink to="/admin/bookings"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-gray-100 dark:hover:bg-gray-900",
                  collapsed && "justify-center px-0"
                )
              }
            >
              <Calendar className="h-5 w-5" />
              {!collapsed && <span>Bookings</span>}
            </NavLink>
            <NavLink to="/admin/providers"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-gray-100 dark:hover:bg-gray-900",
                  collapsed && "justify-center px-0"
                )
              }
            >
              <Users className="h-5 w-5" />
              {!collapsed && <span>Providers</span>}
            </NavLink>
          </div>
        </nav>

        <div className="p-4 border-t dark:border-gray-800 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex items-center gap-2 w-full",
              collapsed && "justify-center"
            )}
          >
            <Settings className="h-4 w-4" />
            {!collapsed && <span>Settings</span>}
          </Button>
        </div>
      </aside>
    </>
  );
};
