
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center min-h-[80vh] relative py-12">
      {/* Left side - Content and Form */}
      <div className="lg:col-span-7 flex flex-col space-y-12 text-left relative z-10 pr-8">
        <HeroContent isMobile={false} />
        
        <div className="flex justify-start">
          <HeroForm
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            postalCode={postalCode}
            setPostalCode={setPostalCode}
            handleNextStep={handleNextStep}
            isMobile={false}
          />
        </div>
      </div>
      
      {/* Right side - Reserved for background image */}
      <div className="lg:col-span-5 hidden lg:block relative">
        {/* This space allows the background image to show through */}
      </div>
    </div>
  );
});

DesktopHero.displayName = "DesktopHero";
