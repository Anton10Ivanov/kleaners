
import React from 'react';
import { SimpleMobileMenu } from './mobile/SimpleMobileMenu';

interface MobileMenuProps {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileServicesOpen?: boolean;
  setIsMobileServicesOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  currentLanguage?: 'en' | 'de';
  onLanguageChange?: () => void;
  isAdmin?: boolean;
  isProvider?: boolean;
  isClient?: boolean;
  userRole?: 'admin' | 'provider' | 'client' | null;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen = false,
  setIsOpen,
}) => {
  const handleClose = () => {
    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  return (
    <SimpleMobileMenu
      isOpen={isOpen}
      onClose={handleClose}
    />
  );
};
