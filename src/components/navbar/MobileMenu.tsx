
import React from 'react';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from './Logo';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';
import { AuthButtons } from './AuthButtons';
import { useState, useEffect } from 'react';
import { supabase, hasAdminAccess } from '@/integrations/supabase/client';
import { serviceLinks, navigationData } from './navigationData';

// Updated to include all required props
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

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const adminStatus = await hasAdminAccess(user.id);
          setAdminStatus(adminStatus);
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
      }
    };

    checkAdminStatus();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAdminStatus();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
            
            {/* Admin Dashboard Link - Only visible to admins */}
            {adminStatus && (
              <SheetClose asChild>
                <Link
                  to="/admin/dashboard"
                  className="flex items-center py-2 px-3 rounded-md hover:bg-accent text-primary"
                >
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Admin Dashboard
                </Link>
              </SheetClose>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
