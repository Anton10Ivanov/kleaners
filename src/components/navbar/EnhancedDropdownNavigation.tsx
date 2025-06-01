
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

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="space-x-2">
        {navItems.map((item) => (
          <NavigationMenuItem key={item.id}>
            <NavigationMenuTrigger className="group h-10 px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
              {item.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[300px] p-4 bg-white dark:bg-gray-800 shadow-xl rounded-lg border">
                {item.subMenus?.map((subMenu) => (
                  <div key={subMenu.title} className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                      {subMenu.title}
                    </h4>
                    <div className="space-y-1">
                      {subMenu.items.map((subItem) => (
                        <button
                          key={subItem.path}
                          onClick={() => navigate(subItem.path)}
                          className="group flex items-start gap-3 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors w-full text-left"
                        >
                          <div className="flex-shrink-0 mt-0.5 text-primary">
                            {subItem.icon}
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary">
                              {subItem.label}
                            </h5>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
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
