
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getNavItems } from '@/components/admin/navigation/getNavItems';
import { NavItem } from '@/components/admin/navigation/NavItem';

export const useAdminNavigation = () => {
  const [activeItem, setActiveItem] = useState('admin home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
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
      console.error("Navigation error occurred", error);
    }
  }, [location, navItems]);
  
  // Handle navigation click
  const handleNavClick = (href: string) => {
    try {
      navigate(href);
      setIsSidebarOpen(false);
    } catch (error) {
      console.error("Navigation failed", error);
    }
  };
  
  // Handle logout
  const handleLogout = () => {
    try {
      navigate('/auth/login');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  
  return {
    activeItem,
    navItems,
    isSidebarOpen,
    setIsSidebarOpen,
    handleNavClick,
    handleLogout
  };
};
