
import { memo, useEffect, useState } from "react";

export const BackgroundElements = memo(() => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Changed to use the newly uploaded cleaner image
  const imagePath = '/lovable-uploads/b331c1f0-907f-4c76-8eeb-393ca30e63c7.png';
  
  // Check if image exists and can be loaded
  useEffect(() => {
    console.log("Attempting to load hero image from:", imagePath);
    const img = new Image();
    img.src = imagePath;
    img.onload = () => {
      console.log("Hero background image loaded successfully");
      setImageLoaded(true);
    };
    img.onerror = (error) => {
      console.error("Failed to load hero background image:", imagePath, error);
      // Try alternative approach with direct import if available
    };
  }, [imagePath]);

  return (
    <>
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgc3RpdGNoVGlsZXM9InN0aXRjaCIgbnVtT2N0YXZlcz0iNCIgc2VlZD0iMiIgcmVzdWx0PSJ0dXJidWxlbmNlIj48L2ZlVHVyYnVsZW5jZT48ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIiByZXN1bHQ9ImRlc2F0dXJhdGVkVHVyYnVsZW5jZSI+PC9mZUNvbG9yTWF0cml4PjxmZUJsZW5kIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImRlc2F0dXJhdGVkVHVyYnVsZW5jZSIgbW9kZT0ib3ZlcmxheSIgcmVzdWx0PSJub2lzZUJsZW5kIj48L2ZlQmxlbmQ+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMiI+PC9yZWN0Pjwvc3ZnPg==')]"></div>
      
      {/* Background container with fallback color */}
      <div className="absolute inset-0 overflow-hidden bg-theme-lightblue">
        {/* Desktop image */}
        <div className="absolute inset-0 z-0 hidden md:flex justify-end items-center pr-8">
          {imageLoaded ? (
            <img 
              src={imagePath}
              alt="Professional cleaner with cleaning supplies"
              className="object-contain max-w-[50%] max-h-[85%]"
              style={{ 
                filter: "saturate(1.05)",
                transform: "translateX(-5%) translateY(-5%)",
                opacity: 0.95 // Slightly increased opacity for better visibility
              }}
            />
          ) : (
            <div className="w-[45%] h-[80%] bg-gray-100 bg-opacity-10 animate-pulse rounded-lg">
              <div className="h-full w-full flex items-center justify-center text-gray-400">
                Loading image...
              </div>
            </div>
          )}
        </div>
        
        {/* Mobile image */}
        <div className="absolute inset-0 z-0 flex md:hidden justify-center items-center">
          {imageLoaded ? (
            <img 
              src={imagePath}
              alt="Professional cleaner with cleaning supplies"
              className="object-contain max-w-[90%] max-h-[45%] opacity-50" // Increased opacity and size
            />
          ) : (
            <div className="w-[80%] h-[30%] bg-gray-100 bg-opacity-10 animate-pulse rounded-lg">
              <div className="h-full w-full flex items-center justify-center text-gray-400 text-sm">
                Loading image...
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
});

BackgroundElements.displayName = "BackgroundElements";
