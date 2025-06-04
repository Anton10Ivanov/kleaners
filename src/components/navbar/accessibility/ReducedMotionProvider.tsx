
import React, { createContext, useContext, useState, useEffect } from 'react';

interface ReducedMotionContextType {
  prefersReducedMotion: boolean;
  toggleReducedMotion: () => void;
}

const ReducedMotionContext = createContext<ReducedMotionContextType | undefined>(undefined);

export const useReducedMotion = () => {
  const context = useContext(ReducedMotionContext);
  if (context === undefined) {
    throw new Error('useReducedMotion must be used within a ReducedMotionProvider');
  }
  return context;
};

interface ReducedMotionProviderProps {
  children: React.ReactNode;
}

export const ReducedMotionProvider: React.FC<ReducedMotionProviderProps> = ({
  children
}) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for saved preference
    const saved = localStorage.getItem('reduced-motion-preference');
    if (saved) {
      setPrefersReducedMotion(JSON.parse(saved));
    } else {
      // Check for system preference
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  useEffect(() => {
    // Apply reduced motion preference
    if (prefersReducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
    
    // Save preference
    localStorage.setItem('reduced-motion-preference', JSON.stringify(prefersReducedMotion));
  }, [prefersReducedMotion]);

  const toggleReducedMotion = () => {
    setPrefersReducedMotion(prev => !prev);
  };

  return (
    <ReducedMotionContext.Provider value={{ prefersReducedMotion, toggleReducedMotion }}>
      {children}
    </ReducedMotionContext.Provider>
  );
};

export const ReducedMotionToggle: React.FC = () => {
  const { prefersReducedMotion, toggleReducedMotion } = useReducedMotion();

  return (
    <button
      onClick={toggleReducedMotion}
      className="p-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20"
      aria-label={prefersReducedMotion ? 'Enable animations' : 'Reduce motion'}
    >
      {prefersReducedMotion ? '🐌' : '⚡'}
    </button>
  );
};
