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
  const { state, dispatch } = useNavbarLogic();
  const {
    handleLogoClick,
    handleLinkClick,
    handleMenuToggle,
    handleSearchToggle,
    handleAccountToggle
  } = useNavbarHandlers({ state, dispatch });

  // Apply navigation effects
  useNavigationEffects(state, dispatch);

  return (
    <NavbarContainer isVisible={state.isVisible} scrolled={state.scrolled}>
      {/* Desktop Logo */}
      <div onClick={handleLogoClick} className="cursor-pointer">
        <Logo />
      </div>

      {/* Desktop Navigation - Hidden on mobile */}
      <div className="hidden lg:flex lg:items-center lg:justify-center lg:flex-1">
        <DesktopNavigation
          navItems={navItems}
          activeItem={state.activeItem}
          onLinkClick={handleLinkClick}
        />
      </div>

      {/* Desktop Controls - Hidden on mobile */}
      <div className="hidden lg:flex lg:items-center lg:space-x-4">
        <DesktopControls
          onSearchToggle={handleSearchToggle}
          onAccountToggle={handleAccountToggle}
        />
      </div>

      {/* Mobile Controls */}
      <div className="lg:hidden">
        <MobileControls
          isMobileMenuOpen={state.isMobileMenuOpen}
          onMenuToggle={handleMenuToggle}
          onSearchToggle={handleSearchToggle}
          onAccountToggle={handleAccountToggle}
        />
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={state.isMobileMenuOpen}
        onClose={handleMenuToggle}
        onLinkClick={handleLinkClick}
        activeItem={state.activeItem}
        navItems={navItems}
      />
    </NavbarContainer>
  );
});

NavbarContent.displayName = 'NavbarContent';

export const Navbar = () => {
  return (
    <NavigationProvider>
      <NavbarContent />
    </NavigationProvider>
  );
};

export default Navbar;