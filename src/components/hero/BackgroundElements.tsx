
import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";

export const BackgroundElements = memo(() => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Use the specific opciya1 image
  const heroImageSrc = '/lovable-uploads/opciya1 (1) 2.png';
  
  // Simplified image loading
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      console.log('Hero background image loaded successfully');
      setImageLoaded(true);
      setImageError(false);
    };
    img.onerror = (error) => {
      console.warn('Failed to load hero background image:', error);
      setImageLoaded(false);
      setImageError(true);
    };
    img.src = heroImageSrc;
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Base gradient background - always visible */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/90 to-indigo-50/60"></div>
      
      {/* Desktop background image */}
      {imageLoaded && !imageError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0 hidden lg:block"
        >
          {/* Main background image */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${heroImageSrc})`,
              backgroundPosition: 'center right',
              backgroundSize: 'cover'
            }}
          />
          
          {/* Simple overlay for content readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent"></div>
        </motion.div>
      )}
      
      {/* Fallback for image loading errors */}
      {imageError && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/90 via-white to-indigo-100/70"></div>
      )}
      
      {/* Mobile background - clean gradient only */}
      <div className="absolute inset-0 block lg:hidden bg-gradient-to-b from-blue-50/90 to-white"></div>
    </div>
  );
});

BackgroundElements.displayName = "BackgroundElements";
