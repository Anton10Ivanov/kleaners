/**
 * Font loading optimization utilities
 * Implements font-display strategies and preloading for optimal font performance
 */

interface FontConfig {
  family: string;
  weight?: string | number;
  style?: 'normal' | 'italic';
  display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
  preload?: boolean;
  fallback?: string[];
}

interface FontLoadingOptions {
  timeout?: number;
  fallbackDelay?: number;
  swapPeriod?: number;
}

class FontOptimizer {
  private loadedFonts = new Set<string>();
  private loadingPromises = new Map<string, Promise<void>>();
  private fallbackTimers = new Map<string, NodeJS.Timeout>();

  /**
   * Preload critical fonts with optimal font-display strategy
   */
  async preloadFonts(fonts: FontConfig[], options: FontLoadingOptions = {}): Promise<void> {
    const { timeout = 3000 } = options;

    const preloadPromises = fonts
      .filter(font => font.preload)
      .map(font => this.preloadFont(font, timeout));

    await Promise.allSettled(preloadPromises);
  }

  /**
   * Preload a single font with timeout
   */
  private async preloadFont(font: FontConfig, timeout: number): Promise<void> {
    const fontKey = this.getFontKey(font);
    
    if (this.loadedFonts.has(fontKey)) {
      return Promise.resolve();
    }

    if (this.loadingPromises.has(fontKey)) {
      return this.loadingPromises.get(fontKey)!;
    }

    const promise = new Promise<void>((resolve, reject) => {
      // Create preload link
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      link.href = this.getFontUrl(font);

      // Set font-display strategy
      if (font.display) {
        link.setAttribute('font-display', font.display);
      }

      const timeoutId = setTimeout(() => {
        reject(new Error(`Font preload timeout: ${fontKey}`));
      }, timeout);

      link.onload = () => {
        clearTimeout(timeoutId);
        this.loadedFonts.add(fontKey);
        resolve();
      };

      link.onerror = () => {
        clearTimeout(timeoutId);
        reject(new Error(`Failed to preload font: ${fontKey}`));
      };

      document.head.appendChild(link);
    });

    this.loadingPromises.set(fontKey, promise);
    return promise;
  }

  /**
   * Load fonts with Font Loading API
   */
  async loadFontsWithAPI(fonts: FontConfig[], options: FontLoadingOptions = {}): Promise<void> {
    if (!('fonts' in document)) {
      console.warn('Font Loading API not supported, falling back to CSS');
      return this.loadFontsWithCSS(fonts);
    }

    const { timeout = 3000 } = options;

    const loadPromises = fonts.map(async (font) => {
      const fontKey = this.getFontKey(font);
      
      if (this.loadedFonts.has(fontKey)) {
        return;
      }

      try {
        const fontFace = new FontFace(
          font.family,
          `url(${this.getFontUrl(font)})`,
          {
            weight: font.weight?.toString() || 'normal',
            style: font.style || 'normal',
            display: font.display || 'swap',
          }
        );

        // Load with timeout
        const loadPromise = fontFace.load();
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error(`Font load timeout: ${fontKey}`)), timeout);
        });

        await Promise.race([loadPromise, timeoutPromise]);
        
        // Add to document fonts
        document.fonts.add(fontFace);
        this.loadedFonts.add(fontKey);

        console.log(`✅ Font loaded: ${fontKey}`);
      } catch (error) {
        console.warn(`❌ Failed to load font: ${fontKey}`, error);
        this.handleFontFallback(font);
      }
    });

    await Promise.allSettled(loadPromises);
  }

  /**
   * Load fonts with CSS (fallback method)
   */
  private async loadFontsWithCSS(fonts: FontConfig[]): Promise<void> {
    const style = document.createElement('style');
    let css = '';

    fonts.forEach(font => {
      const fontKey = this.getFontKey(font);
      
      if (!this.loadedFonts.has(fontKey)) {
        css += `
          @font-face {
            font-family: '${font.family}';
            src: url('${this.getFontUrl(font)}') format('woff2');
            font-weight: ${font.weight || 'normal'};
            font-style: ${font.style || 'normal'};
            font-display: ${font.display || 'swap'};
          }
        `;
        this.loadedFonts.add(fontKey);
      }
    });

    if (css) {
      style.textContent = css;
      document.head.appendChild(style);
    }
  }

  /**
   * Handle font fallback when loading fails
   */
  private handleFontFallback(font: FontConfig): void {
    if (font.fallback && font.fallback.length > 0) {
      // Apply fallback fonts to elements using this font
      const elements = document.querySelectorAll(`[style*="font-family"][style*="${font.family}"]`);
      elements.forEach(el => {
        const element = el as HTMLElement;
        const currentStyle = element.style.fontFamily;
        const fallbackFonts = font.fallback!.join(', ');
        element.style.fontFamily = `${currentStyle}, ${fallbackFonts}`;
      });
    }
  }

  /**
   * Generate font URL (customize based on your font hosting)
   */
  private getFontUrl(font: FontConfig): string {
    // This would typically point to your font hosting service
    // For example: Google Fonts, Adobe Fonts, or self-hosted fonts
    const weight = font.weight || 400;
    const style = font.style === 'italic' ? 'i' : '';
    
    // Example for Google Fonts API v2
    return `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font.family)}:wght@${weight}${style}&display=${font.display || 'swap'}`;
  }

  /**
   * Generate unique font key
   */
  private getFontKey(font: FontConfig): string {
    return `${font.family}-${font.weight || 'normal'}-${font.style || 'normal'}`;
  }

  /**
   * Optimize font loading with critical/non-critical separation
   */
  async optimizeFontLoading(
    criticalFonts: FontConfig[],
    nonCriticalFonts: FontConfig[],
    options: FontLoadingOptions = {}
  ): Promise<void> {
    const { fallbackDelay = 100, swapPeriod = 3000 } = options;

    // Load critical fonts immediately with preload
    const criticalPromise = this.preloadFonts(
      criticalFonts.map(font => ({ ...font, preload: true, display: 'block' })),
      { timeout: fallbackDelay }
    );

    // Load non-critical fonts with swap strategy
    const nonCriticalPromise = this.loadFontsWithAPI(
      nonCriticalFonts.map(font => ({ ...font, display: 'swap' })),
      { timeout: swapPeriod }
    );

    // Wait for critical fonts, then load non-critical
    try {
      await criticalPromise;
    } catch (error) {
      console.warn('Some critical fonts failed to load:', error);
    }

    // Load non-critical fonts in background
    nonCriticalPromise.catch(error => {
      console.warn('Some non-critical fonts failed to load:', error);
    });
  }

  /**
   * Monitor font loading performance
   */
  monitorFontPerformance(): void {
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        const loadTime = performance.now();
        console.log(`🔤 All fonts loaded in ${loadTime.toFixed(2)}ms`);
        
        // Report to analytics
        if ('gtag' in window) {
          (window as any).gtag('event', 'font_load_complete', {
            event_category: 'performance',
            value: Math.round(loadTime),
          });
        }
      });

      // Monitor individual font loads
      document.fonts.addEventListener('loadingdone', (event: any) => {
        event.fontfaces.forEach((fontFace: FontFace) => {
          console.log(`✅ Font loaded: ${fontFace.family}`);
        });
      });

      document.fonts.addEventListener('loadingerror', (event: any) => {
        event.fontfaces.forEach((fontFace: FontFace) => {
          console.warn(`❌ Font failed: ${fontFace.family}`);
        });
      });
    }
  }

  /**
   * Get font loading statistics
   */
  getStats(): {
    loaded: number;
    loading: number;
    failed: number;
    total: number;
  } {
    const loading = this.loadingPromises.size;
    const loaded = this.loadedFonts.size;
    
    return {
      loaded,
      loading,
      failed: 0, // Would track failed loads in a real implementation
      total: loaded + loading,
    };
  }
}

// Singleton instance
export const fontOptimizer = new FontOptimizer();

// Predefined font configurations for common use cases
export const FONT_CONFIGS = {
  // System fonts (no loading required)
  system: {
    family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: 'block' as const,
    preload: false,
  },

  // Popular web fonts
  inter: {
    family: 'Inter',
    weight: '400',
    display: 'swap' as const,
    preload: true,
    fallback: ['system-ui', 'sans-serif'],
  },

  interBold: {
    family: 'Inter',
    weight: '600',
    display: 'swap' as const,
    preload: false,
    fallback: ['system-ui', 'sans-serif'],
  },

  poppins: {
    family: 'Poppins',
    weight: '400',
    display: 'swap' as const,
    preload: true,
    fallback: ['system-ui', 'sans-serif'],
  },

  roboto: {
    family: 'Roboto',
    weight: '400',
    display: 'swap' as const,
    preload: true,
    fallback: ['system-ui', 'sans-serif'],
  },
};

// React hook for font optimization
export function useFontOptimization() {
  const loadCriticalFonts = (fonts: FontConfig[]) => {
    return fontOptimizer.preloadFonts(fonts, { timeout: 1000 });
  };

  const loadAllFonts = (critical: FontConfig[], nonCritical: FontConfig[] = []) => {
    return fontOptimizer.optimizeFontLoading(critical, nonCritical);
  };

  const monitorPerformance = () => {
    fontOptimizer.monitorFontPerformance();
  };

  return {
    loadCriticalFonts,
    loadAllFonts,
    monitorPerformance,
    getStats: () => fontOptimizer.getStats(),
  };
}

// Auto-initialize font optimization
if (typeof window !== 'undefined') {
  // Start monitoring font performance
  fontOptimizer.monitorFontPerformance();

  // Load critical fonts on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Load system fonts and critical web fonts
      const criticalFonts = [FONT_CONFIGS.inter, FONT_CONFIGS.poppins];
      fontOptimizer.optimizeFontLoading(criticalFonts, [FONT_CONFIGS.interBold]);
    });
  } else {
    const criticalFonts = [FONT_CONFIGS.inter, FONT_CONFIGS.poppins];
    fontOptimizer.optimizeFontLoading(criticalFonts, [FONT_CONFIGS.interBold]);
  }
}
