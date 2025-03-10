
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FeatureBadges } from "./FeatureBadges";
import { BookingForm } from "./BookingForm";

interface MobileHeroProps {
  selectedService: string;
  handleServiceChange: (value: string) => void;
  postalCode: string;
  setPostalCode: (value: string) => void;
  handleNext: () => void;
}

export const MobileHero = ({
  selectedService,
  handleServiceChange,
  postalCode,
  setPostalCode,
  handleNext
}: MobileHeroProps) => {
  return (
    <div className="flex flex-col items-center justify-between gap-6 py-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }} 
        className="w-full"
      >
        <img 
          src="/lovable-uploads/62d7d885-67bd-4c03-9be2-bbcb3836edc1.png" 
          alt="Professional Cleaning Service" 
          className="w-full h-auto object-contain max-w-[280px] mx-auto" 
        />
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
        className="text-3xl font-bold leading-tight text-zinc-950 text-center mb-2"
      >
        We provide transparent prices.
      </motion.h1>
      
      <div className="w-full mb-4">
        <FeatureBadges />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5, delay: 0.2 }} 
        className="w-full"
      >
        <BookingForm 
          selectedService={selectedService}
          handleServiceChange={handleServiceChange}
          postalCode={postalCode}
          setPostalCode={setPostalCode}
          handleNext={handleNext}
          layout="mobile"
        />
      </motion.div>
    </div>
  );
};
