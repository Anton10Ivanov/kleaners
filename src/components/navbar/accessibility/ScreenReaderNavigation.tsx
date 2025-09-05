
import React from 'react';

interface ScreenReaderNavigationProps {
  children: React.ReactNode;
}

export const ScreenReaderNavigation: React.FC<ScreenReaderNavigationProps> = ({
  children
}) => {
  return (
    <nav 
      role="navigation" 
      aria-label="Main navigation"
      className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-0 focus-within:left-0 focus-within:z-50 focus-within:bg-white focus-within:p-4 focus-within:shadow-lg"
    >
      <h2 className="sr-only">Navigation Menu</h2>
      <ul className="space-y-2">
        <li><a href="#main-content" className="skip-link">Skip to main content</a></li>
        <li><a href="/services" className="text-primary hover:underline">Services</a></li>
        <li><a href="/booking" className="text-primary hover:underline">Book Now</a></li>
        <li><a href="/contact" className="text-primary hover:underline">Contact</a></li>
      </ul>
      {children}
    </nav>
  );
};

export const SkipToMainLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
    >
      Skip to main content
    </a>
  );
};
