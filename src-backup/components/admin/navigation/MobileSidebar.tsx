
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { SidebarContent } from './SidebarContent';
import { NavItem } from './NavItem';
import { cn } from '@/lib/utils';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';

interface MobileSidebarProps {
  navItems: NavItem[];
  activeItem: string;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  handleNavClick: (href: string) => void;
  handleLogout: () => void;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({
  navItems,
  activeItem,
  isSidebarOpen,
  setIsSidebarOpen,
  handleNavClick,
  handleLogout,
}) => {
  const { isMobile, getMobileSpacing } = useMobileOptimizations();

  return (
    <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute left-4 top-4 md:hidden touch-comfortable",
            "hover:bg-accent hover:text-accent-foreground",
            "focus:bg-accent focus:text-accent-foreground",
            "transition-colors duration-200",
            isMobile ? "h-12 w-12" : "h-10 w-10"
          )}
        >
          <Menu className={cn(
            isMobile ? "h-6 w-6" : "h-5 w-5"
          )} />
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="left" 
        className={cn(
          "card-spacing-none safe-area-left",
          isMobile ? "w-[320px]" : "w-[350px]"
        )}
      >
        <div className={cn(
          "mobile-stack form-spacing-relaxed",
          getMobileSpacing('md')
        )}>
          <div className="mobile-section">
            <h3 className={cn(
              "font-semibold text-foreground mb-4",
              isMobile ? "text-lg" : "text-base"
            )}>
              Admin Navigation
            </h3>
            <div className="mobile-stack form-spacing-tight">
              {navItems.map((item) => (
                <Button
                  key={item.title}
                  variant={activeItem === item.title.toLowerCase() ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start touch-comfortable",
                    "transition-colors duration-200",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus:bg-accent focus:text-accent-foreground",
                    isMobile ? "h-12 px-4 text-base" : "h-10 px-3 text-sm",
                    activeItem === item.title.toLowerCase() && "bg-secondary text-secondary-foreground"
                  )}
                  onClick={() => {
                    handleNavClick(item.href);
                    setIsSidebarOpen(false);
                  }}
                >
                  <span className={cn(
                    "transition-colors duration-200",
                    isMobile ? "h-5 w-5" : "h-4 w-4"
                  )}>
                    {item.icon}
                  </span>
                  <span className={cn(
                    "font-medium",
                    isMobile ? "ml-3 text-base" : "ml-2 text-sm"
                  )}>
                    {item.title}
                  </span>
                </Button>
              ))}
            </div>
          </div>
          
          <div className="mobile-section border-t border-border pt-4">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start touch-comfortable",
                "text-destructive hover:bg-destructive/10 hover:text-destructive",
                "focus:bg-destructive/10 focus:text-destructive",
                "transition-colors duration-200",
                isMobile ? "h-12 px-4 text-base" : "h-10 px-3 text-sm"
              )}
              onClick={() => {
                handleLogout();
                setIsSidebarOpen(false);
              }}
            >
              <Menu className={cn(
                isMobile ? "h-5 w-5" : "h-4 w-4"
              )} />
              <span className={cn(
                "font-medium",
                isMobile ? "ml-3 text-base" : "ml-2 text-sm"
              )}>
                Logout
              </span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
