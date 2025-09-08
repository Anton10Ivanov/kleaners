
import React, { createContext, useContext, useState, useEffect } from 'react';

interface HighContrastContextType {
  isHighContrast: boolean;
  toggleHighContrast: () => void;
}

const HighContrastContext = createContext<HighContrastContextType | undefined>(undefined);

export const useHighContrast = () => {
  const context = useContext(HighContrastContext);
  if (context === undefined) {
    throw new Error('useHighContrast must be used within a HighContrastProvider');
  }
  return context;
};

interface HighContrastProviderProps {
  children: React.ReactNode;
}

export const HighContrastProvider: React.FC<HighContrastProviderProps> = ({
  children
}) => {
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    // Check for saved preference
    const saved = localStorage.getItem('high-contrast-mode');
    if (saved) {
      setIsHighContrast(JSON.parse(saved));
    } else {
      // Check for system preference
      const mediaQuery = window.matchMedia('(prefers-contrast: high)');
      setIsHighContrast(mediaQuery.matches);
      
      const handleChange = (e: MediaQueryListEvent) => {
        setIsHighContrast(e.matches);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  useEffect(() => {
    // Apply high contrast mode
    if (isHighContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    // Save preference
    localStorage.setItem('high-contrast-mode', JSON.stringify(isHighContrast));
  }, [isHighContrast]);

  const toggleHighContrast = () => {
    setIsHighContrast(prev => !prev);
  };

  return (
    <HighContrastContext.Provider value={{ isHighContrast, toggleHighContrast }}>
      {children}
    </HighContrastContext.Provider>
  );
};

export const HighContrastToggle: React.FC = () => {
  const { isHighContrast, toggleHighContrast } = useHighContrast();

  return (
    <button
      onClick={toggleHighContrast}
      className="p-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20"
      aria-label={isHighContrast ? 'Disable high contrast mode' : 'Enable high contrast mode'}
    >
      {isHighContrast ? '🌙' : '☀️'}
    </button>
  );
};
