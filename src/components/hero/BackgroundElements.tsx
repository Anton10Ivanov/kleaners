
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
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgc3RpdGNoVGlsZXM9InN0aXRjaCIgbnVtT2N0YXZlcz0iNCIgc2VlZD0iMiIgcmVzdWx0PSJ0dXJidWxlbmNlIj48L2ZlVHVyYnVsZW5jZT48ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIiByZXN1bHQ9ImRlc2F0dXJhdGVkVHVyYnVsZW5jZSI+PC9mZUNvbG9yTWF0cml4PjxmZUJsZW5kIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImRlc2F0dXJhdGVkVHVyYnVsZW5jZSIgbW9kZT0ib3ZlcmxheSIgcmVzdWx0PSJub2lzZUJsZW5kIj48L2ZlQmxlbmQ+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMiI+PC9yZWN0Pjwvc3ZnPg==')]"></div>
      
      {/* Background container */}
      <div className="absolute inset-0 overflow-hidden bg-[#D3E4FD]" ref={containerRef}>
        {/* Desktop background image */}
        <div className="absolute inset-0 z-0 hidden md:block">
          {shouldShowImage && (
            <img 
              src={imageSrc}
              alt="Background decoration" 
              className="absolute right-0 h-full object-contain object-right transition-opacity duration-300"
              style={{
                opacity: imageLoaded ? 0.95 : 0.3,
                filter: 'saturate(1.05)',
                maxWidth: '70%'
              }}
              onLoad={() => setShouldShowImage(true)}
              onError={retry}
            />
          )}
          
          {!shouldShowImage && !imageError && (
            <div className="absolute right-0 top-0 bottom-0 w-[40%] flex items-center justify-center">
              <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin opacity-30"></div>
            </div>
          )}
        </div>
        
        {/* Mobile background image */}
        <div className="absolute inset-0 z-0 block md:hidden">
          {shouldShowImage && (
            <img 
              src={imageSrc}
              alt="Background decoration" 
              className="absolute inset-0 w-full h-full object-contain object-center transition-opacity duration-300"
              style={{
                opacity: imageLoaded ? 0.5 : 0.2
              }}
              onLoad={() => setShouldShowImage(true)}
              onError={retry}
            />
          )}
          
          {!shouldShowImage && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-10 w-10 border-3 border-primary border-t-transparent rounded-full animate-spin opacity-20"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
});

BackgroundElements.displayName = "BackgroundElements";
