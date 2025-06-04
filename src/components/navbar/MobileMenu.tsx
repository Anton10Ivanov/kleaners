
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
  const isAdmin = userRole === 'admin';
  const isProvider = userRole === 'provider';
  const isClient = userRole === 'client' || (!userRole && isOpen);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="w-[320px] sm:w-[350px] overflow-y-auto p-4">
        <SheetHeader className="mb-6 text-left">
          <SheetTitle>
            <Logo />
          </SheetTitle>
          <SheetDescription className="text-left">
            Expert Cleaning Services
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-6">
          <HeaderControls 
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
          />

          {/* Role-based sections */}
          <div className="space-y-6">
            {isClient && <ClientSection />}
            {isProvider && <ProviderSection />}
            {isAdmin && <AdminSection setIsOpen={setIsOpen} />}
            
            {/* Business Solutions - Always visible */}
            <BusinessSolutionsSection />
            
            <NavigationSection navigationData={navigationData} />
            
            {(isClient || isProvider || isAdmin) && <LogoutButton setIsOpen={setIsOpen} />}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
