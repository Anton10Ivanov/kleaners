/**
 * Advanced resource preloading and prefetching utilities
 * Intelligently preloads critical resources and prefetches likely-needed resources
 

interface PreloadOptions {
  priority?: 'high' | 'low';
  crossOrigin?: 'anonymous' | 'use-credentials';
  integrity?: string;
  timeout?: number;
}

interface PrefetchOptions {
  priority?: 'high' | 'low';
  timeout?: number;
  retries?: number;
}

class ResourcePreloader {
  private preloadedResources = new Set<string>();
  private prefetchedResources = new Set<string>();
  private loadingPromises = new Map<string, Promise<void>>();

  /**
   * Preload critical resources (CSS, fonts, critical images)
   
  preloadResource(url: string, type: 'style' | 'script' | 'font' | 'image', options: PreloadOptions = {}): Promise<void> {
    if (this.preloadedResources.has(url)) {
      return Promise.resolve();
    }

    if (this.loadingPromises.has(url)) {
      return this.loadingPromises.get(url)!;
    }

    const promise = new Promise<void>((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = url;
      link.as = type;
      
      if (options.crossOrigin) {
        link.crossOrigin = options.crossOrigin;
      }
      
      if (options.integrity) {
        link.integrity = options.integrity;
      }

      if (type === 'font') {
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
      }

      const timeout = setTimeout(() => {
        reject(new Error(`Preload timeout for ${url}`));
      }, options.timeout || 10000);

      link.onload = () => {
        clearTimeout(timeout);
        this.preloadedResources.add(url);
        resolve();
      };

      link.onerror = () => {
        clearTimeout(timeout);
        reject(new Error(`Failed to preload ${url}`));
      };

      document.head.appendChild(link);
    });

    this.loadingPromises.set(url, promise);
    return promise;
  }

  /**
   * Prefetch resources that might be needed soon
   
  prefetchResource(url: string, options: PrefetchOptions = {}): Promise<void> {
    if (this.prefetchedResources.has(url)) {
      return Promise.resolve();
    }

    if (this.loadingPromises.has(url)) {
      return this.loadingPromises.get(url)!;
    }

    const promise = new Promise<void>((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;

      const timeout = setTimeout(() => {
        reject(new Error(`Prefetch timeout for ${url}`));
      }, options.timeout || 15000);

      link.onload = () => {
        clearTimeout(timeout);
        this.prefetchedResources.add(url);
        resolve();
      };

      link.onerror = () => {
        clearTimeout(timeout);
        if ((options.retries || 0) > 0) {
          // Retry with reduced retry count
          setTimeout(() => {
            this.prefetchResource(url, { ...options, retries: (options.retries || 0) - 1 })
              .then(resolve)
              .catch(reject);
          }, 1000);
        } else {
          reject(new Error(`Failed to prefetch ${url}`));
        }
      };

      document.head.appendChild(link);
    });

    this.loadingPromises.set(url, promise);
    return promise;
  }

  /**
   * Preload critical CSS files
   
  async preloadCriticalCSS(urls: string[]): Promise<void> {
    const promises = urls.map(url => 
      this.preloadResource(url, 'style', { priority: 'high' })
    );
    await Promise.allSettled(promises);
  }

  /**
   * Preload critical fonts
   
  async preloadCriticalFonts(urls: string[]): Promise<void> {
    const promises = urls.map(url => 
      this.preloadResource(url, 'font', { priority: 'high', crossOrigin: 'anonymous' })
    );
    await Promise.allSettled(promises);
  }

  /**
   * Preload hero images and above-the-fold content
   
  async preloadCriticalImages(urls: string[]): Promise<void> {
    const promises = urls.map(url => 
      this.preloadResource(url, 'image', { priority: 'high' })
    );
    await Promise.allSettled(promises);
  }

  /**
   * Prefetch route-based resources
   
  async prefetchRouteResources(routes: string[]): Promise<void> {
    const promises = routes.map(route => 
      this.prefetchResource(route, { priority: 'low', retries: 2 })
    );
    await Promise.allSettled(promises);
  }

  /**
   * Smart prefetching based on user behavior
   
  enableSmartPrefetching(): void {
    // Prefetch on hover with delay
    document.addEventListener('mouseover', (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href]') as HTMLAnchorElement;
      
      if (link && link.href && link.hostname === window.location.hostname) {
        setTimeout(() => {
          this.prefetchResource(link.href, { priority: 'low' }).catch(() => {
            // Silently fail for prefetch
          });
        }, 100);
      }
    });

    // Prefetch on focus (keyboard navigation)
    document.addEventListener('focusin', (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href]') as HTMLAnchorElement;
      
      if (link && link.href && link.hostname === window.location.hostname) {
        this.prefetchResource(link.href, { priority: 'low' }).catch(() => {
          // Silently fail for prefetch
        });
      }
    });
  }

  /**
   * Preload resources based on viewport intersection
   
  enableIntersectionPrefetching(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const prefetchUrl = element.dataset.prefetch;
          
          if (prefetchUrl) {
            this.prefetchResource(prefetchUrl, { priority: 'low' }).catch(() => {
              // Silently fail for prefetch
            });
            observer.unobserve(element);
          }
        }
      });
    }, {
      rootMargin: '50px',
      threshold: 0.1,
    });

    // Observe elements with data-prefetch attribute
    document.querySelectorAll('[data-prefetch]').forEach((el) => {
      observer.observe(el);
    });
  }

  /**
   * Get preloading statistics
   
  getStats(): { preloaded: number; prefetched: number; loading: number } {
    return {
      preloaded: this.preloadedResources.size,
      prefetched: this.prefetchedResources.size,
      loading: this.loadingPromises.size,
    };
  }

  /**
   * Clear all cached resources
   
  clear(): void {
    this.preloadedResources.clear();
    this.prefetchedResources.clear();
    this.loadingPromises.clear();
  }
}

// Singleton instance
export const resourcePreloader = new ResourcePreloader();

// React hook for resource preloading
export function useResourcePreloader() {
  const preloadCritical = async (resources: { css?: string[]; fonts?: string[]; images?: string[] }) => {
    const promises: Promise<void>[] = [];

    if (resources.css) {
      promises.push(resourcePreloader.preloadCriticalCSS(resources.css));
    }
    
    if (resources.fonts) {
      promises.push(resourcePreloader.preloadCriticalFonts(resources.fonts));
    }
    
    if (resources.images) {
      promises.push(resourcePreloader.preloadCriticalImages(resources.images));
    }

    await Promise.allSettled(promises);
  };

  const prefetchRoutes = (routes: string[]) => {
    return resourcePreloader.prefetchRouteResources(routes);
  };

  const enableSmartPrefetching = () => {
    resourcePreloader.enableSmartPrefetching();
    resourcePreloader.enableIntersectionPrefetching();
  };

  return {
    preloadCritical,
    prefetchRoutes,
    enableSmartPrefetching,
    getStats: () => resourcePreloader.getStats(),
  };
}

// Auto-initialize smart prefetching when DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      resourcePreloader.enableSmartPrefetching();
      resourcePreloader.enableIntersectionPrefetching();
    });
  } else {
    resourcePreloader.enableSmartPrefetching();
    resourcePreloader.enableIntersectionPrefetching();
  }
}
