
import React from 'react';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ShieldCheck, CalendarDays, LogOut, User, MessageSquare, UserCog, LayoutDashboard, Settings, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from './Logo';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const navigationData = [
  {
    title: "Services",
    href: "/services",
    children: [
      { title: "Regular Cleaning", href: "/services/regular-cleaning" },
      { title: "Business Cleaning", href: "/services/business-cleaning" },
      { title: "Move In/Out", href: "/services/move-in-out" },
      { title: "Post Construction Cleaning", href: "/services/post-construction-cleaning" }
    ]
  },
  {
    title: "About",
    href: "/about",
    children: [
      { title: "Company Values", href: "/about/values" },
      { title: "FAQ", href: "/about/faq" }
    ]
  },
  {
    title: "Contact",
    href: "/contact",
    children: [
      { title: "Get in Touch", href: "/contact" },
      { title: "Join Our Team", href: "/join-team" }
    ]
  },
  {
    title: "Legal",
    href: "/legal",
    children: [
      { title: "Terms of Service", href: "/legal/terms" },
      { title: "Privacy Policy", href: "/legal/privacy" }
    ]
  }
];

interface MobileMenuProps {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileServicesOpen?: boolean;
  setIsMobileServicesOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  currentLanguage?: 'en' | 'de';
  onLanguageChange?: () => void;
  isAdmin?: boolean;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen = false,
  setIsOpen = () => {},
  isMobileServicesOpen,
  setIsMobileServicesOpen,
  currentLanguage = 'en',
  onLanguageChange = () => {},
  isAdmin = false
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAdminClick = () => {
    setIsOpen(false);
    navigate('/admin');
    toast({
      title: "Admin Panel",
      description: "Navigating to the admin panel",
    });
  };

  const handleBookingsClick = () => {
    setIsOpen(false);
    navigate('/user/bookings');
    toast({
      title: "My Bookings",
      description: "Navigating to your bookings",
    });
  };
  
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsOpen(false);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
      });
      // Redirect happens via auth state change
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="w-[300px] sm:w-[350px] overflow-y-auto p-4">
        <SheetHeader className="mb-4 text-left">
          <SheetTitle>
            <Logo />
          </SheetTitle>
          <SheetDescription className="text-left">
            Expert Cleaning Services
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center mb-2">
            <ThemeToggle />
            <LanguageSelector 
              currentLanguage={currentLanguage}
              onLanguageChange={onLanguageChange}
            />
          </div>

          {/* Role-based sections with improved UI */}
          <div className="space-y-6">
            {/* Client Section */}
            <div className="rounded-lg border border-border p-4 bg-card shadow-sm">
              <h3 className="text-sm font-semibold text-primary mb-3 flex items-center">
                <User className="mr-2 h-4 w-4" />
                Client Access
              </h3>
              <div className="space-y-2 pl-2">
                <SheetClose asChild>
                  <Link to="/user/bookings" className="flex items-center py-2 px-2 text-sm rounded-md hover:bg-accent transition-colors">
                    <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>My Bookings</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/user/messages" className="flex items-center py-2 px-2 text-sm rounded-md hover:bg-accent transition-colors">
                    <MessageSquare className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Messages</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/user/profile" className="flex items-center py-2 px-2 text-sm rounded-md hover:bg-accent transition-colors">
                    <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Profile Settings</span>
                  </Link>
                </SheetClose>
              </div>
            </div>
            
            {/* Provider Section */}
            <div className="rounded-lg border border-border p-4 bg-card shadow-sm">
              <h3 className="text-sm font-semibold text-primary mb-3 flex items-center">
                <UserCog className="mr-2 h-4 w-4" />
                Provider Access
              </h3>
              <div className="space-y-2 pl-2">
                <SheetClose asChild>
                  <Link to="/provider/dashboard" className="flex items-center py-2 px-2 text-sm rounded-md hover:bg-accent transition-colors">
                    <LayoutDashboard className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Provider Dashboard</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/provider/bookings" className="flex items-center py-2 px-2 text-sm rounded-md hover:bg-accent transition-colors">
                    <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Assignments</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/provider/profile" className="flex items-center py-2 px-2 text-sm rounded-md hover:bg-accent transition-colors">
                    <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Provider Profile</span>
                  </Link>
                </SheetClose>
              </div>
            </div>
            
            {/* Admin Section */}
            <div className="rounded-lg border border-border p-4 bg-primary/5 shadow-sm">
              <h3 className="text-sm font-semibold text-primary mb-3 flex items-center">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Admin Access
              </h3>
              <div className="space-y-2 pl-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleAdminClick}
                  className="w-full flex items-center justify-start py-2 px-3 rounded-md bg-primary/10 hover:bg-primary/20 border-none"
                >
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  <span className="text-sm">Admin Dashboard</span>
                </Button>
                
                <div className="space-y-1 mt-2 pl-1">
                  <SheetClose asChild>
                    <Link
                      to="/admin/bookings"
                      className="flex items-center py-2 px-2 text-sm rounded-md hover:bg-accent transition-colors"
                    >
                      <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Manage Bookings</span>
                    </Link>
                  </SheetClose>
                  
                  <SheetClose asChild>
                    <Link
                      to="/admin/clients"
                      className="flex items-center py-2 px-2 text-sm rounded-md hover:bg-accent transition-colors"
                    >
                      <User className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Manage Clients</span>
                    </Link>
                  </SheetClose>
                  
                  <SheetClose asChild>
                    <Link
                      to="/admin/providers"
                      className="flex items-center py-2 px-2 text-sm rounded-md hover:bg-accent transition-colors"
                    >
                      <UserCog className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Manage Providers</span>
                    </Link>
                  </SheetClose>
                </div>
              </div>
            </div>
            
            {/* Main Navigation */}
            <div className="rounded-lg border border-border p-4 bg-card shadow-sm">
              <h3 className="text-sm font-semibold text-primary mb-3 flex items-center">
                <Home className="mr-2 h-4 w-4" />
                Main Navigation
              </h3>
              <div className="space-y-1">
                {navigationData.map((item, index) => (
                  item.children ? (
                    <Accordion type="single" collapsible key={index} className="border-none">
                      <AccordionItem value={item.title} className="border-b-0">
                        <AccordionTrigger className="py-2 px-1 hover:no-underline text-sm">
                          {item.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col space-y-1 pl-2">
                            {item.children.map((child, childIndex) => (
                              <SheetClose asChild key={childIndex}>
                                <Link
                                  to={child.href}
                                  className="py-2 px-3 text-sm rounded-md hover:bg-accent transition-colors"
                                >
                                  {child.title}
                                </Link>
                              </SheetClose>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <SheetClose asChild key={index}>
                      <Link
                        to={item.href}
                        className="block py-2 px-3 rounded-md hover:bg-accent text-sm transition-colors"
                      >
                        {item.title}
                      </Link>
                    </SheetClose>
                  )
                ))}
              </div>
            </div>
            
            {/* Logout Button */}
            <div className="mt-4">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleLogout}
                className="w-full flex items-center justify-center py-2"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log Out</span>
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
