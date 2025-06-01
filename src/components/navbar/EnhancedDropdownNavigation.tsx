import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { ChevronDown, Home, Building2, Package, Wrench } from 'lucide-react';
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

const serviceItems = [
  {
    label: "Regular Cleaning",
    description: "Professional home cleaning service",
    icon: <Home className="h-5 w-5 text-blue-500" />,
    path: "/services/regular-cleaning",
    price: "from €45"
  },
  {
    label: "Business Cleaning", 
    description: "Commercial cleaning solutions",
    icon: <Building2 className="h-5 w-5 text-emerald-500" />,
    path: "/services/business-cleaning",
    price: "from €85"
  },
  {
    label: "Move In/Out",
    description: "Thorough cleaning for transitions",
    icon: <Package className="h-5 w-5 text-orange-500" />,
    path: "/services/move-in-out",
    price: "from €120"
  },
  {
    label: "Post Construction",
    description: "Clean-up after construction work", 
    icon: <Wrench className="h-5 w-5 text-purple-500" />,
    path: "/services/post-construction-cleaning",
    price: "from €200"
  }
];

export const EnhancedDropdownNavigation: React.FC<EnhancedDropdownNavigationProps> = ({ navItems }) => {
  const navigate = useNavigate();

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="space-x-2">
        {/* Services Menu with enhanced styling */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="group h-10 px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
            Services
            <ChevronDown className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[480px] p-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg border">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Cleaning Services
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Professional cleaning solutions for every need
                </p>
              </div>
              
              <div className="grid gap-3">
                {serviceItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={cn(
                      "group flex items-start gap-3 p-3 rounded-lg",
                      "hover:bg-gray-50 dark:hover:bg-gray-700/50",
                      "transition-all duration-200 text-left",
                      "border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
                    )}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary">
                          {item.label}
                        </h4>
                        {item.price && (
                          <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                            {item.price}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <button
                  onClick={() => navigate('/services')}
                  className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1"
                >
                  View all services →
                </button>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Other menu items */}
        {navItems.slice(1).map((item) => (
          <NavigationMenuItem key={item.id}>
            <NavigationMenuTrigger className="group h-10 px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
              {item.label}
              <ChevronDown className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" />
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
                          <div className="flex-shrink-0 mt-0.5">
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
