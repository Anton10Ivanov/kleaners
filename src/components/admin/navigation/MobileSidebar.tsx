
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { SidebarContent } from './SidebarContent';
import { NavItem } from './NavItem';

interface MobileSidebarProps {
  navItems: NavItem[];
  activeItem: string;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  handleNavClick: (href: string) => void;
  handleLogout: () => void;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({
  navItems,
  activeItem,
  isSidebarOpen,
  setIsSidebarOpen,
  handleNavClick,
  handleLogout,
}) => {
  return (
    <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-4 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SidebarContent
          navItems={navItems}
          activeItem={activeItem}
          handleNavClick={handleNavClick}
          handleLogout={handleLogout}
        />
      </SheetContent>
    </Sheet>
  );
};
