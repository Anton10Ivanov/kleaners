import React, { useState, useRef, useEffect } from 'react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import { EnhancedDropdownNavigationProps } from '@/types/navigation';
export const EnhancedDropdownNavigation: React.FC<EnhancedDropdownNavigationProps> = ({
  navItems
}) => {
  const navigate = useNavigate();
  const {
    isMobile,
    getMobileSpacing,
    getMobileTextSize
  } = useMobileOptimizations();
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
  return <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="space-x-2">
        {navItems.map(item => <NavigationMenuItem key={item.id} onMouseEnter={() => handleItemMouseEnter(item.id.toString())} onMouseLeave={handleItemMouseLeave}>
            <NavigationMenuTrigger className={cn("group transition-all duration-200 focus:outline-none", "hover:bg-gray-100 hover:text-gray-800", "focus:bg-gray-100", "focus-visible:ring-2 focus-visible:ring-primary/20", "data-[active]:bg-gray-50 data-[state=open]:bg-gray-50", "font-medium text-gray-600", isMobile ? "h-12 px-3 text-base" : "h-9 px-3 text-sm", activeItem === item.id.toString() && "bg-gray-50")}>
              {item.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className={cn("bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm", "shadow-xl rounded-xl border border-border/50 z-50", "animate-in fade-in-0 zoom-in-95 duration-200", isMobile ? "w-[320px] p-4" : "w-[300px] p-4")}>
                {item.subMenus?.map(subMenu => <div key={subMenu.title}>
                    
                    <div className="space-y-1">
                      {subMenu.items.map(subItem => <button key={subItem.path} onClick={() => navigate(subItem.path)} onKeyDown={e => handleKeyDown(e, subItem.path)} className={cn("group flex flex-col items-start w-full text-left rounded-lg", "hover:bg-gray-50 dark:hover:bg-gray-700/50", "focus:bg-gray-50 focus:outline-none", "focus-visible:ring-2 focus-visible:ring-primary/20", "transition-all duration-200 touch-comfortable", getMobileSpacing('sm'), subItem.isViewAll && "mt-3 pt-3 border-t border-border/30")}>
                          <h5 className={cn("font-medium group-hover:text-primary", "transition-colors duration-200", getMobileTextSize('sm'), subItem.isViewAll ? "text-muted-foreground text-xs font-normal" : "text-foreground")}>
                            {subItem.label}
                          </h5>
                          <p className={cn("text-muted-foreground leading-relaxed", subItem.isViewAll ? "text-xs opacity-75" : isMobile ? "text-sm mt-1" : "text-xs")}>
                            {subItem.description}
                          </p>
                        </button>)}
                    </div>
                  </div>)}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>)}
      </NavigationMenuList>
    </NavigationMenu>;
};