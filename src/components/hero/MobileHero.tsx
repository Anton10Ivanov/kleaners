
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
  
  // Use the new uploaded image for mobile
  const heroImageSrc = '/lovable-uploads/d0852217-53a8-414a-b080-073eec924014.png';
  
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(false);
    img.src = heroImageSrc;
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Full-width background image for mobile */}
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
      
      {/* Fallback background */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-slate-100" />
      )}

      {/* Content overlay */}
      <div className="relative z-10 pt-16 pb-4 px-4">
        {/* Reduced pt-20 to pt-16 to match navbar height exactly */}
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
