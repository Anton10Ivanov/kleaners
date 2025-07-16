import { useEffect, memo } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { HeroForm } from "./HeroForm";
import { HeroProvider } from "./HeroContext";
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
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-muted"
        style={{
          backgroundImage: `url('/lovable-uploads/d0852217-53a8-414a-b080-073eec924014.png')`,
          backgroundSize: 'contain',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      <HeroProvider 
        initialService={selectedService} 
        initialPostalCode={postalCode} 
        onNextStep={handleValidatedNextStep} 
        onServiceChange={setSelectedService} 
        onPostalCodeChange={setPostalCode}
      >
        <HeroForm 
          selectedService={selectedService} 
          setSelectedService={setSelectedService} 
          postalCode={postalCode} 
          setPostalCode={setPostalCode} 
          handleNextStep={handleValidatedNextStep} 
        />
      </HeroProvider>
    </section>
  );
});

Hero.displayName = "Hero";
export default Hero;
