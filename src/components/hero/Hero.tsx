import { useEffect, memo } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { HeroForm } from "./HeroForm";
import { HeroProvider } from "./HeroContext";
import { BackgroundElements } from "./BackgroundElements";
import { toast } from "sonner";
import { ServiceType } from "@/schemas/booking";
import { performanceMonitor } from "@/utils/performance";
import { useComponentTimer } from "@/hooks/useComponentTimer";
import environmentUtils from "@/utils/environment";

interface HeroProps {
  postalCode: string;
  setPostalCode: (value: string) => void;
  handleNextStep: () => void;
}

export const Hero = memo(({
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

  const handleValidatedNextStep = () => {
    startTimer('validateAndNextStep');
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
      {/* Custom designed background */}
      <BackgroundElements />
      
      {/* Creative positioning container */}
      <div className="relative z-10 h-full flex items-center justify-start px-8 lg:px-16">
        <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
          <HeroProvider 
            initialService="" 
            initialPostalCode={postalCode} 
            onNextStep={handleValidatedNextStep} 
            onServiceChange={() => {}} 
            onPostalCodeChange={setPostalCode}
          >
            <HeroForm 
              postalCode={postalCode} 
              setPostalCode={setPostalCode} 
              handleNextStep={handleValidatedNextStep} 
            />
          </HeroProvider>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";
export default Hero;
