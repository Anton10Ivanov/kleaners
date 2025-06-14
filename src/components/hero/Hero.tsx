
import { useEffect, memo, useRef } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { MobileHero } from "./MobileHero";
import { DesktopHero } from "./DesktopHero";
import { HeroProvider } from "./HeroContext";
import { BackgroundElements } from "./BackgroundElements";
import { toast } from "sonner";
import { ServiceType } from "@/schemas/booking";
import { performanceMonitor } from "@/utils/performance";
import { useComponentTimer } from "@/hooks/useComponentTimer";
import environmentUtils from "@/utils/environment";

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
  const {
    startTimer,
    endTimer
  } = useComponentTimer('Hero');
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isPreviewWindow = environmentUtils.isPreviewWindow();

  // Mark Hero as important for Core Web Vitals
  useEffect(() => {
    performanceMonitor.markAsImportant('Hero');

    // Add debug info for preview windows
    if (isPreviewWindow) {
      console.log("Hero: Running in preview window mode");
    }
  }, [isPreviewWindow]);

  // Set default service to "home" when component mounts
  useEffect(() => {
    startTimer('serviceInitialization');
    if (!selectedService) {
      console.log("Setting service to: home");
      setSelectedService(ServiceType.Home);
    }
    endTimer('serviceInitialization');
  }, [selectedService, setSelectedService, startTimer, endTimer]);

  const handleValidatedNextStep = () => {
    startTimer('validateAndNextStep');
    if (!selectedService) {
      toast.error("Please select a service type");
      endTimer('validateAndNextStep');
      return;
    }
    if (!postalCode) {
      toast.error("Please enter your city or area code");
      endTimer('validateAndNextStep');
      return;
    }
    handleNextStep();
    endTimer('validateAndNextStep');
  };

  return (
    <section 
      className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden"
    >
      <BackgroundElements />

      <div 
        className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 z-10"
      >
        <HeroProvider 
          initialService={selectedService} 
          initialPostalCode={postalCode} 
          onNextStep={handleValidatedNextStep} 
          onServiceChange={setSelectedService} 
          onPostalCodeChange={setPostalCode}
        >
          {isMobile ? (
            <MobileHero 
              selectedService={selectedService} 
              setSelectedService={setSelectedService} 
              postalCode={postalCode} 
              setPostalCode={setPostalCode} 
              handleNextStep={handleValidatedNextStep} 
            />
          ) : (
            <DesktopHero 
              selectedService={selectedService} 
              setSelectedService={setSelectedService} 
              postalCode={postalCode} 
              setPostalCode={setPostalCode} 
              handleNextStep={handleValidatedNextStep} 
            />
          )}
        </HeroProvider>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";
export default Hero;
