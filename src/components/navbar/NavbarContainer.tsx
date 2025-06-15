
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
  return <nav className={`fixed w-full z-50 transition-all duration-300 min-h-[64px] transform ${isVisible ? 'translate-y-0' : '-translate-y-full'} ${scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'}`} style={{
    height: '64px'
  }}>
      <div className="w-full px-4 sm:px-6 flex justify-between items-center h-16 py-0 my-0 bg-transparent">
        {children}
      </div>
    </nav>;
};
export default NavbarContainer;
