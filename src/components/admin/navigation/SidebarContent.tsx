
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
    <div className="flex h-full flex-col bg-background">
      <div className="px-3 py-4">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Admin Dashboard
        </h2>
        <div className="space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.title}
              variant={activeItem === item.title.toLowerCase() ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => handleNavClick(item.href)}
            >
              {item.icon}
              <span className="ml-2">{item.title}</span>
            </Button>
          ))}
        </div>
      </div>
      <div className="mt-auto px-3 py-4">
        <Separator className="mb-4" />
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:bg-red-500/10 hover:text-red-500"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span className="ml-2">Logout</span>
        </Button>
      </div>
    </div>
  );
};
