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
  return <nav className={`fixed w-full z-50 transition-all duration-300 min-h-[64px] transform ${isVisible ? 'translate-y-0' : '-translate-y-full'} ${scrolled ? 'bg-white shadow-md dark:bg-gray-900' : 'bg-white/95 backdrop-blur-sm dark:bg-gray-900/95'}`} style={{
    height: '64px'
  }}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 py-0 my-0 bg-transparent">
          {children}
        </div>
      </div>
    </nav>;
};
export default NavbarContainer;