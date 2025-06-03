
import { memo } from "react";
import { motion } from "framer-motion";
import { HeroContent } from "./HeroContent";
import { HeroForm } from "./HeroForm";

interface MobileHeroProps {
  selectedService: string;
  setSelectedService: (value: string) => void;
  postalCode: string;
  setPostalCode: (value: string) => void;
  handleNextStep: () => void;
}

export const MobileHero = memo(({
  selectedService,
  setSelectedService,
  postalCode,
  setPostalCode,
  handleNextStep
}: MobileHeroProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto flex flex-col items-center gap-3 py-3 text-center"
    >
      <HeroContent isMobile={true} />
      
      <HeroForm
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        postalCode={postalCode}
        setPostalCode={setPostalCode}
        handleNextStep={handleNextStep}
        isMobile={true}
      />
    </motion.div>
  );
});

MobileHero.displayName = "MobileHero";
