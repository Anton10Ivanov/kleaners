
import React from 'react';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ShieldCheck, CalendarDays, LogOut } from 'lucide-react';
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
        <SheetHeader className="mb-6 text-left">
          <SheetTitle>
            <Logo />
          </SheetTitle>
          <SheetDescription className="text-left">
            Expert Cleaning Services
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <ThemeToggle />
            </div>
          </div>

          <div className="space-y-3">
            {/* User & Admin Access Sections at the top */}
            <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-muted-foreground mb-2 px-1">User Access</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBookingsClick}
                  className="w-full flex items-center justify-start py-2 px-3 rounded-md text-primary border-primary hover:bg-primary/10"
                >
                  <CalendarDays className="mr-2 h-4 w-4" />
                  <span className="text-base">My Bookings</span>
                </Button>
              </div>
            </div>
            
            <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-muted-foreground mb-2 px-1">Admin Access</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAdminClick}
                  className="w-full flex items-center justify-start py-2 px-3 rounded-md text-primary border-primary hover:bg-primary/10"
                >
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  <span className="text-base">Admin Panel</span>
                </Button>
                
                <SheetClose asChild>
                  <Link
                    to="/admin/dashboard"
                    className="block w-full text-left py-2 px-3 text-sm rounded-md hover:bg-accent"
                  >
                    Dashboard
                  </Link>
                </SheetClose>
                
                <SheetClose asChild>
                  <Link
                    to="/admin/bookings"
                    className="block w-full text-left py-2 px-3 text-sm rounded-md hover:bg-accent"
                  >
                    Bookings
                  </Link>
                </SheetClose>
                
                <SheetClose asChild>
                  <Link
                    to="/admin/customers"
                    className="block w-full text-left py-2 px-3 text-sm rounded-md hover:bg-accent"
                  >
                    Customers
                  </Link>
                </SheetClose>
              </div>
            </div>
            
            {/* Navigation Items */}
            {navigationData.map((item, index) => (
              item.children ? (
                <Accordion type="single" collapsible key={index}>
                  <AccordionItem value={item.title} className="border-b-0">
                    <AccordionTrigger className="py-2 px-1 hover:no-underline font-medium text-base">
                      <span>{item.title}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col space-y-2 pl-2">
                        {item.children.map((child, childIndex) => (
                          <SheetClose asChild key={childIndex}>
                            <Link
                              to={child.href}
                              className="py-2 px-3 text-sm rounded-md hover:bg-accent"
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
                    className="block py-2 px-3 rounded-md hover:bg-accent text-base font-medium"
                  >
                    {item.title}
                  </Link>
                </SheetClose>
              )
            ))}
            
            {/* Logout Button */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="w-full flex items-center justify-start py-2 px-3 rounded-md text-red-500 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span className="text-base">Log Out</span>
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
