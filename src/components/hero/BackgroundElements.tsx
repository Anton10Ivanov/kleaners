
import { memo, useEffect, useState, useRef } from "react";
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
      {/* Background container with gradient overlay */}
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-blue-50" ref={containerRef}>
        {/* Desktop background image */}
        <div className="absolute inset-0 z-0 hidden lg:block">
          {shouldShowImage && (
            <div className="relative w-full h-full">
              <img 
                src={imageSrc}
                alt="Professional cleaning service" 
                className="absolute right-0 h-full w-auto object-contain object-right opacity-80"
                style={{
                  maxWidth: '50%',
                  filter: 'saturate(1.1) brightness(1.05)'
                }}
                onLoad={() => setShouldShowImage(true)}
                onError={retry}
              />
              {/* Subtle overlay to ensure text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
            </div>
          )}
          
          {!shouldShowImage && !imageError && (
            <div className="absolute right-0 top-0 bottom-0 w-[40%] flex items-center justify-center">
              <div className="h-16 w-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin opacity-30"></div>
            </div>
          )}
        </div>
        
        {/* Mobile background - subtle pattern */}
        <div className="absolute inset-0 z-0 block lg:hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 to-blue-50/50"></div>
          {/* Subtle geometric pattern for mobile */}
          <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>
      </div>
    </>
  );
});

BackgroundElements.displayName = "BackgroundElements";
