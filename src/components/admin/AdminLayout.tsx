
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from '@/hooks/use-media-query';
import { SidebarContent } from './navigation/SidebarContent';
import { MobileSidebar } from './navigation/MobileSidebar';
import { useAdminNavigation } from '@/hooks/useAdminNavigation';

const AdminLayout = () => {
  const { 
    activeItem, 
    navItems, 
    isSidebarOpen, 
    setIsSidebarOpen, 
    handleNavClick, 
    handleLogout 
  } = useAdminNavigation();
  
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="hidden w-64 border-r bg-background md:block">
          <SidebarContent
            navItems={navItems}
            activeItem={activeItem}
            handleNavClick={handleNavClick}
            handleLogout={handleLogout}
          />
        </div>
      )}
      
      {/* Mobile Sidebar */}
      {isMobile && (
        <MobileSidebar
          navItems={navItems}
          activeItem={activeItem}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          handleNavClick={handleNavClick}
          handleLogout={handleLogout}
        />
      )}
      
      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Main content header */}
        <header className="border-b bg-background p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">
              {navItems.find(item => item.title.toLowerCase() === activeItem)?.title || 'Admin'}
            </h1>
          </div>
        </header>
        
        {/* Main content area with scrolling */}
        <main className="flex-1 overflow-auto bg-muted/40">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
