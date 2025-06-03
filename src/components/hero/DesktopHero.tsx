
import { memo } from "react";
import { HeroContent } from "./HeroContent";
import { HeroForm } from "./HeroForm";

interface DesktopHeroProps {
  selectedService: string;
  setSelectedService: (value: string) => void;
  postalCode: string;
  setPostalCode: (value: string) => void;
  handleNextStep: () => void;
}

export const DesktopHero = memo(({
  selectedService,
  setSelectedService,
  postalCode,
  setPostalCode,
  handleNextStep
}: DesktopHeroProps) => {
  return (
    <div className="flex flex-col items-center text-center space-y-12 relative">
      <HeroContent isMobile={false} />
      
      <HeroForm
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        postalCode={postalCode}
        setPostalCode={setPostalCode}
        handleNextStep={handleNextStep}
        isMobile={false}
      />
    </div>
  );
});

DesktopHero.displayName = "DesktopHero";
