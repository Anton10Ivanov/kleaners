
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { NavigationProvider } from '../context/NavigationContext';
import { navItems } from '../navigationData';

// Test wrapper component
export const NavigationTestWrapper: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => (
  <BrowserRouter>
    <NavigationProvider navItems={navItems}>
      {children}
    </NavigationProvider>
  </BrowserRouter>
);

// Test utilities for common navigation interactions
export const navigationTestUtils = {
  // Performance testing helpers
  measureRenderTime: (componentName: string) => {
    const startTime = performance.now();
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      console.log(`${componentName} render time: ${duration.toFixed(2)}ms`);
      return duration;
    };
  },

  // Simple interaction helpers
  simulateClick: (element: HTMLElement) => {
    element.click();
  },

  simulateHover: (element: HTMLElement) => {
    const mouseEnterEvent = new MouseEvent('mouseenter', {
      bubbles: true,
      cancelable: true,
    });
    element.dispatchEvent(mouseEnterEvent);
  }
};

// Mock data for testing
export const mockNavigationData = {
  user: {
    id: '1',
    email: 'test@example.com',
    role: 'user'
  },
  navItems: [
    {
      id: 1,
      label: 'Services',
      link: '/services'
    },
    {
      id: 2,
      label: 'Booking',
      link: '/booking'
    }
  ]
};
