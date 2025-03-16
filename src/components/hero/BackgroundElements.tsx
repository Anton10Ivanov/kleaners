
import { memo, useEffect, useState } from "react";

export const BackgroundElements = memo(() => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imagePath = '/lovable-uploads/d6c1d213-92bc-42b1-bd21-3789664c3faf.png';
  
  // Check if image exists and can be loaded
  useEffect(() => {
    const img = new Image();
    img.src = imagePath;
    img.onload = () => {
      console.log("Hero background image loaded successfully");
      setImageLoaded(true);
    };
    img.onerror = () => {
      console.error("Failed to load hero background image:", imagePath);
    };
  }, [imagePath]);

  return (
    <>
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgc3RpdGNoVGlsZXM9InN0aXRjaCIgbnVtT2N0YXZlcz0iNCIgc2VlZD0iMiIgcmVzdWx0PSJ0dXJidWxlbmNlIj48L2ZlVHVyYnVsZW5jZT48ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIiByZXN1bHQ9ImRlc2F0dXJhdGVkVHVyYnVsZW5jZSI+PC9mZUNvbG9yTWF0cml4PjxmZUJsZW5kIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImRlc2F0dXJhdGVkVHVyYnVsZW5jZSIgbW9kZT0ib3ZlcmxheSIgcmVzdWx0PSJub2lzZUJsZW5kIj48L2ZlQmxlbmQ+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMiI+PC9yZWN0Pjwvc3ZnPg==')]"></div>
      
      {/* Background container with direct image instead of background-image */}
      <div className="absolute inset-0 overflow-hidden bg-theme-lightblue">
        {/* Desktop image */}
        <div className="absolute inset-0 z-0 hidden md:flex justify-end items-center pr-8">
          {imageLoaded ? (
            <img 
              src={imagePath}
              alt="Background illustration"
              className="object-contain max-w-[45%] max-h-[80%]"
              style={{ 
                filter: "saturate(1.1)",
                transform: "translateX(-5%) translateY(-5%)"
              }}
            />
          ) : (
            <div className="w-[45%] h-[80%] bg-opacity-10 animate-pulse rounded-lg"></div>
          )}
        </div>
        
        {/* Mobile image */}
        <div className="absolute inset-0 z-0 flex md:hidden justify-center items-center">
          {imageLoaded ? (
            <img 
              src={imagePath}
              alt="Background illustration"
              className="object-contain max-w-[90%] max-h-[40%] opacity-30"
            />
          ) : (
            <div className="w-[80%] h-[30%] bg-opacity-10 animate-pulse rounded-lg"></div>
          )}
        </div>
      </div>
    </>
  );
});

BackgroundElements.displayName = "BackgroundElements";
