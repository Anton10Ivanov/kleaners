
import { useNavbarLogic } from './core/NavbarLogic';
import { useNavbarHandlers } from './core/NavbarHandlers';
import { DesktopNavigation } from './desktop/DesktopNavigation';
import { DesktopControls } from './desktop/DesktopControls';
import { MobileControls } from './mobile/MobileControls';

// Centralized component imports
import {
  Logo,
  MobileMenu,
  NavbarContainer,
  FeaturedServices
} from './';

const Navbar = () => {
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

export default Navbar;
