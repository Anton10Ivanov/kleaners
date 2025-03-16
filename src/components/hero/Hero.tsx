
import { useEffect, memo } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { MobileHero } from "./MobileHero";
import { DesktopHero } from "./DesktopHero";
import { HeroProvider } from "./HeroContext";
import { BackgroundElements } from "./BackgroundElements";
import { toast } from "sonner";
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
      console.log("Setting service to: regular");
      setSelectedService(ServiceType.Regular);
    }
  }, [selectedService, setSelectedService]);

  // Preload hero images with higher browser priority
  useEffect(() => {
    // Images to preload
    const imagesToPreload = [
      '/lovable-uploads/a967d512-a0c9-457b-97d8-9ea49e5e2f5f.png',
      '/lovable-uploads/b331c1f0-907f-4c76-8eeb-393ca30e63c7.png'
    ];
    
    // Create preload links with high priority
    imagesToPreload.forEach((imageUrl, index) => {
      const link = document.createElement('link');
      link.rel = index === 0 ? 'preload' : 'prefetch'; // First image gets higher priority
      link.as = 'image';
      link.href = imageUrl;
      link.fetchPriority = index === 0 ? 'high' : 'low';
      document.head.appendChild(link);
      
      // Also manually preload with Image object
      const img = new Image();
      img.src = imageUrl;
    });
    
    return () => {
      // Clean up preload links when component unmounts
      document.head.querySelectorAll('link[rel="preload"][as="image"], link[rel="prefetch"][as="image"]')
        .forEach(link => document.head.removeChild(link));
    };
  }, []);

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
    <section className="relative min-h-[90vh] md:min-h-[85vh] flex items-center justify-center py-12 bg-theme-lightblue transition-colors duration-300 overflow-hidden">
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
