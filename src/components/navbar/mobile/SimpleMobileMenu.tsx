import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { X, Home, Briefcase, Info, Phone, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Services', path: '/services', icon: Briefcase },
  { label: 'About', path: '/about', icon: Info },
  { label: 'Contact', path: '/contact', icon: Phone },
  { label: 'Join Our Team', path: '/contact?tab=join', icon: Users },
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
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-background border-l border-border z-50 md:hidden shadow-2xl",
        "transform transition-all duration-300 ease-out",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
          <h2 className="text-xl font-bold text-heading-color">Navigation</h2>
          <button
            onClick={onClose}
            className="p-3 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200 touch-manipulation"
            aria-label="Close menu"
          >
            <X className="h-6 w-6 text-accent" />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="p-6">
          <div className="space-y-3">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    "w-full flex items-center gap-4 px-4 py-4 rounded-xl text-base font-medium transition-all duration-200 touch-manipulation",
                    "hover:bg-primary/10 hover:text-primary hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground shadow-lg border-l-4 border-primary-foreground"
                      : "text-accent hover:scale-[1.02]"
                  )}
                >
                  <IconComponent className={cn(
                    "h-5 w-5 flex-shrink-0",
                    isActive(item.path) ? "text-primary-foreground" : "text-primary"
                  )} />
                  <span className="text-left">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
        
        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border bg-gradient-to-r from-accent/5 to-primary/5">
          <p className="text-sm text-muted-foreground text-center">
            Kleaners Professional Services
          </p>
        </div>
      </div>
    </>
  );
};