
import { memo } from 'react';
import { useNavbarLogic } from './core/NavbarLogic';
import { useNavbarHandlers } from './core/NavbarHandlers';
import { DesktopNavigation } from './desktop/DesktopNavigation';
import { DesktopControls } from './desktop/DesktopControls';
import { MobileControls } from './mobile/MobileControls';
import { NavigationProvider } from './context/NavigationContext';
import { useNavigationEffects } from './hooks/useNavigationState';
import { navItems } from './navigationData';

// Centralized component imports
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { default as NavbarContainer } from './NavbarContainer';

const NavbarContent = memo(() => {
  const {
    isMenuOpen,
    setIsMenuOpen,
    isMobileServicesOpen,
    setIsMobileServicesOpen,
    isVisible,
    scrolled,
    mounted,
    currentLanguage,
    user,
    userRole,
    toggleLanguage
  } = useNavbarLogic();

  const { handleBookingsClick } = useNavbarHandlers();

  // Apply navigation effects (escape key, outside clicks, route changes)
  useNavigationEffects();

  if (!mounted) return null;

  // Children: [Logo, DesktopNavigation, DesktopControls, MobileControls, MobileMenu]
  return (
    <NavbarContainer isVisible={isVisible} scrolled={scrolled}>
      {/* Section 1: Left (Logo) */}
      <Logo />
      {/* Section 2: Center (DesktopNavigation) */}
      <DesktopNavigation />
      {/* Section 3: Right (Auth Buttons, Language) */}
      <DesktopControls
        user={user}
        currentLanguage={currentLanguage}
        onLanguageChange={toggleLanguage}
      />
      {/* Mobile controls (only show on mobile) */}
      <MobileControls
        user={user}
        handleBookingsClick={handleBookingsClick}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      {/* MobileMenu stays out of the main grid flow */}
      <MobileMenu
        isOpen={isMenuOpen}
        setIsOpen={setIsMenuOpen}
        isMobileServicesOpen={isMobileServicesOpen}
        setIsMobileServicesOpen={setIsMobileServicesOpen}
        currentLanguage={currentLanguage}
        onLanguageChange={toggleLanguage}
        userRole={userRole}
      />
    </NavbarContainer>
  );
});

NavbarContent.displayName = 'NavbarContent';

const Navbar = memo(() => {
  return (
    <NavigationProvider navItems={navItems}>
      <NavbarContent />
    </NavigationProvider>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
