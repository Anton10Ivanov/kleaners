
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { NavItem } from '@/types/navigation';

interface NavigationState {
  isMenuOpen: boolean;
  isMobileServicesOpen: boolean;
  activeNavItem: string | null;
  isLoading: boolean;
}

interface NavigationActions {
  setIsMenuOpen: (open: boolean) => void;
  setIsMobileServicesOpen: (open: boolean) => void;
  setActiveNavItem: (item: string | null) => void;
  setIsLoading: (loading: boolean) => void;
  toggleMenu: () => void;
  toggleMobileServices: () => void;
  closeAllMenus: () => void;
}

interface NavigationContextType {
  state: NavigationState;
  actions: NavigationActions;
  navItems: NavItem[];
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
  navItems: NavItem[];
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children, navItems }) => {
  const [state, setState] = useState<NavigationState>({
    isMenuOpen: false,
    isMobileServicesOpen: false,
    activeNavItem: null,
    isLoading: false,
  });

  const actions: NavigationActions = {
    setIsMenuOpen: (open: boolean) => 
      setState(prev => ({ ...prev, isMenuOpen: open })),
    
    setIsMobileServicesOpen: (open: boolean) => 
      setState(prev => ({ ...prev, isMobileServicesOpen: open })),
    
    setActiveNavItem: (item: string | null) => 
      setState(prev => ({ ...prev, activeNavItem: item })),
    
    setIsLoading: (loading: boolean) => 
      setState(prev => ({ ...prev, isLoading: loading })),
    
    toggleMenu: () => 
      setState(prev => ({ ...prev, isMenuOpen: !prev.isMenuOpen })),
    
    toggleMobileServices: () => 
      setState(prev => ({ ...prev, isMobileServicesOpen: !prev.isMobileServicesOpen })),
    
    closeAllMenus: () => 
      setState(prev => ({ 
        ...prev, 
        isMenuOpen: false, 
        isMobileServicesOpen: false,
        activeNavItem: null 
      })),
  };

  return (
    <NavigationContext.Provider value={{ state, actions, navItems }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

export const useNavigationState = () => {
  const { state } = useNavigation();
  return state;
};

export const useNavigationActions = () => {
  const { actions } = useNavigation();
  return actions;
};
