
import { useEffect, memo } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { MobileHero } from "./MobileHero";
import { DesktopHero } from "./DesktopHero";
import { HeroProvider } from "./HeroContext";
import { BackgroundElements } from "./BackgroundElements";
import { toast } from "sonner";

interface HeroProps {
  selectedService: string;
  setSelectedService: (value: "regular" | "moveInOut" | "business" | "construction") => void;
  postalCode: string;
  setPostalCode: (value: string) => void;
  handleNextStep: () => void;
}

export const Hero = memo(({
  selectedService,
  setSelectedService,
  postalCode,
  setPostalCode,
  handleNextStep
}: HeroProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Set default service to "regular" when component mounts
  useEffect(() => {
    if (!selectedService) {
      setSelectedService("regular");
    }
  }, [selectedService, setSelectedService]);

  const handleValidatedNextStep = () => {
    if (!selectedService) {
      toast.error("Please select a service type");
      return;
    }
    if (!postalCode) {
      toast.error("Please enter your city or area code");
      return;
    }
    handleNextStep();
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col md:flex-row items-center justify-center py-12 bg-white transition-colors duration-300">
      <BackgroundElements />
      
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 bg-theme-green lg:px-[10px]">
        <HeroProvider 
          initialService={selectedService}
          initialPostalCode={postalCode}
          onNextStep={handleValidatedNextStep}
        >
          {isMobile ? <MobileHero /> : <DesktopHero />}
        </HeroProvider>
      </div>
    </div>
  );
});

Hero.displayName = "Hero";

export default Hero;
