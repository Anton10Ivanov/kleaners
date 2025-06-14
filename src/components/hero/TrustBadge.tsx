
import { memo } from "react";
import { motion } from "framer-motion";

interface TrustBadgeProps {
  isMobile: boolean;
}

export const TrustBadge = memo(({ isMobile }: TrustBadgeProps) => {
  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="w-full flex justify-start items-center mt-6 px-2"
      >
        <div id="trustindex-widget" className="trust-badge-container">
          {/* TrustIndex widget will be automatically injected here by the script */}
        </div>
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
      <div id="trustindex-widget" className="trust-badge-container">
        {/* TrustIndex widget will be automatically injected here by the script */}
      </div>
    </motion.div>
  );
});

TrustBadge.displayName = "TrustBadge";
