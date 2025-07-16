
import React from 'react';
import { AlignJustify, X } from 'lucide-react';

interface MobileMenuToggleProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const MobileMenuToggle: React.FC<MobileMenuToggleProps> = ({ 
  isMenuOpen, 
  setIsMenuOpen 
}) => {
  return (
    <button 
      onClick={() => setIsMenuOpen(!isMenuOpen)} 
      className="text-gray-700 dark:text-gray-200 hover:text-primary transition-colors p-2 touch-manipulation"
      aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      type="button"
      data-mobile-menu-toggle
    >
      {isMenuOpen ? (
        <X size={28} />
      ) : (
        <AlignJustify size={28} />
      )}
    </button>
  );
};

export default MobileMenuToggle;
