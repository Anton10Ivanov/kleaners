
import { memo } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export const SocialProof = memo(() => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5, delay: 0.3 }} 
      className="flex flex-col items-center justify-center text-center"
    >
      <div className="inline-flex items-center gap-1.5 bg-white/70 backdrop-blur-sm text-[#1c1c1c] font-medium rounded-full text-sm shadow-sm px-[8px] py-0">
        <div className="flex mr-1">
          {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-4 w-4 fill-muted-gold text-muted-gold" />)}
        </div>
        <span>Trusted by 2300+ Customers</span>
      </div>
    </motion.div>
  );
});

SocialProof.displayName = "SocialProof";
