
import React from 'react';
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

interface NavItem {
  id: number;
  label: string;
  subMenus?: Array<{
    title: string;
    items: Array<{
      label: string;
      description: string;
      icon: React.ReactNode;
      path: string;
      price?: string;
    }>;
  }>;
}

interface EnhancedDropdownNavigationProps {
  navItems: NavItem[];
}

export const EnhancedDropdownNavigation: React.FC<EnhancedDropdownNavigationProps> = ({ navItems }) => {
  const navigate = useNavigate();
  const { isMobile, getMobileSpacing, getMobileTextSize } = useMobileOptimizations();

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="space-x-2">
        {navItems.map((item) => (
          <NavigationMenuItem key={item.id}>
            <NavigationMenuTrigger className={cn(
              "group transition-colors duration-200 focus:outline-none",
              "hover:bg-accent hover:text-accent-foreground",
              "focus:bg-accent focus:text-accent-foreground", 
              "data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
              "font-medium touch-comfortable",
              isMobile ? "h-12 px-4 py-3 text-base" : "h-10 px-4 py-2 text-sm"
            )}>
              {item.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className={cn(
                "bg-white dark:bg-gray-800 shadow-xl rounded-xl border",
                "border-border/50 backdrop-blur-sm z-50",
                isMobile ? "w-[320px] p-4" : "w-[300px] p-4"
              )}>
                {item.subMenus?.map((subMenu) => (
                  <div key={subMenu.title} className="space-y-2">
                    <h4 className={cn(
                      "font-semibold text-foreground mb-3",
                      getMobileTextSize('md')
                    )}>
                      {subMenu.title}
                    </h4>
                    <div className="space-y-1">
                      {subMenu.items.map((subItem) => (
                        <button
                          key={subItem.path}
                          onClick={() => navigate(subItem.path)}
                          className={cn(
                            "group flex items-start gap-3 w-full text-left rounded-lg",
                            "hover:bg-accent/50 dark:hover:bg-gray-700/50",
                            "transition-colors duration-200 touch-comfortable",
                            getMobileSpacing('sm')
                          )}
                        >
                          <div className="flex-shrink-0 mt-0.5 text-primary transition-colors">
                            {subItem.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className={cn(
                              "font-medium text-foreground group-hover:text-primary",
                              "transition-colors duration-200",
                              getMobileTextSize('sm')
                            )}>
                              {subItem.label}
                            </h5>
                            <p className={cn(
                              "text-muted-foreground leading-relaxed",
                              isMobile ? "text-sm mt-1" : "text-xs"
                            )}>
                              {subItem.description}
                            </p>
                          </div>
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
