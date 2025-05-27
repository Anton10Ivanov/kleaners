
import { useEffect, memo, useRef } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { MobileHero } from "./MobileHero";
import { DesktopHero } from "./DesktopHero";
import { BookingSection } from "./BookingSection";
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
  const { startTimer, endTimer } = useComponentTimer('Hero');
  const isMobile = useMediaQuery("(max-width: 768px)");
  const imagesLoadedRef = useRef<boolean>(false);
  const isPreviewWindow = environmentUtils.isPreviewWindow();

  // Mark Hero as important for Core Web Vitals
  useEffect(() => {
    performanceMonitor.markAsImportant('Hero');
    
    // Add debug info for preview windows
    if (isPreviewWindow) {
      console.log("Hero: Running in preview window mode");
    }
  }, [isPreviewWindow]);

  // Set default service to "regular" when component mounts
  useEffect(() => {
    startTimer('serviceInitialization');
    if (!selectedService) {
      console.log("Setting service to: regular");
      setSelectedService(ServiceType.Regular);
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
    <>
      {/* Hero Text Section - Optimized structure with full width */}
      <section className="relative min-h-[35vh] md:min-h-[32vh] flex items-center justify-center pt-16 pb-6 bg-gradient-to-br from-orange-50 via-white to-blue-50 text-[#1c1c1c] transition-colors duration-300 overflow-hidden mt-12 px-4 sm:px-6 lg:px-8">
        <HeroProvider 
          initialService={selectedService}
          initialPostalCode={postalCode}
          onNextStep={handleValidatedNextStep}
          onServiceChange={setSelectedService}
          onPostalCodeChange={setPostalCode}
        >
          {isMobile ? <MobileHero hideForm={true} /> : <DesktopHero hideForm={true} />}
        </HeroProvider>
      </section>

      {/* Booking Form Section */}
      <BookingSection
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        postalCode={postalCode}
        setPostalCode={setPostalCode}
        handleNextStep={handleValidatedNextStep}
      />
    </>
  );
});

Hero.displayName = "Hero";

export default Hero;
