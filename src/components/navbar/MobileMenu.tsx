
import React from 'react';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Logo } from './Logo';
import { 
  ClientSection, 
  ProviderSection, 
  AdminSection, 
  NavigationSection, 
  LogoutButton,
  HeaderControls,
  BusinessSolutionsSection
} from './mobile';
import { cn } from '@/lib/utils';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';

const navigationData = [
  {
    title: "Services",
    href: "/services",
    children: [
      { title: "Regular Cleaning", href: "/services/regular-cleaning" },
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
  isProvider?: boolean;
  isClient?: boolean;
  userRole?: 'admin' | 'provider' | 'client' | null;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen = false,
  setIsOpen = () => {},
  isMobileServicesOpen,
  setIsMobileServicesOpen,
  currentLanguage = 'en',
  onLanguageChange = () => {},
  userRole = null
}) => {
  const { isMobile, getMobileSpacing } = useMobileOptimizations();
  const isAdmin = userRole === 'admin';
  const isProvider = userRole === 'provider';
  const isClient = userRole === 'client' || (!userRole && isOpen);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent 
        side="right" 
        className={cn(
          "overflow-y-auto safe-area-right",
          isMobile ? "w-[320px] p-4" : "w-[350px] p-4"
        )}
      >
        <SheetHeader className={cn(
          "mb-6 text-left",
          getMobileSpacing('md')
        )}>
          <SheetTitle className="text-foreground">
            <Logo />
          </SheetTitle>
          <SheetDescription className="text-left text-muted-foreground">
            Expert Cleaning Services
          </SheetDescription>
        </SheetHeader>

        <div className="mobile-stack space-y-6">
          <HeaderControls 
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
          />

          {/* Role-based sections with design token spacing */}
          <div className="mobile-stack space-y-6">
            {isClient && (
              <div className="mobile-section">
                <ClientSection />
              </div>
            )}
            
            {isProvider && (
              <div className="mobile-section">
                <ProviderSection />
              </div>
            )}
            
            {isAdmin && (
              <div className="mobile-section">
                <AdminSection setIsOpen={setIsOpen} />
              </div>
            )}
            
            {/* Business Solutions - Always visible with design tokens */}
            <div className="mobile-section">
              <BusinessSolutionsSection />
            </div>
            
            <div className="mobile-section">
              <NavigationSection navigationData={navigationData} />
            </div>
            
            {(isClient || isProvider || isAdmin) && (
              <div className="mobile-section border-t border-border pt-4">
                <LogoutButton setIsOpen={setIsOpen} />
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
