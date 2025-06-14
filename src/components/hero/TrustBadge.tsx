
import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TrustBadgeProps {
  isMobile: boolean;
}

export const TrustBadge = memo(({ isMobile }: TrustBadgeProps) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);

  useEffect(() => {
    // Check if the script is already loaded
    const checkScript = () => {
      const widget = document.getElementById('trustindex-widget');
      if (widget && widget.innerHTML.trim() !== '') {
        setScriptLoaded(true);
        return;
      }
      
      // Check if TrustIndex script exists
      const scripts = document.querySelectorAll('script[src*="trustindex"]');
      if (scripts.length === 0) {
        console.warn('TrustIndex script not found');
        setScriptError(true);
        return;
      }
    };

    // Check immediately
    checkScript();

    // Set up a timeout to check for script loading
    const timeout = setTimeout(() => {
      if (!scriptLoaded) {
        console.warn('TrustIndex script timeout');
        setScriptError(true);
      }
    }, 5000);

    // Listen for script load events
    const handleScriptLoad = () => {
      setTimeout(checkScript, 100); // Small delay to let script initialize
    };

    window.addEventListener('load', handleScriptLoad);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('load', handleScriptLoad);
    };
  }, [scriptLoaded]);

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
          <div id="trustindex-widget" className="trust-badge-container">
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
        <div id="trustindex-widget" className="trust-badge-container">
          {/* TrustIndex widget will be automatically injected here by the script */}
        </div>
      )}
    </motion.div>
  );
});

TrustBadge.displayName = "TrustBadge";
