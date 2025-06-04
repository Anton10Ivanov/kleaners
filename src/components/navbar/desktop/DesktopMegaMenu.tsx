
import React, { useState, useRef, useEffect } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useNavigate } from 'react-router-dom';
import { serviceCategories } from '../navigationData';
import { cn } from '@/lib/utils';

export const DesktopMegaMenu: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Intelligent positioning and hover delay
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHovering(true);
    // Small delay to prevent accidental opens
    timeoutRef.current = setTimeout(() => {
      if (hovering) {
        setIsOpen(true);
      }
    }, 150);
  };

  const handleMouseLeave = () => {
    setHovering(false);
    // Exit intent delay
    timeoutRef.current = setTimeout(() => {
      if (!hovering) {
        setIsOpen(false);
      }
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
          <NavigationMenuTrigger 
            className={cn(
              "group h-10 px-4 py-2 text-sm font-medium transition-all duration-200",
              "hover:bg-accent hover:text-accent-foreground",
              "focus:bg-accent focus:text-accent-foreground focus:outline-none",
              "data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
              "focus-visible:ring-2 focus-visible:ring-primary/20"
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className={cn(
              "fixed left-1/2 transform -translate-x-1/2 p-6",
              "bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm",
              "shadow-xl rounded-lg border border-border/50 z-50",
              "animate-in fade-in-0 zoom-in-95 duration-200",
              getWidth()
            )}>
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
                          className={cn(
                            "group flex items-center p-2 rounded-md w-full text-left",
                            "hover:bg-gray-50 dark:hover:bg-gray-700/50",
                            "transition-colors duration-200",
                            "focus:outline-none focus:ring-2 focus:ring-primary/20"
                          )}
                        >
                          <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                            {service.title}
                          </span>
                        </button>
                      ))}
                      {category.services.length > 3 && (
                        <button
                          onClick={() => navigate('/services')}
                          className="text-sm text-primary hover:text-primary/80 font-semibold mt-2 block transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 rounded"
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
                  className="text-sm text-primary hover:text-primary/80 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 rounded"
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
