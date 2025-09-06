import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SimpleMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{
    title: string;
    href: string;
    target?: string;
  }>;
  activeItem: string | null;
  onLinkClick: (href: string) => void;
}

export const SimpleMobileMenu: React.FC<SimpleMobileMenuProps> = ({
  isOpen,
  onClose,
  navItems,
  activeItem,
  onLinkClick
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-16 left-0 right-0 z-50 bg-white border-t border-border shadow-lg lg:hidden">
      <div className="px-4 py-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
        <nav className="space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => {
                onLinkClick(item.href);
                onClose();
              }}
              className={cn(
                "block px-3 py-2 text-base font-medium rounded-md transition-colors",
                activeItem === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};