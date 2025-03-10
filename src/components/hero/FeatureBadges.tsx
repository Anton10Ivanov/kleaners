
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export const FeatureBadges = () => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.3, delay: 0.1 }} 
        className="px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium flex items-center shadow-sm border border-gray-100"
      >
        <CheckCircle2 className="w-3.5 h-3.5 text-primary mr-1.5" />
        <span className="text-zinc-800 text-xs">Industry insurances</span>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.3, delay: 0.2 }} 
        className="px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium flex items-center shadow-sm border border-gray-100"
      >
        <CheckCircle2 className="w-3.5 h-3.5 text-primary mr-1.5" />
        <span className="text-zinc-800 text-xs">24/6 Support</span>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.3, delay: 0.3 }} 
        className="px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium flex items-center shadow-sm border border-gray-100"
      >
        <CheckCircle2 className="w-3.5 h-3.5 text-primary mr-1.5" />
        <span className="text-zinc-800 text-xs">Insured up to 5M€</span>
      </motion.div>
    </div>
  );
};
