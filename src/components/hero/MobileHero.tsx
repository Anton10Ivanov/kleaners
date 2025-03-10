
import { memo } from "react";
import { motion } from "framer-motion";
import { FeatureBadges } from "./FeatureBadges";
import { BookingForm } from "./BookingForm";
import { SocialProof } from "./SocialProof";

export const MobileHero = memo(() => {
  return (
    <div className="flex flex-col items-center justify-between gap-6 py-6 relative">
      {/* Background image has been removed */}
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full text-center mb-1"
      >
        <SocialProof />
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.1 }} 
          className="font-serif text-3xl md:text-4xl font-bold leading-tight text-zinc-800 mb-3"
        >
          Book your cleaning in 2 minutes
        </motion.h1>
        <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto font-sans">
          Professional local cleaners with transparent, fair pricing
        </p>
      </motion.div>
      
      <div className="w-full mb-2 relative z-10">
        <FeatureBadges />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5, delay: 0.2 }} 
        className="w-full relative z-10 px-1"
      >
        <BookingForm layout="mobile" />
      </motion.div>
    </div>
  );
});

MobileHero.displayName = "MobileHero";
