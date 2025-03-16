
import React from 'react';

interface NavbarContainerProps {
  children: React.ReactNode;
  isVisible: boolean;
  scrolled: boolean;
}

const NavbarContainer: React.FC<NavbarContainerProps> = ({ 
  children, 
  isVisible,
  scrolled
}) => {
  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 min-h-[64px] transform ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        scrolled ? 'bg-gray-900 text-white shadow-lg' : 'bg-gray-900 text-white border-b border-gray-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 my-[3px] py-[8px] bg-transparent">
          {children}
        </div>
      </div>
    </nav>
  );
};

export default NavbarContainer;
