
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

// Custom render function for navigation components
export const renderWithNavigation = (ui: React.ReactElement) => {
  return render(ui, { wrapper: NavigationTestWrapper });
};

// Test utilities for common navigation interactions
export const navigationTestUtils = {
  // Test menu opening/closing
  async testMenuToggle(menuButton: HTMLElement) {
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    
    fireEvent.click(menuButton);
    await waitFor(() => {
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });
    
    fireEvent.click(menuButton);
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  },

  // Test keyboard navigation
  async testKeyboardNavigation(element: HTMLElement) {
    element.focus();
    expect(document.activeElement).toBe(element);
    
    fireEvent.keyDown(element, { key: 'Enter' });
    fireEvent.keyDown(element, { key: ' ' });
    fireEvent.keyDown(element, { key: 'Escape' });
  },

  // Test touch interactions
  testTouchInteractions(element: HTMLElement) {
    fireEvent.touchStart(element);
    fireEvent.touchEnd(element);
  },

  // Performance testing helpers
  measureRenderTime: (componentName: string) => {
    const startTime = performance.now();
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      console.log(`${componentName} render time: ${duration.toFixed(2)}ms`);
      return duration;
    };
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
