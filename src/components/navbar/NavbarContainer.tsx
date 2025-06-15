
import React from 'react';
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
    <nav className={`fixed w-full z-50 transition-all duration-300 min-h-[64px] transform ${isVisible ? 'translate-y-0' : '-translate-y-full'} ${scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'}`} style={{ height: '64px' }}>
      <div
        className="w-full px-2 md:px-6 h-16 grid grid-cols-3 items-center bg-transparent"
      >
        <div className="flex items-center justify-start min-w-0">
          {children[0]}
        </div>
        <div className="flex items-center justify-center min-w-0">
          {children[1]}
        </div>
        <div className="flex items-center justify-end gap-2 min-w-0">
          {/* Allow for more than 2 children in this section (auth, language, etc) */}
          {children.slice(2)}
        </div>
      </div>
    </nav>
  );
};
export default NavbarContainer;

