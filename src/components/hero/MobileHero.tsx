
import { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HeroContent } from "./HeroContent";
import { HeroForm } from "./HeroForm";

interface MobileHeroProps {
  selectedService: string;
  setSelectedService: (value: string) => void;
  postalCode: string;
  setPostalCode: (value: string) => void;
  handleNextStep: () => void;
}

export const MobileHero = memo(({
  selectedService,
  setSelectedService,
  postalCode,
  setPostalCode,
  handleNextStep
}: MobileHeroProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Load the portrait image for mobile
  const portraitImageSrc = '/lovable-uploads/c953fdaf-6489-4857-8cb3-ec5c96f26285.png';
  
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(false);
    img.src = portraitImageSrc;
  }, []);

  return (
    <div className="w-full min-h-[60vh] flex flex-col justify-center items-center px-4 py-8 relative z-10">
      {/* Mobile portrait image as header */}
      {imageLoaded && (
        <div className="w-full max-w-sm h-48 mb-6 rounded-2xl overflow-hidden shadow-lg">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `url(${portraitImageSrc})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="w-full h-full bg-gradient-to-t from-blue-500/10 to-transparent" />
          </div>
        </div>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md mx-auto flex flex-col items-center gap-6 text-center"
      >
        {/* White background card for content */}
        <div className="w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
          <HeroContent isMobile={true} />
          
          <div className="w-full mt-6">
            <HeroForm
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              postalCode={postalCode}
              setPostalCode={setPostalCode}
              handleNextStep={handleNextStep}
              isMobile={true}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
});

MobileHero.displayName = "MobileHero";
