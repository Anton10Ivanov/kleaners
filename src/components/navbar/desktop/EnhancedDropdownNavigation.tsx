
import React, { useState, useRef, useEffect } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import { EnhancedDropdownNavigationProps } from '@/types/navigation';

export const EnhancedDropdownNavigation: React.FC<EnhancedDropdownNavigationProps> = ({ navItems }) => {
  const navigate = useNavigate();
  const { isMobile, getMobileSpacing, getMobileTextSize } = useMobileOptimizations();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Enhanced hover management with delays
  const handleItemMouseEnter = (itemId: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveItem(itemId);
    }, 100);
  };

  const handleItemMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveItem(null);
    }, 300);
  };

  // Keyboard navigation support
  const handleKeyDown = (event: React.KeyboardEvent, path: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      navigate(path);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="space-x-2">
        {navItems.map((item) => (
          <NavigationMenuItem 
            key={item.id}
            onMouseEnter={() => handleItemMouseEnter(item.id.toString())}
            onMouseLeave={handleItemMouseLeave}
          >
            <NavigationMenuTrigger 
              className={cn(
                "group transition-all duration-200 focus:outline-none",
                "hover:bg-accent hover:text-accent-foreground",
                "focus:bg-accent focus:text-accent-foreground", 
                "focus-visible:ring-2 focus-visible:ring-primary/20",
                "data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                "font-semibold text-base tracking-wide touch-comfortable",
                isMobile ? "h-12 px-4 py-3 text-lg" : "h-10 px-4 py-2 text-base",
                activeItem === item.id.toString() && "bg-accent/30"
              )}
            >
              {item.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className={cn(
                "bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm",
                "shadow-xl rounded-xl border border-border/50 z-50",
                "animate-in fade-in-0 zoom-in-95 duration-200",
                isMobile ? "w-[320px] p-6" : "w-[300px] p-6"
              )}>
                {item.subMenus?.map((subMenu) => (
                  <div key={subMenu.title}>
                    <h4 className={cn(
                      "font-bold text-foreground mb-4 text-lg tracking-tight",
                      "border-b border-border/20 pb-2",
                      getMobileTextSize('lg')
                    )}>
                      {subMenu.title}
                    </h4>
                    <div className="space-y-2">
                      {subMenu.items.map((subItem) => (
                        <button
                          key={subItem.path}
                          onClick={() => navigate(subItem.path)}
                          onKeyDown={(e) => handleKeyDown(e, subItem.path)}
                          className={cn(
                            "group flex flex-col items-start w-full text-left rounded-lg",
                            "hover:bg-accent/50 dark:hover:bg-gray-700/50",
                            "focus:bg-accent/50 focus:outline-none",
                            "focus-visible:ring-2 focus-visible:ring-primary/20",
                            "transition-all duration-200 touch-comfortable",
                            "p-3 border border-transparent hover:border-border/20",
                            getMobileSpacing('sm')
                          )}
                        >
                          <h5 className={cn(
                            "font-semibold text-foreground group-hover:text-primary",
                            "transition-colors duration-200 text-base leading-tight",
                            "mb-1",
                            getMobileTextSize('base')
                          )}>
                            {subItem.label}
                          </h5>
                          <p className={cn(
                            "text-muted-foreground leading-relaxed font-normal",
                            isMobile ? "text-sm" : "text-sm",
                            "group-hover:text-muted-foreground/80"
                          )}>
                            {subItem.description}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
