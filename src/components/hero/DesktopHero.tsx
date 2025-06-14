
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
  const portraitImageSrc = '/lovable-uploads/c953fdaf-6489-4857-8cb3-ec5c96f26285.png';
  
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center min-h-[80vh] relative py-12">
      {/* Left side - Content and Form */}
      <div className="lg:col-span-7 flex flex-col space-y-12 text-left relative z-10">
        {/* White background for form area with subtle shadow */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl" style={{ zIndex: -1 }} />
        
        <div className="px-8 py-6">
          <HeroContent isMobile={false} />
          
          <div className="flex justify-start mt-8">
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
      
      {/* Right side - Portrait Image */}
      <div className="lg:col-span-5 hidden lg:block relative h-full">
        {imageLoaded && (
          <div className="relative h-full min-h-[600px] flex items-center justify-center">
            {/* Main portrait image - maintaining original size */}
            <div 
              className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
              style={{
                backgroundImage: `url(${portraitImageSrc})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Subtle overlay for aesthetic blending */}
              <div 
                className="absolute inset-0 bg-gradient-to-l from-transparent via-blue-500/5 to-blue-500/10"
                style={{ zIndex: 1 }}
              />
            </div>
            
            {/* Decorative elements for aesthetic enhancement */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl" />
          </div>
        )}
        
        {/* Fallback if image doesn't load */}
        {!imageLoaded && (
          <div className="h-full min-h-[600px] flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 rounded-2xl">
            <div className="text-center text-blue-400">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm font-medium">Loading image...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

DesktopHero.displayName = "DesktopHero";
