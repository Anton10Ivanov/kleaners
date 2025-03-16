
import { memo } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Star } from "lucide-react";

export const SocialProof = memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex flex-col items-center justify-center text-center"
    >
      <div className="inline-flex items-center gap-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2.5 rounded-full text-sm font-medium text-gray-700 dark:text-white border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow">
        <div className="flex mr-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <span>Trusted by 2300+ Customers</span>
      </div>
    </motion.div>
  );
});

SocialProof.displayName = "SocialProof";
