
import { cn } from '@/lib/utils';

/**
 * Navbar Style Helpers - Unified styling utilities
 */

export const navbarStyles = {
  // Container styles
  container: {
    base: "navbar-container",
    visible: "navbar-slide-in navbar-fade-in",
    hidden: "navbar-slide-out navbar-fade-out",
    scrolled: "bg-background shadow-md dark:bg-gray-900",
    transparent: "bg-background/95 backdrop-blur-sm dark:bg-gray-900/95"
  },

  // Button variants
  button: {
    base: "navbar-btn",
    ghost: "navbar-btn-ghost",
    contextual: "navbar-btn-contextual",
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary/10 text-secondary-foreground hover:bg-secondary/20"
  },

  // Icon sizes
  icon: {
    sm: "navbar-icon-sm",
    base: "navbar-icon",
    lg: "navbar-icon-lg"
  },

  // Badge variants
  badge: {
    base: "navbar-badge",
    hot: "navbar-badge-hot",
    new: "navbar-badge-new",
    fast: "bg-green-500/10 text-green-600 border-green-500/20"
  },

  // Mobile styles
  mobile: {
    item: "navbar-mobile-item",
    section: "navbar-mobile-section",
    menu: "fixed inset-0 z-50 bg-background/95 backdrop-blur-sm"
  },

  // Dropdown styles
  dropdown: {
    container: "navbar-dropdown",
    item: "navbar-dropdown-item",
    separator: "h-px bg-border/50 mx-2 my-1"
  }
};

/**
 * Generate navbar button classes with unified styling
 */
export const getNavbarButtonClasses = (
  variant: 'ghost' | 'contextual' | 'primary' | 'secondary' = 'ghost',
  size: 'sm' | 'md' | 'lg' = 'md',
  className?: string
) => {
  const sizeClasses = {
    sm: "h-8 px-2 text-xs gap-1",
    md: "h-9 px-3 text-sm gap-2", 
    lg: "h-10 px-4 text-base gap-2"
  };

  return cn(
    navbarStyles.button.base,
    navbarStyles.button[variant],
    sizeClasses[size],
    className
  );
};

/**
 * Generate navbar icon classes with unified sizing
 */
export const getNavbarIconClasses = (
  size: 'sm' | 'base' | 'lg' = 'base',
  className?: string
) => {
  return cn(navbarStyles.icon[size], className);
};

/**
 * Generate navbar badge classes with unified styling
 */
export const getNavbarBadgeClasses = (
  variant: 'hot' | 'new' | 'fast' = 'hot',
  className?: string
) => {
  return cn(navbarStyles.badge.base, navbarStyles.badge[variant], className);
};

/**
 * Generate mobile navbar item classes
 */
export const getMobileNavbarClasses = (
  type: 'item' | 'section' = 'item',
  className?: string
) => {
  return cn(navbarStyles.mobile[type], className);
};

/**
 * Responsive navbar utilities
 */
export const navbarResponsive = {
  // Hide on mobile, show on desktop
  desktopOnly: "hidden lg:flex",
  // Show on mobile, hide on desktop  
  mobileOnly: "flex lg:hidden",
  // Responsive spacing
  spacing: {
    mobile: "gap-1 px-2",
    desktop: "gap-2 px-4"
  }
};
