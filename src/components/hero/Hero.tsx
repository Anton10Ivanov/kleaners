import { useEffect, memo } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { HeroContent } from "./HeroContent";
import { BackgroundElements } from "./BackgroundElements";
import { toast } from "sonner";
import { performanceMonitor } from "@/utils/performance";
import { useComponentTimer } from "@/hooks/useComponentTimer";
import environmentUtils from "@/utils/environment";

interface HeroProps {
  postalCode: string;
  setPostalCode: (value: string) => void;
  selectedService: string;
  setSelectedService: (value: string) => void;
  handleNextStep: () => void;
}

export const Hero = memo(({
  postalCode,
  setPostalCode,
  selectedService,
  setSelectedService,
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

  const handleValidatedNextStep = () => {
    startTimer('validateAndNextStep');
    if (!postalCode) {
      toast.error("Please enter your postal code");
      endTimer('validateAndNextStep');
      return;
    }
    if (!selectedService) {
      toast.error("Please select a service type");
      endTimer('validateAndNextStep');
      return;
    }
    handleNextStep();
    endTimer('validateAndNextStep');
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden pt-16">
      {/* Clean background */}
      <BackgroundElements />
      
      {/* Content container with proper spacing */}
      <div className="relative z-10 flex items-center justify-center px-6 sm:px-8 lg:px-12 py-20 lg:py-32">
        <div className="w-full max-w-7xl mx-auto">
          <HeroContent onGetQuote={handleValidatedNextStep} />
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";
export default Hero;
