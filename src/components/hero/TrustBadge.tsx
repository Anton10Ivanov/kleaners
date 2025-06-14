
import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TrustBadgeProps {
  isMobile: boolean;
}

export const TrustBadge = memo(({ isMobile }: TrustBadgeProps) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);

  // Create unique ID for each instance
  const widgetId = isMobile ? 'trustindex-widget-mobile' : 'trustindex-widget-desktop';

  useEffect(() => {
    // Check if TrustIndex is available globally
    const checkTrustIndex = () => {
      if (typeof window !== 'undefined' && (window as any).TrustindexCollector) {
        console.log('TrustIndex script loaded successfully');
        setScriptLoaded(true);
        
        // Initialize widget for this specific container
        setTimeout(() => {
          try {
            (window as any).TrustindexCollector.init();
          } catch (error) {
            console.warn('TrustIndex initialization failed:', error);
            setScriptError(true);
          }
        }, 100);
        return true;
      }
      return false;
    };

    // Check immediately
    if (checkTrustIndex()) return;

    // Check if script tag exists
    const scriptExists = document.querySelector('script[src*="trustindex"]');
    if (!scriptExists) {
      console.warn('TrustIndex script not found in DOM');
      setScriptError(true);
      return;
    }

    // Set up interval to check for script loading
    const checkInterval = setInterval(() => {
      if (checkTrustIndex()) {
        clearInterval(checkInterval);
      }
    }, 500);

    // Set timeout for script loading
    const timeout = setTimeout(() => {
      clearInterval(checkInterval);
      if (!scriptLoaded) {
        console.warn('TrustIndex script loading timeout');
        setScriptError(true);
      }
    }, 10000);

    return () => {
      clearInterval(checkInterval);
      clearTimeout(timeout);
    };
  }, [scriptLoaded, widgetId]);

  // Fallback content when script fails to load
  const FallbackBadge = () => (
    <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/80 rounded-lg px-3 py-2 shadow-sm">
      <div className="flex items-center gap-1">
        <span className="text-yellow-500">★★★★★</span>
        <span className="font-medium">Trusted by 500+ customers</span>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="w-full flex justify-start items-center mt-6 px-2"
      >
        {scriptError ? (
          <FallbackBadge />
        ) : (
          <div 
            id={widgetId} 
            className="trust-badge-container"
            data-trustindex-id="86dae104895f1920d366ad96a19"
          >
            {/* TrustIndex widget will be automatically injected here by the script */}
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      className="absolute top-[45%] left-8 w-96 max-w-sm z-5 flex justify-start items-center"
    >
      {scriptError ? (
        <FallbackBadge />
      ) : (
        <div 
          id={widgetId} 
          className="trust-badge-container"
          data-trustindex-id="86dae104895f1920d366ad96a19"
        >
          {/* TrustIndex widget will be automatically injected here by the script */}
        </div>
      )}
    </motion.div>
  );
});

TrustBadge.displayName = "TrustBadge";
