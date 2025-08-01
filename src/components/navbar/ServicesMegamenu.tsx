
import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useNavigate } from 'react-router-dom';
import { serviceCategories } from './navigationData';

export const ServicesMegamenu: React.FC = () => {
  const navigate = useNavigate();

  // Limit to maximum 6 categories for the megamenu
  const displayCategories = serviceCategories.slice(0, 6);
  const hasMoreCategories = serviceCategories.length > 6;

  // Calculate grid columns based on number of displayed categories
  const categoriesCount = displayCategories.length;
  const getGridCols = () => {
    if (categoriesCount <= 3) return 'grid-cols-3';
    if (categoriesCount <= 4) return 'grid-cols-4';
    if (categoriesCount <= 6) return 'grid-cols-3 lg:grid-cols-6';
    return 'grid-cols-3 lg:grid-cols-4 xl:grid-cols-6';
  };

  // Calculate width based on number of displayed categories
  const getWidth = () => {
    if (categoriesCount <= 3) return 'w-[600px]';
    if (categoriesCount <= 4) return 'w-[800px]';
    if (categoriesCount <= 6) return 'w-[900px] lg:w-[1200px]';
    return 'w-[900px] lg:w-[1000px] xl:w-[1200px]';
  };

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="group h-10 px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className={`fixed left-1/2 transform -translate-x-1/2 ${getWidth()} p-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg border z-50`}>
              <div className={`grid ${getGridCols()} gap-6`}>
                {displayCategories.map((category) => (
                  <div key={category.title} className="space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                      <category.icon className="h-5 w-5 text-primary" />
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                        {category.title}
                      </h4>
                    </div>
                    <div className="space-y-1">
                      {category.services.slice(0, 3).map((service) => (
                        <button
                          key={service.href}
                          onClick={() => navigate(service.href)}
                          className="group flex items-center p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors w-full text-left"
                        >
                          <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary">
                            {service.title}
                          </span>
                        </button>
                      ))}
                      {category.services.length > 3 && (
                        <button
                          onClick={() => navigate('/services')}
                          className="text-sm text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/80 font-semibold mt-2 block transition-colors"
                        >
                          View all {category.services.length} services →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                <button
                  onClick={() => navigate('/services')}
                  className="text-sm text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/80 font-semibold transition-colors"
                >
                  {hasMoreCategories 
                    ? `Browse all ${serviceCategories.length} service categories →`
                    : 'Browse all cleaning services →'
                  }
                </button>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
