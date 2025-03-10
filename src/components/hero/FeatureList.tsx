
import { motion } from "framer-motion";

export const FeatureList = () => {
  return (
    <ul className="grid grid-cols-1 gap-4 w-full mx-0 md:mx-0">
      <motion.li 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.3, delay: 0.1 }} 
        className="flex items-center justify-start gap-3 text-[#8E9196] dark:text-gray-300 font-medium"
      >
        <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0"></div>
        <span className="text-zinc-800">All relevant to the industry insurances</span>
      </motion.li>
      
      <motion.li 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.3, delay: 0.2 }} 
        className="flex items-center justify-start gap-3 text-[#8E9196] dark:text-gray-300 font-medium"
      >
        <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0"></div>
        <span className="text-zinc-800">24/6 Support</span>
      </motion.li>
      
      <motion.li 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.3, delay: 0.3 }} 
        className="flex items-center justify-start gap-3 text-[#8E9196] dark:text-gray-300 font-medium"
      >
        <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0"></div>
        <span className="text-zinc-800">Betriebshaftpflichtversicherung bis zu 5 Mio.€</span>
      </motion.li>
    </ul>
  );
};
