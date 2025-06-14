
import { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  const portraitImageSrc = '/lovable-uploads/343cfe48-b5df-4330-b85d-fafc14c3129d.png';
  
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(false);
    img.src = portraitImageSrc;
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Full-width background image for mobile */}
      {imageLoaded && (
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${portraitImageSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      )}
      
      {/* Fallback background */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-slate-100" />
      )}

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md mx-auto"
        >
          <HeroForm
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            postalCode={postalCode}
            setPostalCode={setPostalCode}
            handleNextStep={handleNextStep}
            isMobile={true}
          />
        </motion.div>
      </div>
    </div>
  );
});

MobileHero.displayName = "MobileHero";
