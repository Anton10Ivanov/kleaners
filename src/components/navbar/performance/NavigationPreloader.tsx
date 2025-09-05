
import { useEffect } from 'react';

interface NavigationPreloaderProps {
  enabled?: boolean;
}

export const NavigationPreloader: React.FC<NavigationPreloaderProps> = ({
  enabled = true
}) => {
  useEffect(() => {
    if (!enabled) return;

    // Preload navigation components on hover intent
    const preloadComponents = () => {
      // Preload enhanced dropdown navigation component
      import('../desktop/EnhancedDropdownNavigation');
      
      // Preload service categories data if not already loaded
      import('../navigationData');
    };

    // Add hover listeners to navigation triggers
    const navTriggers = document.querySelectorAll('[data-nav-trigger]');
    
    const handleMouseEnter = () => {
      preloadComponents();
      // Remove listeners after first preload
      navTriggers.forEach(trigger => {
        trigger.removeEventListener('mouseenter', handleMouseEnter);
      });
    };

    navTriggers.forEach(trigger => {
      trigger.addEventListener('mouseenter', handleMouseEnter, { once: true });
    });

    // Cleanup
    return () => {
      navTriggers.forEach(trigger => {
        trigger.removeEventListener('mouseenter', handleMouseEnter);
      });
    };
  }, [enabled]);

  return null; // This component doesn't render anything
};
