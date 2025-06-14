
import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";

export const BackgroundElements = memo(() => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Only use the specific opciya1 image
  const heroImageSrc = '/lovable-uploads/opciya1 (1) 2.png';
  
  // Simple image loading
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      console.log('Hero image loaded successfully');
      setImageLoaded(true);
    };
    img.onerror = (error) => {
      console.warn('Failed to load hero image:', error);
      setImageLoaded(false);
    };
    img.src = heroImageSrc;
  }, []);

  // Preload the image
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
      {/* Professional gradient background - ALWAYS visible */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50/20"></div>
        
        {/* Desktop background image - professional implementation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0 hidden lg:block"
        >
          <div className="relative w-full h-full">
            {imageLoaded && (
              <>
                {/* Full-width background image positioned to the right */}
                <div 
                  className="absolute inset-0 bg-cover bg-no-repeat opacity-85 transition-opacity duration-500"
                  style={{
                    backgroundImage: `url(${heroImageSrc})`,
                    backgroundPosition: 'center right',
                    backgroundSize: 'cover',
                    filter: 'saturate(1.1) brightness(1.05)'
                  }}
                />
                {/* Professional gradient overlay for content readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/70"></div>
                
                {/* Additional overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20"></div>
              </>
            )}
            
            {/* Fallback when image is loading */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50/30"></div>
            )}
            
            {/* Subtle professional texture overlay */}
            <div 
              className="absolute inset-0 opacity-3 mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            ></div>
          </div>
        </motion.div>
        
        {/* Mobile background - clean and professional */}
        <div className="absolute inset-0 z-0 block lg:hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/90 to-orange-50/30"></div>
          <div 
            className="absolute inset-0 opacity-2"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
        </div>
      </div>
    </>
  );
});

BackgroundElements.displayName = "BackgroundElements";
