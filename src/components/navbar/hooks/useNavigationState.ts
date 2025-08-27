
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigation } from '../context/NavigationContext';

export const useNavigationEffects = () => {
  const location = useLocation();
  const { actions } = useNavigation();

  // Close menus when route changes
  useEffect(() => {
    actions.closeAllMenus();
  }, [location, actions.closeAllMenus]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        actions.closeAllMenus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [actions.closeAllMenus]);

  // Handle outside clicks
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('[data-navigation-menu]')) {
        actions.closeAllMenus();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [actions.closeAllMenus]);
};

export const useMenuToggle = () => {
  const { state, actions } = useNavigation();

  return {
    isMenuOpen: state.isMenuOpen,
    isMobileServicesOpen: state.isMobileServicesOpen,
    toggleMenu: actions.toggleMenu,
    toggleMobileServices: actions.toggleMobileServices,
    setIsMenuOpen: actions.setIsMenuOpen,
    setIsMobileServicesOpen: actions.setIsMobileServicesOpen,
  };
};
