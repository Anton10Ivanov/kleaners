
import React from 'react';
import { Logo } from './Logo';
import { 
  ClientSection, 
  ProviderSection, 
  AdminSection, 
  NavigationSection, 
  LogoutButton,
  HeaderControls,
  BusinessSolutionsSection,
  EnhancedMobileMenu,
  TouchOptimizedMenuItem,
  AccessibleNavigation,
  SkipLink,
  KeyboardNavigation
} from './mobile';
import { useNavigation } from './context/NavigationContext';

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
  currentLanguage = 'en',
  onLanguageChange = () => {},
  userRole = null
}) => {
  const { actions } = useNavigation();
  const isAdmin = userRole === 'admin';
  const isProvider = userRole === 'provider';
  const isClient = userRole === 'client' || (!userRole);

  const handleKeyboardNavigation = {
    onEscape: () => actions.closeAllMenus(),
  };

  return (
    <>
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      
      <EnhancedMobileMenu
        title="Navigation Menu"
        description="Expert Cleaning Services"
      >
        <KeyboardNavigation {...handleKeyboardNavigation}>
          <AccessibleNavigation ariaLabel="Main navigation menu">
            <div className="mobile-stack space-y-6">
              <HeaderControls 
                currentLanguage={currentLanguage}
                onLanguageChange={onLanguageChange}
              />

              {/* Role-based sections with enhanced touch optimization */}
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
                    <AdminSection setIsOpen={actions.setIsMenuOpen} />
                  </div>
                )}
                
                {/* Business Solutions - Always visible with enhanced touch controls */}
                <div className="mobile-section">
                  <BusinessSolutionsSection />
                </div>
                
                <div className="mobile-section">
                  <NavigationSection navigationData={navigationData} />
                </div>
                
                {(isClient || isProvider || isAdmin) && (
                  <div className="mobile-section border-t border-border pt-4">
                    <LogoutButton setIsOpen={actions.setIsMenuOpen} />
                  </div>
                )}
              </div>
            </div>
          </AccessibleNavigation>
        </KeyboardNavigation>
      </EnhancedMobileMenu>
    </>
  );
};
