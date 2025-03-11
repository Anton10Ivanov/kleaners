
import { useEffect, memo } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { MobileHero } from "./MobileHero";
import { DesktopHero } from "./DesktopHero";
import { HeroProvider } from "./HeroContext";
import { BackgroundElements } from "./BackgroundElements";
import { toast } from "sonner";
import { Service } from "@/schemas/booking";
import { ErrorBoundaryWrapper } from "@/components/provider/ErrorBoundaryWrapper";

interface HeroProps {
  selectedService: string;
  setSelectedService: (value: Service) => void;
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
  console.log("Hero rendering with:", { selectedService, postalCode });
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Set default service to "regular" when component mounts
  useEffect(() => {
    if (!selectedService) {
      console.log("Setting default service to Regular");
      setSelectedService(Service.Regular);
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
    <div className="relative min-h-[90vh] flex flex-col md:flex-row items-center justify-center py-12 bg-white transition-colors duration-300 overflow-hidden">
      <BackgroundElements />
      
      <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-[10px]">
        <ErrorBoundaryWrapper fallbackMessage="Error rendering the booking form">
          <HeroProvider 
            initialService={selectedService}
            initialPostalCode={postalCode}
            onNextStep={handleValidatedNextStep}
            onServiceChange={setSelectedService}
            onPostalCodeChange={setPostalCode}
          >
            {isMobile ? <MobileHero /> : <DesktopHero />}
          </HeroProvider>
        </ErrorBoundaryWrapper>
      </div>
    </div>
  );
});

Hero.displayName = "Hero";

export default Hero;
