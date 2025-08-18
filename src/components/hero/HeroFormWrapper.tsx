import { memo } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { HeroForm } from "./HeroForm";
import { cn } from "@/lib/utils";

interface HeroFormWrapperProps {
  postalCode: string;
  setPostalCode: (value: string) => void;
  selectedService: string;
  setSelectedService: (value: string) => void;
  handleNextStep: () => void;
}

export const HeroFormWrapper = memo(({
  postalCode,
  setPostalCode,
  selectedService,
  setSelectedService,
  handleNextStep
}: HeroFormWrapperProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <motion.div 
      initial={{
        opacity: 0,
        scale: isMobile ? 0.95 : 1,
        y: isMobile ? 20 : 30
      }} 
      animate={{
        opacity: 1,
        scale: 1,
        y: 0
      }} 
      transition={{
        duration: 0.8,
        delay: isMobile ? 0.1 : 0.7,
        ease: "easeOut"
      }}
      className={cn(
        "backdrop-blur-sm rounded-3xl shadow-2xl border transition-all duration-300",
        isMobile 
          ? "w-full bg-card/95 border-border p-8 mt-8" 
          : "absolute top-[15%] left-8 transform w-96 max-w-sm border-white/20 p-8 z-10 py-0 px-[28px] bg-transparent"
      )}
    >
      <HeroForm
        postalCode={postalCode}
        setPostalCode={setPostalCode}
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        handleNextStep={handleNextStep}
      />
    </motion.div>
  );
});

HeroFormWrapper.displayName = "HeroFormWrapper";