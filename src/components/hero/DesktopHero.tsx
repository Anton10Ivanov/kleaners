
import { memo, useState, useEffect } from "react";
import { HeroContent } from "./HeroContent";
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
  
  // Load the portrait image
  const portraitImageSrc = '/lovable-uploads/343cfe48-b5df-4330-b85d-fafc14c3129d.png';
  
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      console.log('Portrait image loaded successfully');
      setImageLoaded(true);
    };
    img.onerror = (error) => {
      console.error('Failed to load portrait image:', error);
      setImageLoaded(false);
    };
    img.src = portraitImageSrc;
  }, []);

  return (
    <div className="relative w-full min-h-[80vh] overflow-hidden">
      {/* Full-width background image */}
      {imageLoaded && (
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${portraitImageSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Subtle overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent" />
        </div>
      )}
      
      {/* Fallback if image doesn't load */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-slate-100" />
      )}

      {/* Left-positioned form overlay */}
      <div className="relative z-10 flex items-center min-h-[80vh] py-12">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            {/* White background container for form area with enhanced styling */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-12 border border-white/20">
              <HeroContent isMobile={false} />
              
              <div className="mt-8">
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
      </div>
    </div>
  );
});

DesktopHero.displayName = "DesktopHero";
