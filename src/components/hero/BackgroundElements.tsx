
import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Feather } from "lucide-react";

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
      {/* Enhanced background with warmth and emotion */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary gradient background - ALWAYS visible */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50/30"></div>
        
        {/* Floating feather animations */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 right-1/4 text-primary/20 hidden lg:block"
        >
          <Feather className="h-12 w-12" />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, -8, 8, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/3 left-1/5 text-primary/15 hidden lg:block"
        >
          <Feather className="h-8 w-8" />
        </motion.div>

        {/* Desktop background image - only show opciya1 image when loaded */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-0 hidden lg:block"
        >
          <div className="relative w-full h-full">
            {imageLoaded && (
              <>
                <img 
                  src={heroImageSrc}
                  alt="Professional cleaning service" 
                  className="absolute right-0 h-full w-auto object-contain object-right opacity-60 transition-opacity duration-300"
                  style={{
                    maxWidth: '45%',
                    filter: 'saturate(1.2) brightness(1.1) sepia(0.1)'
                  }}
                />
                {/* Warmth overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-orange-50/20"></div>
              </>
            )}
            
            {/* Decorative elements when image is loading or not available */}
            {!imageLoaded && (
              <div className="absolute right-8 top-1/2 transform -translate-y-1/2 opacity-20">
                <Feather className="h-32 w-32 text-primary" />
              </div>
            )}
            
            {/* Subtle texture overlay */}
            <div 
              className="absolute inset-0 opacity-5 mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            ></div>
          </div>
        </motion.div>
        
        {/* Mobile background - always works */}
        <div className="absolute inset-0 z-0 block lg:hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 to-orange-50/40"></div>
          <div 
            className="absolute inset-0 opacity-3"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
        </div>
      </div>
    </>
  );
});

BackgroundElements.displayName = "BackgroundElements";
