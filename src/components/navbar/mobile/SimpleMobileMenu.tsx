import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Join Our Team', path: '/contact?tab=join' },
];

interface SimpleMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SimpleMobileMenu: React.FC<SimpleMobileMenuProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    if (path === '/contact?tab=join') {
      return location.pathname === '/contact' && location.search.includes('tab=join');
    }
    return location.pathname.startsWith(path.split('?')[0]);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background border-l border-border z-50 md:hidden",
        "transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-heading-color">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5 text-secondary-text" />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-200",
                  "hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
                  isActive(item.path)
                    ? "bg-primary/10 text-primary border-l-4 border-primary"
                    : "text-secondary-text hover:text-primary"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};