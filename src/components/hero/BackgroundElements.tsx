
import { memo, useEffect, useState } from "react";

export const BackgroundElements = memo(() => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Using the most recent image
  const imagePath = '/lovable-uploads/b331c1f0-907f-4c76-8eeb-393ca30e63c7.png';
  
  // Check if image exists and can be loaded - with improved error handling
  useEffect(() => {
    console.log("Attempting to load hero image from:", imagePath);
    
    // Use a local variable to track component mount state
    let isMounted = true;
    
    const img = new Image();
    img.onload = () => {
      if (isMounted) {
        console.log("Hero background image loaded successfully");
        setImageLoaded(true);
      }
    };
    
    img.onerror = (error) => {
      console.error("Failed to load hero background image:", imagePath, error);
      // Fall back to a default image or placeholder
      if (isMounted) {
        setImageLoaded(false);
      }
    };
    
    img.src = imagePath;
    
    // Cleanup function to prevent state updates if component unmounts
    return () => {
      isMounted = false;
      img.onload = null;
      img.onerror = null;
    };
  }, [imagePath]);

  return (
    <>
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgc3RpdGNoVGlsZXM9InN0aXRjaCIgbnVtT2N0YXZlcz0iNCIgc2VlZD0iMiIgcmVzdWx0PSJ0dXJidWxlbmNlIj48L2ZlVHVyYnVsZW5jZT48ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIiByZXN1bHQ9ImRlc2F0dXJhdGVkVHVyYnVsZW5jZSI+PC9mZUNvbG9yTWF0cml4PjxmZUJsZW5kIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImRlc2F0dXJhdGVkVHVyYnVsZW5jZSIgbW9kZT0ib3ZlcmxheSIgcmVzdWx0PSJub2lzZUJsZW5kIj48L2ZlQmxlbmQ+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMiI+PC9yZWN0Pjwvc3ZnPg==')]"></div>
      
      {/* Background container with fallback color */}
      <div className="absolute inset-0 overflow-hidden bg-theme-lightblue">
        {/* Desktop image - optimized with width/height to prevent layout shifts */}
        <div className="absolute inset-0 z-0 hidden md:flex justify-end items-center pr-8">
          {imageLoaded ? (
            <img 
              src={imagePath}
              alt="Professional cleaner with cleaning supplies"
              width="600"
              height="500"
              className="object-contain max-w-[50%] max-h-[85%]"
              style={{ 
                filter: "saturate(1.05)",
                transform: "translateX(-5%) translateY(-5%)",
                opacity: 0.95
              }}
              loading="eager" // Load with high priority
            />
          ) : (
            <div className="w-[45%] h-[80%] bg-gray-100 bg-opacity-10 rounded-lg flex items-center justify-center">
              <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        
        {/* Mobile image - optimized */}
        <div className="absolute inset-0 z-0 flex md:hidden justify-center items-center">
          {imageLoaded ? (
            <img 
              src={imagePath}
              alt="Professional cleaner with cleaning supplies"
              width="300"
              height="200"
              className="object-contain max-w-[90%] max-h-[45%] opacity-50"
              loading="eager" // Load with high priority
            />
          ) : (
            <div className="w-[80%] h-[30%] bg-gray-100 bg-opacity-10 rounded-lg flex items-center justify-center">
              <div className="h-10 w-10 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
});

BackgroundElements.displayName = "BackgroundElements";
