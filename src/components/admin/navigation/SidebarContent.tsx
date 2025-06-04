
import React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { NavItem } from './NavItem';
import { cn } from '@/lib/utils';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';

interface SidebarContentProps {
  navItems: NavItem[];
  activeItem: string;
  handleNavClick: (href: string) => void;
  handleLogout: () => void;
}

export const SidebarContent: React.FC<SidebarContentProps> = ({
  navItems,
  activeItem,
  handleNavClick,
  handleLogout,
}) => {
  const { isMobile, getMobileSpacing, getMobileButtonSize } = useMobileOptimizations();

  return (
    <div className={cn(
      "w-full bg-background border-b border-border",
      getMobileSpacing('md')
    )}>
      <div className="container mx-auto">
        <div className="flex flex-row justify-between items-center">
          <div className="flex items-center">
            <h2 className={cn(
              "font-semibold tracking-tight text-foreground",
              isMobile ? "text-lg mr-3" : "text-lg mr-4"
            )}>
              Admin Dashboard
            </h2>
            <div className="flex flex-row overflow-x-auto">
              {navItems.map((item) => (
                <Button
                  key={item.title}
                  variant={activeItem === item.title.toLowerCase() ? "secondary" : "ghost"}
                  className={cn(
                    "transition-colors duration-200 touch-comfortable",
                    isMobile ? "mr-1 h-12 px-3 text-sm" : "mr-1 h-10 px-4 text-sm",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus:bg-accent focus:text-accent-foreground",
                    activeItem === item.title.toLowerCase() && "bg-secondary text-secondary-foreground"
                  )}
                  onClick={() => handleNavClick(item.href)}
                >
                  <span className={cn(
                    "transition-colors duration-200",
                    isMobile ? "h-5 w-5" : "h-4 w-4"
                  )}>
                    {item.icon}
                  </span>
                  <span className={cn(
                    "font-medium",
                    isMobile ? "ml-2 text-sm" : "ml-2 text-sm"
                  )}>
                    {item.title}
                  </span>
                </Button>
              ))}
            </div>
          </div>
          <Button
            variant="ghost"
            className={cn(
              "text-destructive hover:bg-destructive/10 hover:text-destructive",
              "transition-colors duration-200 touch-comfortable",
              "focus:bg-destructive/10 focus:text-destructive",
              isMobile ? "h-12 px-3" : "h-10 px-4"
            )}
            onClick={handleLogout}
          >
            <LogOut className={cn(
              isMobile ? "h-5 w-5" : "h-4 w-4"
            )} />
            <span className={cn(
              "font-medium",
              isMobile ? "ml-2 text-sm" : "ml-2 text-sm"
            )}>
              Logout
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};
