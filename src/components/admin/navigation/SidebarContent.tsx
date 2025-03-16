
import React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { NavItem } from './NavItem';

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
  return (
    <div className="w-full bg-background py-2 border-b">
      <div className="container mx-auto">
        <div className="flex flex-row justify-between items-center">
          <div className="flex items-center">
            <h2 className="mr-4 text-lg font-semibold tracking-tight">
              Admin Dashboard
            </h2>
            <div className="flex flex-row overflow-x-auto">
              {navItems.map((item) => (
                <Button
                  key={item.title}
                  variant={activeItem === item.title.toLowerCase() ? "secondary" : "ghost"}
                  className="mr-1"
                  onClick={() => handleNavClick(item.href)}
                >
                  {item.icon}
                  <span className="ml-2">{item.title}</span>
                </Button>
              ))}
            </div>
          </div>
          <Button
            variant="ghost"
            className="text-red-500 hover:bg-red-500/10 hover:text-red-500"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            <span className="ml-2">Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
