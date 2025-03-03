
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import UserSidebar from './UserSidebar';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Menu } from 'lucide-react';

export const UserLayout = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {isMobile && (
        <div className="sticky top-0 z-20 w-full p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h1 className="text-lg font-semibold">User Dashboard</h1>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      )}
      
      <div className="flex h-full">
        <UserSidebar isOpen={isMobile ? sidebarOpen : true} onClose={toggleSidebar} />
        
        <main className={`flex-1 ${isMobile ? 'w-full' : 'pl-64'}`}>
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
