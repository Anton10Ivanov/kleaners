
import { memo, useState, useEffect } from "react";
import { HeroForm } from "./HeroForm";

interface DesktopHeroProps {
  selectedService: string;
  setSelectedService: (value: string) => void;
  postalCode: string;
  setPostalCode: (value: string) => void;
  handleNextStep: () => void;
}

export const DesktopHero = memo(({
  selectedService,
  setSelectedService,
  postalCode,
  setPostalCode,
  handleNextStep
}: DesktopHeroProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Use the new uploaded image
  const heroImageSrc = '/lovable-uploads/d0852217-53a8-414a-b080-073eec924014.png';
  
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      console.log('Hero image loaded successfully');
      setImageLoaded(true);
    };
    img.onerror = (error) => {
      console.error('Failed to load hero image:', error);
      setImageLoaded(false);
    };
    img.src = heroImageSrc;
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Full-width background image */}
      {imageLoaded && (
        <div 
          className="absolute inset-0 w-full h-full bg-gray-100"
          style={{
            backgroundImage: `url(${heroImageSrc})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      )}
      
      {/* Fallback if image doesn't load */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-slate-100" />
      )}

      {/* Left-positioned form overlay */}
      <div className="relative z-10 pt-20 pb-4">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg">
            <HeroForm
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              postalCode={postalCode}
              setPostalCode={setPostalCode}
              handleNextStep={handleNextStep}
              isMobile={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

DesktopHero.displayName = "DesktopHero";
