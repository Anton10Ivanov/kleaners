
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
    <div className="flex flex-col items-center justify-between gap-6 py-4 relative">
      {/* Background image with gradient overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-15" 
        style={{
          backgroundImage: "url('/lovable-uploads/62d7d885-67bd-4c03-9be2-bbcb3836edc1.png')",
          backgroundSize: "contain",
          backgroundPosition: "center 30%",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
        className="text-3xl font-bold leading-tight text-zinc-950 text-center mb-2 relative z-10"
      >
        We provide transparent prices.
      </motion.h1>
      
      <div className="w-full mb-4 relative z-10">
        <FeatureBadges />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5, delay: 0.2 }} 
        className="w-full relative z-10"
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
