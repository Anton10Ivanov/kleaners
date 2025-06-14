
import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TrustBadgeProps {
  isMobile: boolean;
}

export const TrustBadge = memo(({ isMobile }: TrustBadgeProps) => {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // Simple timeout to show fallback if TrustIndex doesn't load
    const timer = setTimeout(() => {
      const hasWidget = document.querySelector('.trustindex-widget') || 
                       document.querySelector('[data-trustindex-id]');
      if (!hasWidget) {
        setShowFallback(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Fallback trust badge
  const FallbackBadge = () => (
    <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/90 rounded-lg px-4 py-3 shadow-md border border-gray-200">
      <div className="flex items-center gap-2">
        <div className="flex text-yellow-500">
          {'★★★★★'.split('').map((star, i) => (
            <span key={i} className="text-lg">{star}</span>
          ))}
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">Trusted by 500+ customers</span>
          <span className="text-xs text-gray-500">Excellent service rating</span>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="w-full flex justify-center items-center mt-6"
      >
        {showFallback ? (
          <FallbackBadge />
        ) : (
          <div>
            <div 
              className="trustindex-widget" 
              data-trustindex-widget="86dae104895f1920d366ad96a19"
            ></div>
            <div style={{ display: 'none' }}>
              <FallbackBadge />
            </div>
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
      className="absolute top-[55%] left-8 w-80 max-w-sm z-5 flex justify-start items-center"
    >
      {showFallback ? (
        <FallbackBadge />
      ) : (
        <div>
          <div 
            className="trustindex-widget" 
            data-trustindex-widget="86dae104895f1920d366ad96a19"
          ></div>
          <div style={{ display: 'none' }}>
            <FallbackBadge />
          </div>
        </div>
      )}
    </motion.div>
  );
});

TrustBadge.displayName = "TrustBadge";
