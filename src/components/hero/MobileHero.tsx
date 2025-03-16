
import { memo } from "react";
import { motion } from "framer-motion";
import { FeatureBadges } from "./FeatureBadges";
import { BookingForm } from "./BookingForm";
import { SocialProof } from "./SocialProof";

export const MobileHero = memo(() => {
  return (
    <div className="flex flex-col items-center justify-between gap-3 py-3 relative">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full text-center mb-1"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.1 }} 
          className="text-3xl md:text-4xl font-bold leading-tight text-zinc-800 dark:text-white mb-2"
        >
          Book your cleaning in 2 minutes
        </motion.h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-md mx-auto">
          Professional local cleaners with transparent, fair pricing
        </p>
      </motion.div>
      
      <div className="w-full mb-1 relative z-10">
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
      
      {/* Social proof positioned below the form */}
      <div className="mt-3 w-full flex justify-center">
        <SocialProof />
      </div>
    </div>
  );
});

MobileHero.displayName = "MobileHero";
