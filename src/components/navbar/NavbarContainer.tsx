
import React from 'react';
import { cn } from '@/lib/utils';
interface NavbarContainerProps {
  children: React.ReactNode[];
  isVisible: boolean;
  scrolled: boolean;
}
const NavbarContainer: React.FC<NavbarContainerProps> = ({
  children,
  isVisible,
  scrolled
}) => {
  return (
    <nav className={cn(
      "fixed w-full z-50 transition-all duration-500 ease-in-out",
      isVisible ? "translate-y-0" : "-translate-y-full",
      scrolled 
        ? "bg-primary border-b border-border shadow-sm backdrop-blur-md" 
        : "bg-primary/95 backdrop-blur-md border-b border-border/50"
    )}>
      <div className="w-full px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 max-w-[90%] mx-auto">
          {/* Logo Section */}
          <div className="flex items-center animate-fade-in">
            {children[0]}
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-8 animate-fade-in">
            {children[1]}
          </div>
          
          {/* Controls Section */}
          <div className="flex items-center gap-3 animate-fade-in">
            {children.slice(2)}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default NavbarContainer;

