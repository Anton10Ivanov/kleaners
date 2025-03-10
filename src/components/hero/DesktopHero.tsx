
import { memo } from "react";
import { motion } from "framer-motion";
import { FeatureList } from "./FeatureList";
import { BookingForm } from "./BookingForm";
import { HeroImage } from "./HeroImage";

export const DesktopHero = memo(() => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-4 md:py-8">
      <div className="flex flex-col space-y-8 w-full md:w-1/2 order-2 md:order-1 px-0 mx-0">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }} 
          className="text-4xl sm:text-5xl leading-tight mb-4 text-left font-extrabold text-zinc-950 lg:text-5xl"
        >
          We provide transparent prices.
        </motion.h1>
        
        <div className="w-full">
          <FeatureList />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5, delay: 0.2 }} 
          className="w-full"
        >
          <BookingForm layout="desktop" />
        </motion.div>
      </div>
      
      <HeroImage />
    </div>
  );
});

DesktopHero.displayName = "DesktopHero";
