
import { motion } from "framer-motion";

export const FeatureBadges = () => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.3, delay: 0.1 }} 
        className="px-3 py-1 bg-white/80 rounded-full text-sm font-medium flex items-center"
      >
        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mr-2"></div>
        <span className="text-zinc-800">Industry insurances</span>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.3, delay: 0.2 }} 
        className="px-3 py-1 bg-white/80 rounded-full text-sm font-medium flex items-center"
      >
        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mr-2"></div>
        <span className="text-zinc-800">24/6 Support</span>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.3, delay: 0.3 }} 
        className="px-3 py-1 bg-white/80 rounded-full text-sm font-medium flex items-center"
      >
        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mr-2"></div>
        <span className="text-zinc-800">Insured up to 5M€</span>
      </motion.div>
    </div>
  );
};
