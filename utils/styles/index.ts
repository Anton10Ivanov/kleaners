
import environmentUtils from '@/utils/environment';

/**
 * Style loading utilities for consistent CSS across environments
 
export const styleUtils = {
  // Check if stylesheets are loaded
  areStylesLoaded: (): boolean => {
    if (environmentUtils.isServerSide()) return false;
    
    const styleSheets = document.styleSheets;
    let loadedCount = 0;
    
    for (let i = 0; i < styleSheets.length; i++) {
      try {
        // Try to access stylesheet rules - this will throw if not loaded
        const rules = styleSheets[i].cssRules || styleSheets[i].rules;
        if (rules && rules.length > 0) {
          loadedCount++;
        }
      } catch (error) {
        // Stylesheet might still be loading
        console.warn('Stylesheet not accessible:', styleSheets[i].href);
      }
    }
    
    return loadedCount > 0;
  },

  // Wait for styles to load
  waitForStyles: (timeout: number = 5000): Promise<boolean> => {
    return new Promise((resolve) => {
      if (environmentUtils.isServerSide()) {
        resolve(false);
        return;
      }

      const startTime = Date.now();
      
      const checkStyles = () => {
        if (styleUtils.areStylesLoaded()) {
          resolve(true);
          return;
        }
        
        if (Date.now() - startTime > timeout) {
          console.warn('Styles loading timeout');
          resolve(false);
          return;
        }
        
        requestAnimationFrame(checkStyles);
      };
      
      checkStyles();
    });
  },

  // Preload critical CSS
  preloadCriticalCSS: (): void => {
    if (environmentUtils.isServerSide()) return;
    
    const criticalStyles = [
      '/src/index.css',
      '/src/styles/globals.css'
    ];
    
    criticalStyles.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      link.onload = () => {
        link.rel = 'stylesheet';
      };
      document.head.appendChild(link);
    });
  },

  // Check for theme consistency
  verifyThemeConsistency: (): boolean => {
    if (environmentUtils.isServerSide()) return true;
    
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    
    // Check if theme classes are applied
    const hasTheme = htmlElement.classList.contains('light') || 
                     htmlElement.classList.contains('dark') ||
                     bodyElement.classList.contains('light') ||
                     bodyElement.classList.contains('dark');
    
    return hasTheme;
  }
};

export default styleUtils;
