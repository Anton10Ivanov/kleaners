
// Mobile Navigation Components Index
// Touch-optimized and accessible mobile navigation components

// Legacy mobile components - using default imports to fix build errors
export { default as ClientSection } from './ClientSection';
export { default as ProviderSection } from './ProviderSection';
export { default as AdminSection } from './AdminSection';
export { default as NavigationSection } from './NavigationSection';
export { default as LogoutButton } from './LogoutButton';
export { default as HeaderControls } from './HeaderControls';
export { default as BusinessSolutionsSection } from './BusinessSolutionsSection';

// Enhanced mobile components (Phase 2A)
export { TouchOptimizedControls, SwipeGestureArea } from './TouchOptimizedControls';
export { EnhancedMobileMenu, TouchOptimizedMenuItem } from './EnhancedMobileMenu';
export { 
  AccessibleNavigation, 
  SkipLink, 
  ScreenReaderOnly, 
  KeyboardNavigation 
} from './AccessibilityEnhancements';

// Mobile controls
export { MobileControls } from './MobileControls';
