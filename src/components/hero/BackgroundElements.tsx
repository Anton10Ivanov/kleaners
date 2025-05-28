
import { memo, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Feather } from "lucide-react";
import { useImageLoader } from "@/hooks/useImageLoader";
import environmentUtils from "@/utils/environment";

export const BackgroundElements = memo(() => {
  const [shouldShowImage, setShouldShowImage] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use the image loader hook for better reliability
  const { src: imageSrc, isLoaded: imageLoaded, hasError: imageError, retry } = useImageLoader(
    '/lovable-uploads/opciya1 (1) 2.png',
    {
      preload: environmentUtils.features.enablePreloading(),
      onLoad: () => {
        console.log("Hero background image loaded successfully");
        setShouldShowImage(true);
      },
      onError: (error) => {
        console.error("Failed to load hero image:", error);
      }
    }
  );

  // Fallback visibility timer
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!imageLoaded && !imageError) {
        console.warn("Image loading timeout, showing fallback");
        setShouldShowImage(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [imageLoaded, imageError]);

  return (
    <>
      {/* Enhanced background with warmth and emotion */}
      <div className="absolute inset-0 overflow-hidden" ref={containerRef}>
        {/* Primary gradient background */}
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

        {/* Desktop background image with warmth overlay */}
        <div className="absolute inset-0 z-0 hidden lg:block">
          {shouldShowImage && (
            <div className="relative w-full h-full">
              <img 
                src={imageSrc}
                alt="Professional cleaning service" 
                className="absolute right-0 h-full w-auto object-contain object-right opacity-60"
                style={{
                  maxWidth: '45%',
                  filter: 'saturate(1.2) brightness(1.1) sepia(0.1)'
                }}
                onLoad={() => setShouldShowImage(true)}
                onError={retry}
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
          )}
          
          {!shouldShowImage && !imageError && (
            <div className="absolute right-0 top-0 bottom-0 w-[40%] flex items-center justify-center">
              <div className="h-16 w-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin opacity-40"></div>
            </div>
          )}
        </div>
        
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
