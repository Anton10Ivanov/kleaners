
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
  const { startTimer, endTimer } = useComponentTimer('Hero');
  const isMobile = useMediaQuery("(max-width: 768px)");
  const imagesLoadedRef = useRef<boolean>(false);

  // Mark Hero as important for Core Web Vitals
  useEffect(() => {
    performanceMonitor.markAsImportant('Hero');
  }, []);

  // Set default service to "regular" when component mounts
  useEffect(() => {
    startTimer('serviceInitialization');
    if (!selectedService) {
      console.log("Setting service to: regular");
      setSelectedService(ServiceType.Regular);
    }
    endTimer('serviceInitialization');
  }, [selectedService, setSelectedService, startTimer, endTimer]);

  // Simplified preloading of the hero image
  useEffect(() => {
    if (imagesLoadedRef.current) return;
    
    startTimer('imagePreloading');
    const imageToPreload = '/lovable-uploads/opciya1 (1) 2.png';
    
    // Create an image element to preload the background
    const img = new Image();
    img.src = imageToPreload;
    // Use high fetchPriority
    img.fetchPriority = 'high';
    
    img.onload = () => {
      endTimer('imagePreloading');
      imagesLoadedRef.current = true;
      console.log("Hero background image preloaded successfully");
    };
    
    img.onerror = () => {
      endTimer('imagePreloading');
      console.error("Failed to preload hero image:", imageToPreload);
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [startTimer, endTimer]);

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
    <section className="relative min-h-[90vh] md:min-h-[85vh] flex items-center justify-center pt-32 pb-12 bg-[#0f172a] text-white transition-colors duration-300 overflow-hidden">
      {/* Background elements with improved z-index layering */}
      <div className="absolute inset-0 z-0">
        <BackgroundElements />
      </div>
      
      {/* Content with higher z-index to appear above background */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
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
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
