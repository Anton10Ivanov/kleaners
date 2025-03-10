
import { useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { MobileHero } from "./MobileHero";
import { DesktopHero } from "./DesktopHero";
import { toast } from "sonner";

interface HeroProps {
  selectedService: string;
  setSelectedService: (value: "regular" | "moveInOut" | "business" | "construction") => void;
  postalCode: string;
  setPostalCode: (value: string) => void;
  handleNextStep: () => void;
}

export const Hero = ({
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

  const handleServiceChange = (value: string) => {
    setSelectedService(value as "regular" | "moveInOut" | "business" | "construction");
  };

  const handleNext = () => {
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
        {isMobile ? (
          <MobileHero 
            selectedService={selectedService}
            handleServiceChange={handleServiceChange}
            postalCode={postalCode}
            setPostalCode={setPostalCode}
            handleNext={handleNext}
          />
        ) : (
          <DesktopHero 
            selectedService={selectedService}
            handleServiceChange={handleServiceChange}
            postalCode={postalCode}
            setPostalCode={setPostalCode}
            handleNext={handleNext}
          />
        )}
      </div>
    </div>
  );
};

const BackgroundElements = () => (
  <>
    <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgc3RpdGNoVGlsZXM9InN0aXRjaCIgbnVtT2N0YXZlcz0iNCIgc2VlZD0iMiIgcmVzdWx0PSJ0dXJidWxlbmNlIj48L2ZlVHVyYnVsZW5jZT48ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIiByZXN1bHQ9ImRlc2F0dXJhdGVkVHVyYnVsZW5jZSI+PC9mZUNvbG9yTWF0cml4PjxmZUJsZW5kIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImRlc2F0dXJhdGVkVHVyYnVsZW5jZSIgbW9kZT0ib3ZlcmxheSIgcmVzdWx0PSJub2lzZUJsZW5kIj48L2ZlQmxlbmQ+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMiI+PC9yZWN0Pjwvc3ZnPg==')]"></div>
    <div className="absolute inset-0 overflow-hidden bg-theme-green"></div>
  </>
);
