
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { navigationData } from './navigationData';

interface NavigationMenuProps {
  className?: string;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({ className }) => {
  return (
    <nav className={cn('hidden md:flex items-center justify-center space-x-4', className)}>
      {navigationData.map((item) => (
        <div key={item.title} className="relative group">
          <Link
            to={item.href}
            className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors py-2 px-3 text-sm font-medium"
          >
            {item.title}
          </Link>
          
          {item.children && (
            <div className="absolute left-0 mt-1 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black dark:ring-gray-700 ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              {item.children.map((child) => (
                <Link
                  key={child.title}
                  to={child.href}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {child.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};
