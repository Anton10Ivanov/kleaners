
// Navbar Components Index
// Centralized exports for all navbar components

// Main navbar
export { default as Navbar } from './Navbar';

// Core components
export { Logo } from './Logo';
export { ThemeToggle } from './ThemeToggle';
export { default as LanguageSelector } from './LanguageSelector';
export { MobileMenu } from './MobileMenu';
export { default as NavbarContainer } from './NavbarContainer';
export { default as UserControls } from './UserControls';
export { default as MobileUserControls } from './MobileUserControls';
export { default as MobileMenuToggle } from './MobileMenuToggle';
export { default as FeaturedServices } from './FeaturedServices';

// Navigation components
export { ServicesMegamenu } from './ServicesMegamenu';
export { EnhancedDropdownNavigation } from './EnhancedDropdownNavigation';

// Core logic hooks
export { useNavbarLogic } from './core/NavbarLogic';
export { useNavbarHandlers } from './core/NavbarHandlers';

// Desktop components
export { DesktopNavigation } from './desktop/DesktopNavigation';
export { DesktopControls } from './desktop/DesktopControls';

// Mobile components - updated imports
export { MobileControls } from './mobile/MobileControls';

// Auth components
export { AuthButtons } from './auth';

// Data
export { serviceCategories, navItems } from './navigationData';
