import * as React from 'react';
import { cn } from '@/lib/utils';

interface NavbarContainerProps {
  children: React.ReactNode;
  isVisible: boolean;
  scrolled: boolean;
}

const NavbarContainer: React.FC<NavbarContainerProps> = ({ children, isVisible, scrolled }) => {
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 mobile-nav-enhanced",
        scrolled && "mobile-nav-scrolled",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="mobile-container-fluid">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {children}
        </div>
      </div>
    </nav>
  );
};

export default NavbarContainer;