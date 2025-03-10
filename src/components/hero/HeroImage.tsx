import { memo } from "react";
import { motion } from "framer-motion";

export const HeroImage = memo(() => {
  return (
    <div className="w- md:w-1/2 order-1 md:order-2 mb-8 md:mb-0 flex justify-right md:justify-end">
      <motion.div 
        initial={{ opacity: 0, x: 20 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.5, delay: 0.3 }} 
        className="relative w-full md:w-auto"
      >
        <div className="w-full h-auto md:h-[500px] md:w-[500px]" />
      </motion.div>
    </div>
  );
});

HeroImage.displayName = "HeroImage";
