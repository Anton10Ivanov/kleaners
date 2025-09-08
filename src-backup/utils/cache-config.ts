/**
 * Advanced Caching Configuration
 * Implements comprehensive caching strategies for optimal performance
 */

export interface CacheConfig {
  // React Query cache configuration
  queryClient: {
    staleTime: number;
    gcTime: number;
    retry: number;
    retryDelay: (attemptIndex: number) => number;
  };
  
  // Service Worker cache configuration
  serviceWorker: {
    cacheName: string;
    maxAge: number;
    maxEntries: number;
  };
  
  // Local Storage cache configuration
  localStorage: {
    prefix: string;
    maxAge: number;
    maxSize: number;
  };
  
  // Memory cache configuration
  memory: {
    maxSize: number;
    ttl: number;
  };
}

export const cacheConfig: CacheConfig = {
  queryClient: {
    // Data is considered fresh for 5 minutes
    staleTime: 5 * 60 * 1000, // 5 minutes
    
    // Data stays in cache for 10 minutes after becoming unused
    gcTime: 10 * 60 * 1000, // 10 minutes
    
    // Retry failed requests up to 3 times
    retry: 3,
    
    // Exponential backoff for retries
    retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
  },
  
  serviceWorker: {
    cacheName: 'kleaners-cache-v1',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    maxEntries: 100,
  },
  
  localStorage: {
    prefix: 'kleaners_',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    maxSize: 5 * 1024 * 1024, // 5MB
  },
  
  memory: {
    maxSize: 50, // Maximum 50 items
    ttl: 5 * 60 * 1000, // 5 minutes
  },
};

/**
 * Cache key generators for consistent key naming
 */
export const cacheKeys = {
  // User data
  user: (id: string) => `user:${id}`,
  userProfile: (id: string) => `userProfile:${id}`,
  
  // Service data
  services: () => 'services:all',
  service: (id: string) => `service:${id}`,
  serviceCategories: () => 'serviceCategories:all',
  
  // Booking data
  bookings: (userId: string) => `bookings:${userId}`,
  booking: (id: string) => `booking:${id}`,
  
  // Provider data
  providers: () => 'providers:all',
  provider: (id: string) => `provider:${id}`,
  providerBookings: (providerId: string) => `providerBookings:${providerId}`,
  
  // Admin data
  adminStats: () => 'adminStats:all',
  adminBookings: () => 'adminBookings:all',
  adminUsers: () => 'adminUsers:all',
  
  // Settings and preferences
  userSettings: (userId: string) => `userSettings:${userId}`,
  appConfig: () => 'appConfig:all',
} as const;

/**
 * Cache invalidation patterns
 */
export const cacheInvalidation = {
  // Invalidate all user-related data
  invalidateUser: (userId: string) => [
    cacheKeys.user(userId),
    cacheKeys.userProfile(userId),
    cacheKeys.bookings(userId),
    cacheKeys.userSettings(userId),
  ],
  
  // Invalidate all booking-related data
  invalidateBookings: () => [
    'bookings:*',
    'adminBookings:*',
    'providerBookings:*',
  ],
  
  // Invalidate all service-related data
  invalidateServices: () => [
    cacheKeys.services(),
    cacheKeys.serviceCategories(),
    'service:*',
  ],
  
  // Invalidate all admin data
  invalidateAdmin: () => [
    cacheKeys.adminStats(),
    cacheKeys.adminBookings(),
    cacheKeys.adminUsers(),
  ],
} as const;

/**
 * Cache performance monitoring
 */
export class CachePerformanceMonitor {
  private static instance: CachePerformanceMonitor;
  private metrics: Map<string, { hits: number; misses: number; size: number }> = new Map();
  
  static getInstance(): CachePerformanceMonitor {
    if (!CachePerformanceMonitor.instance) {
      CachePerformanceMonitor.instance = new CachePerformanceMonitor();
    }
    return CachePerformanceMonitor.instance;
  }
  
  recordHit(key: string): void {
    const existing = this.metrics.get(key) || { hits: 0, misses: 0, size: 0 };
    this.metrics.set(key, { ...existing, hits: existing.hits + 1 });
  }
  
  recordMiss(key: string): void {
    const existing = this.metrics.get(key) || { hits: 0, misses: 0, size: 0 };
    this.metrics.set(key, { ...existing, misses: existing.misses + 1 });
  }
  
  recordSize(key: string, size: number): void {
    const existing = this.metrics.get(key) || { hits: 0, misses: 0, size: 0 };
    this.metrics.set(key, { ...existing, size });
  }
  
  getMetrics(): Map<string, { hits: number; misses: number; size: number; hitRate: number }> {
    const result = new Map();
    for (const [key, metrics] of this.metrics.entries()) {
      const total = metrics.hits + metrics.misses;
      const hitRate = total > 0 ? (metrics.hits / total) * 100 : 0;
      result.set(key, { ...metrics, hitRate });
    }
    return result;
  }
  
  getOverallHitRate(): number {
    let totalHits = 0;
    let totalRequests = 0;
    
    for (const metrics of this.metrics.values()) {
      totalHits += metrics.hits;
      totalRequests += metrics.hits + metrics.misses;
    }
    
    return totalRequests > 0 ? (totalHits / totalRequests) * 100 : 0;
  }
  
  reset(): void {
    this.metrics.clear();
  }
}

export const cacheMonitor = CachePerformanceMonitor.getInstance();
