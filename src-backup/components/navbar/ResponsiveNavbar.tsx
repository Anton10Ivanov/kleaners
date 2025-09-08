import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import { cn } from '@/lib/utils';
import { Menu, X, Phone, Mail, User, LogOut, Settings, Bell } from 'lucide-react';
import UserMenu from './auth/UserMenu';

// Navigation data
const navigationData = {
  main: [
    { name: 'Home', href: '/', current: false },
    { name: 'Services', href: '/services', current: false },
    { name: 'About', href: '/about', current: false },
    { name: 'Contact', href: '/contact', current: false },
  ],
  services: [
    { name: 'Home Cleaning', href: '/services/home-cleaning' },
    { name: 'Deep Cleaning', href: '/services/deep-cleaning' },
    { name: 'Move In/Out', href: '/services/move-in-out' },
    { name: 'Office Cleaning', href: '/services/office-cleaning' },
    { name: 'Post-Construction', href: '/services/post-construction' },
  ],
  user: [
    { name: 'Dashboard', href: '/client/dashboard', icon: User },
    { name: 'Bookings', href: '/client/bookings', icon: Bell },
    { name: 'Profile', href: '/client/profile', icon: Settings },
  ]
};

interface ResponsiveNavbarProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
    role: 'client' | 'provider' | 'admin';
  };
  userProfile?: any;
  userRole?: 'client' | 'provider' | 'admin' | null;
  onLogin?: () => void;
  onLogout?: () => void;
  className?: string;
}

export function ResponsiveNavbar({
  user,
  userProfile,
  userRole,
  onLogin,
  onLogout,
  className
}: ResponsiveNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isMobile, isTablet } = useMobileOptimizations();
  const location = useLocation();
  const navigate = useNavigate();

  // Update navigation current state based on location
  const updateNavigationState = () => {
    navigationData.main.forEach(item => {
      item.current = location.pathname === item.href;
    });
  };

  useEffect(() => {
    updateNavigationState();
  }, [location]);

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mobile menu close
  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  // Handle navigation
  const handleNavigation = (href: string) => {
    navigate(href);
    closeMobileMenu();
  };

  // Render mobile menu
  const renderMobileMenu = () => (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button variant="ghost" size="sm" onClick={closeMobileMenu}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Main Navigation */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Navigation</h3>
              <nav className="space-y-2">
                {navigationData.main.map((item) => (
                  <Button
                    key={item.name}
                    variant={item.current ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => handleNavigation(item.href)}
                  >
                    {item.name}
                  </Button>
                ))}
              </nav>
            </div>

            {/* Services Dropdown */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Services</h3>
              <nav className="space-y-2">
                {navigationData.services.map((service) => (
                  <Button
                    key={service.name}
                    variant="ghost"
                    className="w-full justify-start text-sm"
                    onClick={() => handleNavigation(service.href)}
                  >
                    {service.name}
                  </Button>
                ))}
              </nav>
            </div>

            {/* User Section */}
            {user ? (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Account</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <Badge variant="outline" className="mt-1">
                      {user.role}
                    </Badge>
                  </div>
                  
                  {navigationData.user.map((item) => (
                    <Button
                      key={item.name}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => handleNavigation(item.href)}
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.name}
                    </Button>
                  ))}
                  
                  <Button
                    variant="destructive"
                    className="w-full justify-start"
                    onClick={onLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Button
                  variant="default"
                  className="w-full"
                  onClick={() => handleNavigation('/login')}
                >
                  Login
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleNavigation('/signup')}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Footer */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                <span>info@kleaners.com</span>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  // Render desktop navigation
  const renderDesktopNavigation = () => (
    <NavigationMenu>
      <NavigationMenuList>
        {navigationData.main.map((item) => (
          <NavigationMenuItem key={item.name}>
            <NavigationMenuLink
              asChild
              className={cn(
                'group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50',
                item.current && 'bg-accent text-accent-foreground'
              )}
            >
              <Link to={item.href}>{item.name}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );

  // Render user section
  const renderUserSection = () => {
    if (user) {
      return (
        <UserMenu
          loading={false}
          user={user}
          userProfile={userProfile}
          userRole={user.role}
          setLoading={() => {}}
        />
      );
    }

    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
          Login
        </Button>
        <Button size="sm" onClick={() => navigate('/signup')}>
          Sign Up
        </Button>
      </div>
    );
  };

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
          isScrolled && 'shadow-sm',
          className
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">K</span>
                </div>
                <span className="font-bold text-xl">Kleaners</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            {!isMobile && (
              <div className="hidden md:flex items-center space-x-8">
                {renderDesktopNavigation()}
              </div>
            )}

            {/* User Section */}
            <div className="flex items-center gap-4">
              {renderUserSection()}
              {renderMobileMenu()}
            </div>
          </div>
        </div>
      </header>
      
    </>
  );
}

export default ResponsiveNavbar;
