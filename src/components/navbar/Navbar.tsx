
import { useNavbarLogic } from './core/NavbarLogic';
import { useNavbarHandlers } from './core/NavbarHandlers';
import { DesktopNavigation } from './desktop/DesktopNavigation';
import { DesktopControls } from './desktop/DesktopControls';
import { MobileControls } from './mobile/MobileControls';
import { NavigationProvider } from './context/NavigationContext';
import { useNavigationEffects } from './hooks/useNavigationState';
import { navItems } from './navigationData';

// Centralized component imports
import {
  Logo,
  MobileMenu,
  NavbarContainer,
  FeaturedServices
} from './';

const NavbarContent = () => {
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

  return (
    <NavbarContainer isVisible={isVisible} scrolled={scrolled}>
      <Logo />
      <FeaturedServices />
      <DesktopNavigation />
      <DesktopControls 
        user={user}
        currentLanguage={currentLanguage}
        onLanguageChange={toggleLanguage}
      />
      <MobileControls 
        user={user}
        handleBookingsClick={handleBookingsClick}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
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
};

const Navbar = () => {
  return (
    <NavigationProvider navItems={navItems}>
      <NavbarContent />
    </NavigationProvider>
  );
};

export default Navbar;
