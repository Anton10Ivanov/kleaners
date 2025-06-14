
import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Feather } from "lucide-react";

export const BackgroundElements = memo(() => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  // Image loading with retry mechanism
  useEffect(() => {
    const loadImage = () => {
      const img = new Image();
      
      img.onload = () => {
        console.log("Hero background image loaded successfully");
        setImageLoaded(true);
        setImageError(false);
      };
      
      img.onerror = (error) => {
        console.error(`Failed to load hero image (attempt ${retryCount + 1}):`, error);
        setImageError(true);
        setImageLoaded(false);
        
        // Retry up to 2 times with delay
        if (retryCount < 2) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
            setImageError(false);
          }, 1000 + retryCount * 1000); // Progressive delay
        }
      };
      
      // Try to load the image
      img.src = '/lovable-uploads/opciya1 (1) 2.png';
      
      return () => {
        img.onload = null;
        img.onerror = null;
      };
    };

    const cleanup = loadImage();
    return cleanup;
  }, [retryCount]);

  // Preload image for better performance
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = '/lovable-uploads/opciya1 (1) 2.png';
    document.head.appendChild(link);
    
    return () => {
      try {
        document.head.removeChild(link);
      } catch (e) {
        // Link might have been removed already
      }
    };
  }, []);

  return (
    <>
      {/* Enhanced background with warmth and emotion */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary gradient background - always visible as fallback */}
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

        {/* Desktop background image - only show when loaded successfully */}
        {imageLoaded && !imageError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-0 hidden lg:block"
          >
            <div className="relative w-full h-full">
              <img 
                src="/lovable-uploads/opciya1 (1) 2.png"
                alt="Professional cleaning service" 
                className="absolute right-0 h-full w-auto object-contain object-right opacity-60 transition-opacity duration-300"
                style={{
                  maxWidth: '45%',
                  filter: 'saturate(1.2) brightness(1.1) sepia(0.1)'
                }}
              />
              {/* Warmth overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-orange-50/20"></div>
              {/* Subtle texture overlay */}
              <div 
                className="absolute inset-0 opacity-5 mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}
              ></div>
            </div>
          </motion.div>
        )}
        
        {/* Loading indicator - only show while loading */}
        {!imageLoaded && !imageError && (
          <div className="absolute right-0 top-0 bottom-0 w-[40%] hidden lg:flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="h-16 w-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin opacity-40"></div>
              <div className="text-xs text-primary/40">Loading image...</div>
            </div>
          </div>
        )}
        
        {/* Error state - show if all retries failed */}
        {imageError && retryCount >= 2 && (
          <div className="absolute right-0 top-0 bottom-0 w-[40%] hidden lg:flex items-center justify-center">
            <div className="text-center text-primary/30">
              <Feather className="h-16 w-16 mx-auto mb-2 opacity-30" />
              <div className="text-xs">Image unavailable</div>
            </div>
          </div>
        )}
        
        {/* Mobile background - warm pattern */}
        <div className="absolute inset-0 z-0 block lg:hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 to-orange-50/40"></div>
          {/* Subtle geometric pattern for mobile */}
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
