
import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";

export const BackgroundElements = memo(() => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Use the specific opciya1 image
  const heroImageSrc = '/lovable-uploads/opciya1 (1) 2.png';
  
  // Optimized image loading with error handling
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      console.log('Hero image loaded successfully');
      setImageLoaded(true);
      setImageError(false);
    };
    img.onerror = (error) => {
      console.warn('Failed to load hero image:', error);
      setImageLoaded(false);
      setImageError(true);
    };
    img.src = heroImageSrc;
  }, []);

  // Preload the image for better performance
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = heroImageSrc;
    document.head.appendChild(link);
    
    return () => {
      try {
        document.head.removeChild(link);
      } catch (e) {
        // Already removed
      }
    };
  }, []);

  return (
    <>
      {/* Full-width background container that extends beyond section boundaries */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Base gradient background - ALWAYS visible */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-white to-indigo-50/30"></div>
        
        {/* Desktop background image implementation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 z-0 hidden lg:block"
        >
          <div className="relative w-full h-full">
            {imageLoaded && !imageError && (
              <>
                {/* Main background image with proper positioning */}
                <div 
                  className="absolute inset-0 w-full h-full bg-cover bg-no-repeat transition-opacity duration-700"
                  style={{
                    backgroundImage: `url(${heroImageSrc})`,
                    backgroundPosition: 'center right',
                    backgroundSize: 'cover',
                    filter: 'saturate(1.1) brightness(1.05) contrast(1.05)',
                    opacity: 0.95
                  }}
                />
                
                {/* Content readability overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/70"></div>
                
                {/* Subtle depth overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/5"></div>
              </>
            )}
            
            {/* Fallback when image fails to load */}
            {(imageError || !imageLoaded) && (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/95 via-white to-indigo-50/40"></div>
            )}
            
            {/* Professional texture overlay */}
            <div 
              className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M40 40c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8zm0-32c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8zm32 32c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            ></div>
          </div>
        </motion.div>
        
        {/* Mobile background - clean and professional */}
        <div className="absolute inset-0 z-0 block lg:hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/95 to-indigo-50/40"></div>
          <div 
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
        </div>
      </div>
    </>
  );
});

BackgroundElements.displayName = "BackgroundElements";
