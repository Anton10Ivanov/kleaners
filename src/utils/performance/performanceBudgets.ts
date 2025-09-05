/**
 * Performance budgets and monitoring alerts
 * Tracks key performance metrics and alerts when budgets are exceeded
 */

interface PerformanceBudget {
  metric: string;
  budget: number;
  unit: 'ms' | 'kb' | 'score' | 'count';
  threshold: 'error' | 'warning';
  description: string;
}

interface PerformanceAlert {
  metric: string;
  actual: number;
  budget: number;
  severity: 'error' | 'warning';
  timestamp: number;
  message: string;
}

interface BundleAnalysis {
  totalSize: number;
  jsSize: number;
  cssSize: number;
  imageSize: number;
  fontSize: number;
  chunkCount: number;
}

class PerformanceBudgetMonitor {
  private budgets: PerformanceBudget[] = [
    // Core Web Vitals budgets
    { metric: 'LCP', budget: 2500, unit: 'ms', threshold: 'error', description: 'Largest Contentful Paint' },
    { metric: 'FID', budget: 100, unit: 'ms', threshold: 'error', description: 'First Input Delay' },
    { metric: 'CLS', budget: 0.1, unit: 'score', threshold: 'error', description: 'Cumulative Layout Shift' },
    { metric: 'FCP', budget: 1800, unit: 'ms', threshold: 'warning', description: 'First Contentful Paint' },
    { metric: 'TTFB', budget: 800, unit: 'ms', threshold: 'warning', description: 'Time to First Byte' },
    
    // Bundle size budgets
    { metric: 'totalBundle', budget: 500, unit: 'kb', threshold: 'error', description: 'Total bundle size' },
    { metric: 'jsBundle', budget: 350, unit: 'kb', threshold: 'error', description: 'JavaScript bundle size' },
    { metric: 'cssBundle', budget: 50, unit: 'kb', threshold: 'warning', description: 'CSS bundle size' },
    { metric: 'imageAssets', budget: 1000, unit: 'kb', threshold: 'warning', description: 'Image assets size' },
    { metric: 'fontAssets', budget: 100, unit: 'kb', threshold: 'warning', description: 'Font assets size' },
    
    // Performance metrics
    { metric: 'domNodes', budget: 1500, unit: 'count', threshold: 'warning', description: 'DOM node count' },
    { metric: 'httpRequests', budget: 50, unit: 'count', threshold: 'warning', description: 'HTTP request count' },
    { metric: 'memoryUsage', budget: 50, unit: 'kb', threshold: 'error', description: 'Memory usage (MB)' },
  ];

  private alerts: PerformanceAlert[] = [];
  private observers: PerformanceObserver[] = [];
  private isMonitoring = false;

  /**
   * Start monitoring performance metrics
   */
  startMonitoring(): void {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.setupPerformanceObservers();
    this.monitorBundleSize();
    this.monitorDOMMetrics();
    this.monitorMemoryUsage();
    
    console.log('🎯 Performance budget monitoring started');
  }

  /**
   * Stop monitoring
   */
  stopMonitoring(): void {
    this.isMonitoring = false;
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    
    console.log('🎯 Performance budget monitoring stopped');
  }

  /**
   * Setup performance observers for Core Web Vitals
   */
  private setupPerformanceObservers(): void {
    // LCP Observer
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          if (lastEntry) {
            this.checkBudget('LCP', lastEntry.startTime);
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      } catch (e) {
        console.warn('LCP observer not supported');
      }

      // FID Observer
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            this.checkBudget('FID', entry.processingStart - entry.startTime);
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.push(fidObserver);
      } catch (e) {
        console.warn('FID observer not supported');
      }

      // CLS Observer
      try {
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          if (clsValue > 0) {
            this.checkBudget('CLS', clsValue);
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(clsObserver);
      } catch (e) {
        console.warn('CLS observer not supported');
      }

      // Navigation timing
      try {
        const navObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            // FCP
            if (entry.name === 'first-contentful-paint') {
              this.checkBudget('FCP', entry.startTime);
            }
            // TTFB
            if (entry.responseStart) {
              this.checkBudget('TTFB', entry.responseStart - entry.fetchStart);
            }
          });
        });
        navObserver.observe({ entryTypes: ['navigation', 'paint'] });
        this.observers.push(navObserver);
      } catch (e) {
        console.warn('Navigation observer not supported');
      }
    }
  }

  /**
   * Monitor bundle size (simulated - in real app would come from build process)
   */
  private async monitorBundleSize(): Promise<void> {
    try {
      // In a real app, this would come from webpack-bundle-analyzer or similar
      const bundleAnalysis = await this.analyzeBundleSize();
      
      this.checkBudget('totalBundle', bundleAnalysis.totalSize);
      this.checkBudget('jsBundle', bundleAnalysis.jsSize);
      this.checkBudget('cssBundle', bundleAnalysis.cssSize);
      this.checkBudget('imageAssets', bundleAnalysis.imageSize);
      this.checkBudget('fontAssets', bundleAnalysis.fontSize);
    } catch (error) {
      console.warn('Bundle size analysis failed:', error);
    }
  }

  /**
   * Analyze bundle size (simulated)
   */
  private async analyzeBundleSize(): Promise<BundleAnalysis> {
    // In a real app, this would integrate with build tools
    // For now, we'll estimate based on loaded resources
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    let jsSize = 0;
    let cssSize = 0;
    let imageSize = 0;
    let fontSize = 0;
    
    resources.forEach(resource => {
      const size = resource.transferSize || 0;
      
      if (resource.name.includes('.js')) {
        jsSize += size;
      } else if (resource.name.includes('.css')) {
        cssSize += size;
      } else if (resource.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) {
        imageSize += size;
      } else if (resource.name.match(/\.(woff|woff2|ttf|otf)$/)) {
        fontSize += size;
      }
    });

    const totalSize = jsSize + cssSize + imageSize + fontSize;
    
    return {
      totalSize: Math.round(totalSize / 1024), // Convert to KB
      jsSize: Math.round(jsSize / 1024),
      cssSize: Math.round(cssSize / 1024),
      imageSize: Math.round(imageSize / 1024),
      fontSize: Math.round(fontSize / 1024),
      chunkCount: resources.filter(r => r.name.includes('.js')).length,
    };
  }

  /**
   * Monitor DOM metrics
   */
  private monitorDOMMetrics(): void {
    const checkDOMMetrics = () => {
      const domNodeCount = document.querySelectorAll('*').length;
      this.checkBudget('domNodes', domNodeCount);
      
      const httpRequestCount = performance.getEntriesByType('resource').length;
      this.checkBudget('httpRequests', httpRequestCount);
    };

    // Check immediately and then periodically
    checkDOMMetrics();
    setInterval(checkDOMMetrics, 30000); // Every 30 seconds
  }

  /**
   * Monitor memory usage
   */
  private monitorMemoryUsage(): void {
    if ('memory' in performance) {
      const checkMemory = () => {
        const memory = (performance as any).memory;
        const usedMB = memory.usedJSHeapSize / (1024 * 1024);
        this.checkBudget('memoryUsage', usedMB);
      };

      checkMemory();
      setInterval(checkMemory, 60000); // Every minute
    }
  }

  /**
   * Check if a metric exceeds its budget
   */
  private checkBudget(metric: string, value: number): void {
    const budget = this.budgets.find(b => b.metric === metric);
    if (!budget) return;

    if (value > budget.budget) {
      const alert: PerformanceAlert = {
        metric,
        actual: value,
        budget: budget.budget,
        severity: budget.threshold,
        timestamp: Date.now(),
        message: `${budget.description} exceeded budget: ${value.toFixed(2)}${budget.unit} > ${budget.budget}${budget.unit}`,
      };

      this.alerts.push(alert);
      this.triggerAlert(alert);
    }
  }

  /**
   * Trigger alert notification
   */
  private triggerAlert(alert: PerformanceAlert): void {
    const emoji = alert.severity === 'error' ? '🚨' : '⚠️';
    const color = alert.severity === 'error' ? 'color: red' : 'color: orange';
    
    console.warn(`%c${emoji} Performance Budget Alert: ${alert.message}`, color);

    // In a real app, you might:
    // - Send to analytics service
    // - Show user notification
    // - Send to monitoring service like DataDog, New Relic, etc.
    // - Trigger automated actions

    // Optional: Show user-facing notification for critical errors
    if (alert.severity === 'error' && this.shouldShowUserNotification(alert)) {
      this.showUserNotification(alert);
    }
  }

  /**
   * Determine if user should see notification
   */
  private shouldShowUserNotification(alert: PerformanceAlert): boolean {
    // Only show for critical metrics that affect user experience
    const criticalMetrics = ['LCP', 'FID', 'CLS'];
    return criticalMetrics.includes(alert.metric);
  }

  /**
   * Show user-facing notification
   */
  private showUserNotification(alert: PerformanceAlert): void {
    // Create a subtle notification for performance issues
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #fee2e2;
      border: 1px solid #fecaca;
      color: #991b1b;
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 14px;
      z-index: 10000;
      max-width: 300px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    `;
    
    notification.innerHTML = `
      <div style="font-weight: 600; margin-bottom: 4px;">Performance Issue Detected</div>
      <div style="font-size: 12px;">The page is loading slower than expected. Our team has been notified.</div>
    `;

    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 5000);
  }

  /**
   * Get current performance report
   */
  getPerformanceReport(): {
    budgets: PerformanceBudget[];
    alerts: PerformanceAlert[];
    summary: {
      totalAlerts: number;
      errorAlerts: number;
      warningAlerts: number;
      worstMetric: string | null;
    };
  } {
    const errorAlerts = this.alerts.filter(a => a.severity === 'error');
    const warningAlerts = this.alerts.filter(a => a.severity === 'warning');
    
    // Find worst performing metric
    const worstAlert = this.alerts
      .filter(a => a.severity === 'error')
      .sort((a, b) => (b.actual / b.budget) - (a.actual / a.budget))[0];

    return {
      budgets: this.budgets,
      alerts: this.alerts,
      summary: {
        totalAlerts: this.alerts.length,
        errorAlerts: errorAlerts.length,
        warningAlerts: warningAlerts.length,
        worstMetric: worstAlert?.metric || null,
      },
    };
  }

  /**
   * Clear all alerts
   */
  clearAlerts(): void {
    this.alerts = [];
  }

  /**
   * Update budget for a specific metric
   */
  updateBudget(metric: string, budget: number): void {
    const budgetItem = this.budgets.find(b => b.metric === metric);
    if (budgetItem) {
      budgetItem.budget = budget;
      console.log(`Updated budget for ${metric}: ${budget}${budgetItem.unit}`);
    }
  }

  /**
   * Add custom budget
   */
  addCustomBudget(budget: PerformanceBudget): void {
    this.budgets.push(budget);
  }
}

// Singleton instance
export const performanceBudgetMonitor = new PerformanceBudgetMonitor();

// React hook for performance budget monitoring
export function usePerformanceBudgets() {
  const startMonitoring = () => performanceBudgetMonitor.startMonitoring();
  const stopMonitoring = () => performanceBudgetMonitor.stopMonitoring();
  const getReport = () => performanceBudgetMonitor.getPerformanceReport();
  const clearAlerts = () => performanceBudgetMonitor.clearAlerts();
  
  return {
    startMonitoring,
    stopMonitoring,
    getReport,
    clearAlerts,
    updateBudget: performanceBudgetMonitor.updateBudget.bind(performanceBudgetMonitor),
    addCustomBudget: performanceBudgetMonitor.addCustomBudget.bind(performanceBudgetMonitor),
  };
}

// Auto-start monitoring in production
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  // Start monitoring after page load
  if (document.readyState === 'complete') {
    performanceBudgetMonitor.startMonitoring();
  } else {
    window.addEventListener('load', () => {
      performanceBudgetMonitor.startMonitoring();
    });
  }
}
