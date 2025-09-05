
<<<<<<< HEAD
import { memo } from 'react';
=======
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
import { useNavbarLogic } from './core/NavbarLogic';
import { useNavbarHandlers } from './core/NavbarHandlers';
import { DesktopNavigation } from './desktop/DesktopNavigation';
import { DesktopControls } from './desktop/DesktopControls';
import { MobileControls } from './mobile/MobileControls';
import { NavigationProvider } from './context/NavigationContext';
import { useNavigationEffects } from './hooks/useNavigationState';
import { navItems } from './navigationData';

// Centralized component imports
<<<<<<< HEAD
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { default as NavbarContainer } from './NavbarContainer';

const NavbarContent = memo(() => {
=======
import {
  Logo,
  MobileMenu,
  NavbarContainer
} from './';

const NavbarContent = () => {
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
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
<<<<<<< HEAD
});

NavbarContent.displayName = 'NavbarContent';

const Navbar = memo(() => {
=======
};

const Navbar = () => {
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
  return (
    <NavigationProvider navItems={navItems}>
      <NavbarContent />
    </NavigationProvider>
  );
<<<<<<< HEAD
});

Navbar.displayName = 'Navbar';
=======
};
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf

export default Navbar;
