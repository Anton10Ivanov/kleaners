import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FeatureList } from "./FeatureList";
import { BookingForm } from "./BookingForm";
import { SocialProof } from "./SocialProof";
export const DesktopHero = memo(() => {
  return <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-3 md:py-8">
      <div className="flex flex-col space-y-6 w-full md:w-[80%] order-2 md:order-1 px-0 mx-0">
        <motion.div initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.4
      }} className="relative z-10 w-full mb-2">
          <motion.span initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.3
        }} className="inline-block text-primary font-medium text-sm md:text-base mb-2">Rated 5* on Google.</motion.span>
          
          <motion.h1 initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.1
        }} className="text-4xl sm:text-5xl leading-tight mb-4 text-left font-extrabold text-[#1c1c1c] lg:text-6xl">
            Book your cleaning <br className="hidden md:block" />
            <span className="text-primary">with one of the most transparent companies in the industry.</span>
          </motion.h1>
          
          <p className="text-lg md:text-xl max-w-md text-slate-600 mb-6">Professional Kleaners, transparent conditions, fair pricing and guaranteed satisfaction.</p>
          
          
        </motion.div>
        
        <div className="w-full mb-2">
          <FeatureList />
        </div>
        
        <motion.div id="booking-form" initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        duration: 0.5,
        delay: 0.2
      }} className="w-full mb-4">
          <BookingForm layout="desktop" />
        </motion.div>
        
        {/* Social proof positioned below the form */}
        <div className="flex mb-4">
          <SocialProof />
        </div>
      </div>
      
      {/* The right side is intentionally left empty as the image is now in the background */}
      <div className="w-full md:w-[20%] order-1 md:order-2 hidden md:block"></div>
    </div>;
});
DesktopHero.displayName = "DesktopHero";