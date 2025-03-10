
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
        <img 
          src="/lovable-uploads/62d7d885-67bd-4c03-9be2-bbcb3836edc1.png" 
          alt="Professional Cleaning Service" 
          className="w-full h-auto object-contain md:max-w-[500px] mx-auto" 
        />
      </motion.div>
    </div>
  );
});

HeroImage.displayName = "HeroImage";
