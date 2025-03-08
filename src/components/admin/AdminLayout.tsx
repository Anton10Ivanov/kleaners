
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@/hooks/use-media-query';
import { handleApiError } from '@/utils/errorHandling';
import { boolToString } from '@/utils/typeUtils';
import { ErrorSeverity } from '@/schemas/booking';
import { SidebarContent } from './navigation/SidebarContent';
import { MobileSidebar } from './navigation/MobileSidebar';
import { getNavItems } from './navigation/getNavItems';

const AdminLayout = () => {
  const [activeItem, setActiveItem] = useState('admin home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Get nav items
  const navItems = getNavItems();
  
  // Set active nav item based on current location
  useEffect(() => {
    try {
      const pathSegments = location.pathname.split('/');
      const path = pathSegments.length > 2 ? pathSegments[2] : '';
      
      if (path) {
        // Find matching nav item by url path
        const matchingNavItem = navItems.find(item => 
          item.href.includes(`/${path}`)
        );
        
        if (matchingNavItem) {
          setActiveItem(matchingNavItem.title.toLowerCase());
        } else {
          setActiveItem('admin home');
        }
      } else {
        setActiveItem('admin home');
      }
    } catch (error) {
      handleApiError(
        error, 
        "Navigation error occurred", 
        boolToString(true), 
        ErrorSeverity.HIGH
      );
    }
  }, [location, navItems]);
  
  // Handle navigation click
  const handleNavClick = (href: string) => {
    try {
      navigate(href);
      if (isMobile) {
        setIsSidebarOpen(false);
      }
    } catch (error) {
      handleApiError(
        error, 
        "Navigation failed", 
        boolToString(true), 
        ErrorSeverity.HIGH
      );
    }
  };
  
  // Handle logout
  const handleLogout = () => {
    try {
      navigate('/auth/login');
    } catch (error) {
      handleApiError(
        error, 
        "Logout failed", 
        boolToString(true), 
        ErrorSeverity.MEDIUM
      );
    }
  };
  
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
