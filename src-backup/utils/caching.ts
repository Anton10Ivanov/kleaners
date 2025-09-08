// Caching utilities for better performance

export interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  maxSize?: number; // Maximum number of items in cache
  storage?: 'memory' | 'localStorage' | 'sessionStorage';
}

export interface CacheItem<T> {
  value: T;
  timestamp: number;
  ttl: number;
}

export class Cache<T = any> {
  private cache = new Map<string, CacheItem<T>>();
  private options: Required<CacheOptions>;

  constructor(options: CacheOptions = {}) {
    this.options = {
      ttl: options.ttl || 5 * 60 * 1000, // 5 minutes default
      maxSize: options.maxSize || 100,
      storage: options.storage || 'memory'
    };
  }

  set(key: string, value: T, ttl?: number): void {
    const item: CacheItem<T> = {
      value,
      timestamp: Date.now(),
      ttl: ttl || this.options.ttl
    };

    // Remove oldest items if cache is full
    if (this.cache.size >= this.options.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }

    this.cache.set(key, item);

    // Persist to storage if configured
    if (this.options.storage !== 'memory') {
      this.persistToStorage(key, item);
    }
  }

  get(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      // Try to load from storage
      if (this.options.storage !== 'memory') {
        const storedItem = this.loadFromStorage(key);
        if (storedItem) {
          this.cache.set(key, storedItem);
          return storedItem.value;
        }
      }
      return null;
    }

    // Check if item has expired
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): boolean {
    const deleted = this.cache.delete(key);
    
    if (this.options.storage !== 'memory') {
      this.removeFromStorage(key);
    }
    
    return deleted;
  }

  clear(): void {
    this.cache.clear();
    
    if (this.options.storage !== 'memory') {
      this.clearStorage();
    }
  }

  size(): number {
    return this.cache.size;
  }

  keys(): string[] {
    return Array.from(this.cache.keys());
  }

  // Clean up expired items
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key);
      }
    }
  }

  private persistToStorage(key: string, item: CacheItem<T>): void {
    try {
      const storage = this.options.storage === 'localStorage' 
        ? localStorage 
        : sessionStorage;
      
      storage.setItem(`cache_${key}`, JSON.stringify(item));
    } catch (error) {
      console.warn('Failed to persist to storage:', error);
    }
  }

  private loadFromStorage(key: string): CacheItem<T> | null {
    try {
      const storage = this.options.storage === 'localStorage' 
        ? localStorage 
        : sessionStorage;
      
      const stored = storage.getItem(`cache_${key}`);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load from storage:', error);
    }
    
    return null;
  }

  private removeFromStorage(key: string): void {
    try {
      const storage = this.options.storage === 'localStorage' 
        ? localStorage 
        : sessionStorage;
      
      storage.removeItem(`cache_${key}`);
    } catch (error) {
      console.warn('Failed to remove from storage:', error);
    }
  }

  private clearStorage(): void {
    try {
      const storage = this.options.storage === 'localStorage' 
        ? localStorage 
        : sessionStorage;
      
      const keys = Object.keys(storage);
      keys.forEach(key => {
        if (key.startsWith('cache_')) {
          storage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear storage:', error);
    }
  }
}

// Global cache instances
export const memoryCache = new Cache({ storage: 'memory' });
export const localStorageCache = new Cache({ 
  storage: 'localStorage',
  ttl: 30 * 60 * 1000, // 30 minutes
  maxSize: 50
});
export const sessionStorageCache = new Cache({ 
  storage: 'sessionStorage',
  ttl: 10 * 60 * 1000, // 10 minutes
  maxSize: 25
});

// Cache decorator for functions
export function cached<T extends (...args: any[]) => any>(
  fn: T,
  options: CacheOptions = {}
): T {
  const cache = new Cache(options);
  
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    const cached = cache.get(key);
    
    if (cached !== null) {
      return cached;
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

// Cache with TTL decorator
export function cachedWithTTL<T extends (...args: any[]) => any>(
  fn: T,
  ttl: number,
  options: Omit<CacheOptions, 'ttl'> = {}
): T {
  return cached(fn, { ...options, ttl });
}

// React hook for caching
export function useCache<T>(
  key: string,
  fetcher: () => Promise<T> | T,
  options: CacheOptions = {}
): {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
} {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);
  
  const cache = React.useMemo(() => new Cache(options), []);
  
  const fetchData = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check cache first
      const cached = cache.get(key);
      if (cached !== null) {
        setData(cached);
        setLoading(false);
        return;
      }
      
      // Fetch data
      const result = await fetcher();
      cache.set(key, result);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [key, fetcher, cache]);
  
  React.useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}

// Cache invalidation utilities
export class CacheInvalidator {
  private caches: Cache[] = [];
  
  register(cache: Cache): void {
    this.caches.push(cache);
  }
  
  invalidate(pattern?: string): void {
    this.caches.forEach(cache => {
      if (pattern) {
        const keys = cache.keys();
        keys.forEach(key => {
          if (key.includes(pattern)) {
            cache.delete(key);
          }
        });
      } else {
        cache.clear();
      }
    });
  }
  
  invalidateByPrefix(prefix: string): void {
    this.caches.forEach(cache => {
      const keys = cache.keys();
      keys.forEach(key => {
        if (key.startsWith(prefix)) {
          cache.delete(key);
        }
      });
    });
  }
}

// Global cache invalidator
export const cacheInvalidator = new CacheInvalidator();

// Register default caches
cacheInvalidator.register(memoryCache);
cacheInvalidator.register(localStorageCache);
cacheInvalidator.register(sessionStorageCache);

// React import
import React from 'react';
