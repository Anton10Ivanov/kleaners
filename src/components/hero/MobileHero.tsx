
import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FeatureBadges } from "./FeatureBadges";
import { BookingForm } from "./BookingForm";
import { SocialProof } from "./SocialProof";

export const MobileHero = memo(() => {
  return (
    <div className="flex flex-col items-center justify-between gap-4 py-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full text-center mb-2"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-block text-primary font-medium text-sm mb-2"
        >
          Professional Cleaning Services
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.1 }} 
          className="text-3xl md:text-4xl font-bold leading-tight text-[#1c1c1c] mb-3"
        >
          Book your cleaning <span className="text-primary">in 2 minutes</span>
        </motion.h1>
        
        <p className="text-gray-600 text-base max-w-md mx-auto mb-4">
          Professional local cleaners with transparent, fair pricing
        </p>
        
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          onClick={() => document.getElementById('mobile-booking-form')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-orange-600 hover:bg-orange-500 text-white px-5 py-2.5 rounded-xl flex items-center mx-auto mb-6 shadow-[0_8px_15px_rgba(251,146,60,0.2)] hover:shadow-[0_8px_15px_rgba(251,146,60,0.4)]"
        >
          Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
        </motion.button>
      </motion.div>
      
      <div className="w-full mb-2 relative z-10">
        <FeatureBadges />
      </div>
      
      <motion.div 
        id="mobile-booking-form"
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5, delay: 0.2 }} 
        className="w-full relative z-10 px-2"
      >
        <BookingForm layout="mobile" />
      </motion.div>
      
      {/* Social proof positioned below the form */}
      <div className="mt-4 w-full flex justify-center">
        <SocialProof />
      </div>
    </div>
  );
});

MobileHero.displayName = "MobileHero";
