import { getCLS, getFID, getFCP, getLCP, getTTFB, Metric } from 'web-vitals';

interface PerformanceMetrics {
  cls: number | null;
  fid: number | null;
  fcp: number | null;
  lcp: number | null;
  ttfb: number | null;
}

class WebVitalsMonitor {
  private metrics: PerformanceMetrics = {
    cls: null,
    fid: null,
    fcp: null,
    lcp: null,
    ttfb: null,
  };

  private onMetric = (metric: Metric) => {
    // Store the metric
    this.metrics[metric.name.toLowerCase() as keyof PerformanceMetrics] = metric.value;
    
    // Log in development
    if (process.env.NODE_ENV === 'development') {
      // Development logging removed - use proper monitoring in production
    }

    // Send to analytics service in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics(metric);
    }
  };

  private sendToAnalytics(metric: Metric) {
    // In a real implementation, send to your analytics service
    // Example: Google Analytics, DataDog, etc.
    
    // For now, we'll use a simple beacon API call
    if ('sendBeacon' in navigator) {
      const body = JSON.stringify({
        name: metric.name,
        value: metric.value,
        id: metric.id,
        delta: metric.delta,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      });

      navigator.sendBeacon('/api/analytics/web-vitals', body);
    }
  }

  public init() {
    // Initialize Core Web Vitals monitoring
    getCLS(this.onMetric);
    getFID(this.onMetric);
    getFCP(this.onMetric);
    getLCP(this.onMetric);
    getTTFB(this.onMetric);
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public getScore(): { score: number; grade: string } {
    const { cls, fid, fcp, lcp, ttfb } = this.metrics;
    
    let score = 0;
    let count = 0;

    // CLS scoring (lower is better)
    if (cls !== null) {
      if (cls <= 0.1) score += 100;
      else if (cls <= 0.25) score += 75;
      else score += 50;
      count++;
    }

    // FID scoring (lower is better)
    if (fid !== null) {
      if (fid <= 100) score += 100;
      else if (fid <= 300) score += 75;
      else score += 50;
      count++;
    }

    // FCP scoring (lower is better)
    if (fcp !== null) {
      if (fcp <= 1800) score += 100;
      else if (fcp <= 3000) score += 75;
      else score += 50;
      count++;
    }

    // LCP scoring (lower is better)
    if (lcp !== null) {
      if (lcp <= 2500) score += 100;
      else if (lcp <= 4000) score += 75;
      else score += 50;
      count++;
    }

    // TTFB scoring (lower is better)
    if (ttfb !== null) {
      if (ttfb <= 800) score += 100;
      else if (ttfb <= 1800) score += 75;
      else score += 50;
      count++;
    }

    const avgScore = count > 0 ? score / count : 0;
    
    let grade = 'F';
    if (avgScore >= 90) grade = 'A';
    else if (avgScore >= 80) grade = 'B';
    else if (avgScore >= 70) grade = 'C';
    else if (avgScore >= 60) grade = 'D';

    return { score: Math.round(avgScore), grade };
  }
}

// Create singleton instance
export const webVitalsMonitor = new WebVitalsMonitor();

// Auto-initialize in browser environment
if (typeof window !== 'undefined') {
  webVitalsMonitor.init();
}

export default webVitalsMonitor;
