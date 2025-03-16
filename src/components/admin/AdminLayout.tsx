
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@/hooks/use-media-query';
import { handleApiError, ErrorSeverity } from '@/utils/errors';
import { boolToString } from '@/utils/typeUtils';
import { SidebarContent } from './navigation/SidebarContent';
import { MobileSidebar } from './navigation/MobileSidebar';
import { getNavItems } from './navigation/getNavItems';

const AdminLayout = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Get nav items
  const navItems = getNavItems();
  
  // Set active nav item based on current location
  useEffect(() => {
    try {
      const path = location.pathname.split('/')[2] || '';
      
      // Handle the special case for the questions tab
      if (location.pathname === '/admin' && location.search.includes('tab=questions')) {
        setActiveItem('questions');
        return;
      }
      
      if (path) {
        setActiveItem(path);
      } else {
        setActiveItem('dashboard');
      }
    } catch (error) {
      handleApiError(
        error, 
        "Navigation error occurred", 
        boolToString(true), 
        ErrorSeverity.HIGH
      );
    }
  }, [location]);
  
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
    <div className="flex h-screen overflow-hidden bg-theme-lightblue dark:bg-gray-900">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="hidden w-64 border-r bg-white md:block">
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
        <header className="border-b bg-white p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-theme-darkheading">
              {navItems.find(item => item.title.toLowerCase() === activeItem)?.title || 'Dashboard'}
            </h1>
          </div>
        </header>
        
        {/* Main content area with scrolling */}
        <main className="flex-1 overflow-auto bg-theme-lightblue">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
