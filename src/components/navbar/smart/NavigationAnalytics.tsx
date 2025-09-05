
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface NavigationEvent {
  type: 'menu_open' | 'menu_item_click' | 'search_query' | 'contextual_click';
  timestamp: number;
  data: Record<string, any>;
}

class NavigationAnalytics {
  private events: NavigationEvent[] = [];
  private isEnabled = process.env.NODE_ENV === 'production';

  track(type: NavigationEvent['type'], data: Record<string, any> = {}) {
    if (!this.isEnabled) return;

    const event: NavigationEvent = {
      type,
      timestamp: Date.now(),
      data: {
        ...data,
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      }
    };

    this.events.push(event);
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Navigation Analytics:', event);
    }

    // In production, send to analytics service
    this.sendToAnalytics(event);
  }

  private sendToAnalytics(event: NavigationEvent) {
    // This would integrate with your analytics service (Google Analytics, Mixpanel, etc.)
    // For now, we'll just store in sessionStorage for demo purposes
    try {
      const stored = sessionStorage.getItem('navigation_analytics') || '[]';
      const events = JSON.parse(stored);
      events.push(event);
      sessionStorage.setItem('navigation_analytics', JSON.stringify(events.slice(-100))); // Keep last 100 events
    } catch (error) {
      console.warn('Failed to store navigation analytics:', error);
    }
  }

  getPopularPaths(): Array<{ path: string; count: number }> {
    const pathCounts = this.events
      .filter(event => event.type === 'menu_item_click')
      .reduce((acc, event) => {
        const path = event.data.href || event.data.path;
        if (path) {
          acc[path] = (acc[path] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(pathCounts)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  getSearchQueries(): Array<{ query: string; count: number }> {
    const queryCounts = this.events
      .filter(event => event.type === 'search_query')
      .reduce((acc, event) => {
        const query = event.data.query;
        if (query) {
          acc[query] = (acc[query] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(queryCounts)
      .map(([query, count]) => ({ query, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }
}

export const navigationAnalytics = new NavigationAnalytics();

interface NavigationAnalyticsProviderProps {
  children: React.ReactNode;
}

export const NavigationAnalyticsProvider: React.FC<NavigationAnalyticsProviderProps> = ({
  children
}) => {
  const location = useLocation();

  // Track page views
  useEffect(() => {
    navigationAnalytics.track('menu_item_click', {
      path: location.pathname,
      search: location.search,
      source: 'direct_navigation'
    });
  }, [location]);

  return <>{children}</>;
};

// Hook for components to track navigation events
export const useNavigationAnalytics = () => {
  return {
    trackMenuOpen: (menuType: string) => {
      navigationAnalytics.track('menu_open', { menuType });
    },
    trackMenuClick: (href: string, label: string, menuType?: string) => {
      navigationAnalytics.track('menu_item_click', { href, label, menuType });
    },
    trackSearch: (query: string, resultCount: number) => {
      navigationAnalytics.track('search_query', { query, resultCount });
    },
    trackContextualClick: (action: string, context: string) => {
      navigationAnalytics.track('contextual_click', { action, context });
    }
  };
};
