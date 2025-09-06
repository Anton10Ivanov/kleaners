import React from 'react';
import { Menu, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileControlsProps {
  isMobileMenuOpen: boolean;
  onMenuToggle: () => void;
  onSearchToggle: () => void;
  onAccountToggle: () => void;
}

export const MobileControls: React.FC<MobileControlsProps> = ({
  isMobileMenuOpen,
  onMenuToggle,
  onSearchToggle,
  onAccountToggle
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={onSearchToggle}
        className="p-2 hover:bg-muted"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onAccountToggle}
        className="p-2 hover:bg-muted"
        aria-label="Account"
      >
        <User className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onMenuToggle}
        className="p-2 hover:bg-muted"
        aria-label="Toggle menu"
      >
        <Menu className="h-5 w-5" />
      </Button>
    </div>
  );
};