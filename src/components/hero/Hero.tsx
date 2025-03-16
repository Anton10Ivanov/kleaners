
import { useEffect, memo } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { MobileHero } from "./MobileHero";
import { DesktopHero } from "./DesktopHero";
import { HeroProvider } from "./HeroContext";
import { BackgroundElements } from "./BackgroundElements";
import { toast } from "sonner";
import { Service } from "@/types/enums";
import { ServiceType } from "@/schemas/booking";

interface HeroProps {
  selectedService: string;
  setSelectedService: (value: string) => void;
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
      setSelectedService(ServiceType.Regular);
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
    <div className="relative min-h-[90vh] flex flex-col md:flex-row items-center justify-center py-12 bg-theme-lightblue transition-colors duration-300 overflow-hidden">
      <BackgroundElements />
      
      <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-[10px]">
        <HeroProvider 
          initialService={selectedService}
          initialPostalCode={postalCode}
          onNextStep={handleValidatedNextStep}
          onServiceChange={setSelectedService}
          onPostalCodeChange={setPostalCode}
        >
          {isMobile ? <MobileHero /> : <DesktopHero />}
        </HeroProvider>
      </div>
    </div>
  );
});

Hero.displayName = "Hero";

export default Hero;
