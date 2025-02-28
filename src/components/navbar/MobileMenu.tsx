
import React from 'react';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from './Logo';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';
import { AuthButtons } from './AuthButtons';
import { useState, useEffect } from 'react';
import { supabase, hasAdminAccess } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

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
    href: "/contact"
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

interface LanguageSelectorProps {
  currentLanguage: 'en' | 'de';
  onLanguageChange: () => void;
}

interface MobileMenuProps {
  isOpen?: boolean;
  isMobileServicesOpen?: boolean;
  setIsMobileServicesOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  currentLanguage?: 'en' | 'de';
  onLanguageChange?: () => void;
  isAdmin?: boolean;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen: externalIsOpen,
  isMobileServicesOpen,
  setIsMobileServicesOpen,
  currentLanguage = 'en',
  onLanguageChange = () => {},
  isAdmin = false
}) => {
  const [isOpen, setIsOpen] = useState(externalIsOpen || false);
  const [adminStatus, setAdminStatus] = useState(isAdmin);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        setIsLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const adminStatus = await hasAdminAccess(user.id);
          console.log("Mobile menu - Admin status:", adminStatus);
          setAdminStatus(adminStatus);
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAdminStatus();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [isAdmin]);

  const handleAdminClick = () => {
    setIsOpen(false);
    navigate('/admin');
    toast({
      title: "Admin Panel",
      description: "Navigating to the admin panel",
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-left">
            <Logo />
          </SheetTitle>
          <SheetDescription className="text-left">
            Expert Cleaning Services
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex gap-2">
              <ThemeToggle />
              <LanguageSelector currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} />
            </div>
            <AuthButtons />
          </div>

          <div className="space-y-2">
            {navigationData.map((item, index) => (
              item.children ? (
                <Accordion type="single" collapsible key={index}>
                  <AccordionItem value={item.title}>
                    <AccordionTrigger className="py-2">{item.title}</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col space-y-1 pl-2">
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
                    className="block py-2 px-3 rounded-md hover:bg-accent"
                  >
                    {item.title}
                  </Link>
                </SheetClose>
              )
            ))}
            
            {adminStatus && !isLoading && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-muted-foreground mb-2 px-2">Admin Access</h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAdminClick}
                    className="w-full flex items-center justify-start py-2 px-3 rounded-md text-primary border-primary hover:bg-primary/10"
                  >
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Admin Panel
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
            )}
            
            {isLoading && adminStatus === undefined && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

