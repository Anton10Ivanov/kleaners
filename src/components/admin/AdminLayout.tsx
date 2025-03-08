
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  UserCog,
  Settings,
  LogOut,
  Menu,
  X,
  MessageSquareText,
  BarChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Separator } from '@/components/ui/separator';
import { handleApiError } from '@/utils/errorHandling';
import { boolToString } from '@/utils/typeUtils';
import { ErrorSeverity } from '@/schemas/booking';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

// Navigation item type
type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
  active?: boolean;
};

const AdminLayout = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Create nav items array
  const navItems: NavItem[] = [
    {
      title: 'Dashboard',
      href: '/admin',
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: 'Analytics',
      href: '/admin/dashboard',
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      title: 'Bookings',
      href: '/admin/bookings',
      icon: <CalendarDays className="h-5 w-5" />,
    },
    {
      title: 'Customers',
      href: '/admin/customers',
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: 'Providers',
      href: '/admin/providers',
      icon: <UserCog className="h-5 w-5" />,
    },
    {
      title: 'Questions',
      href: '/admin?tab=questions',
      icon: <MessageSquareText className="h-5 w-5" />,
    },
    {
      title: 'Settings',
      href: '/admin/settings',
      icon: <Settings className="h-5 w-5" />,
    },
  ];
  
  // Set active nav item based on current location
  useEffect(() => {
    try {
      const path = location.pathname.split('/')[2] || '';
      
      // Handle the special case for the questions tab
      if (location.pathname === '/admin' && location.search.includes('tab=questions')) {
        setActiveItem('questions');
        return;
      }
      
      if (path) {
        setActiveItem(path);
      } else {
        setActiveItem('dashboard');
      }
    } catch (error) {
      handleApiError(
        error, 
        "Navigation error occurred", 
        boolToString(true), 
        ErrorSeverity.HIGH
      );
    }
  }, [location]);
  
  // Handle navigation click
  const handleNavClick = (href: string) => {
    try {
      navigate(href);
      if (isMobile) {
        setIsSidebarOpen(false);
      }
    } catch (error) {
      handleApiError(
        error, 
        "Navigation failed", 
        boolToString(true), 
        ErrorSeverity.HIGH
      );
    }
  };
  
  // Handle logout
  const handleLogout = () => {
    try {
      navigate('/auth/login');
    } catch (error) {
      handleApiError(
        error, 
        "Logout failed", 
        boolToString(true), 
        ErrorSeverity.MEDIUM
      );
    }
  };
  
  // Render sidebar content
  const renderSidebarContent = () => (
    <div className="flex h-full flex-col bg-background">
      <div className="px-3 py-4">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Admin Dashboard
        </h2>
        <div className="space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.title}
              variant={activeItem === item.title.toLowerCase() ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => handleNavClick(item.href)}
            >
              {item.icon}
              <span className="ml-2">{item.title}</span>
            </Button>
          ))}
        </div>
      </div>
      <div className="mt-auto px-3 py-4">
        <Separator className="mb-4" />
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:bg-red-500/10 hover:text-red-500"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span className="ml-2">Logout</span>
        </Button>
      </div>
    </div>
  );
  
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="hidden w-64 border-r bg-background md:block">
          {renderSidebarContent()}
        </div>
      )}
      
      {/* Mobile Sidebar */}
      {isMobile && (
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-4 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            {renderSidebarContent()}
          </SheetContent>
        </Sheet>
      )}
      
      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Main content header */}
        <header className="border-b bg-background p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">
              {navItems.find(item => item.title.toLowerCase() === activeItem)?.title || 'Dashboard'}
            </h1>
          </div>
        </header>
        
        {/* Main content area with scrolling */}
        <main className="flex-1 overflow-auto bg-muted/40">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
