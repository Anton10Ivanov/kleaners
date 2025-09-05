
import React, { useEffect, useState } from 'react';

interface PreloadConfig {
  routes: string[];
  priority: 'high' | 'medium' | 'low';
  delay?: number;
}

interface IntelligentPreloaderProps {
  enabled?: boolean;
  config?: PreloadConfig;
}

export const IntelligentPreloader: React.FC<IntelligentPreloaderProps> = ({
  enabled = true,
  config = {
    routes: ['/services', '/booking', '/contact'],
    priority: 'medium',
    delay: 2000
  }
}) => {
  const [preloadedRoutes, setPreloadedRoutes] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!enabled) return;

    const preloadRoute = (route: string) => {
      if (preloadedRoutes.has(route)) return;

      // Create link element for preloading
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = route;
      link.as = 'document';
      
      // Set priority based on config
      if ('fetchPriority' in link) {
        (link as any).fetchPriority = config.priority;
      }

      document.head.appendChild(link);
      
      setPreloadedRoutes(prev => new Set([...prev, route]));
      
      console.log(`Preloaded route: ${route} with priority: ${config.priority}`);
    };

    // Preload routes after delay
    const timer = setTimeout(() => {
      config.routes.forEach(route => {
        preloadRoute(route);
      });
    }, config.delay);

    // Add hover listeners for immediate preloading
    const handleHover = (event: MouseEvent) => {
      const target = event.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.href) {
        const route = new URL(target.href).pathname;
        if (config.routes.includes(route)) {
          preloadRoute(route);
        }
      }
    };

    document.addEventListener('mouseover', handleHover);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseover', handleHover);
    };
  }, [enabled, config, preloadedRoutes]);

  return null; // This component doesn't render anything
};
