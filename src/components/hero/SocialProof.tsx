
import { memo } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export const SocialProof = memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex flex-col items-center justify-center text-center"
    >
      <div className="inline-flex items-center gap-1.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 dark:text-white border border-gray-200 dark:border-gray-700 shadow-sm mb-2">
        <CheckCircle className="h-3.5 w-3.5 text-green-500" />
        <span>Trusted by 2300+ Customers</span>
      </div>
    </motion.div>
  );
});

SocialProof.displayName = "SocialProof";
