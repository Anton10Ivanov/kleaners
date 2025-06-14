
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[70vh] relative">
      {/* Left side - Content and Form */}
      <div className="flex flex-col space-y-8 text-left relative z-10">
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
      
      {/* Right side - Reserved for image background */}
      <div className="hidden lg:block"></div>
    </div>
  );
});

DesktopHero.displayName = "DesktopHero";
