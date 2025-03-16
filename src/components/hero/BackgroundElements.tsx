
import { memo, useEffect, useState, useRef } from "react";

export const BackgroundElements = memo(() => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Direct reference to the image - no complex path handling
  const imagePath = '/lovable-uploads/opciya1 (1) 2.png';
  
  // Simplified image loading
  useEffect(() => {
    let isMounted = true;
    
    const img = new Image();
    img.src = imagePath;
    
    img.onload = () => {
      if (isMounted) {
        console.log("Hero background image loaded successfully");
        setImageLoaded(true);
      }
    };
    
    img.onerror = () => {
      if (isMounted) {
        console.error("Failed to load hero image:", imagePath);
      }
    };
    
    return () => {
      isMounted = false;
      img.onload = null;
      img.onerror = null;
    };
  }, []);

  return (
    <>
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgc3RpdGNoVGlsZXM9InN0aXRjaCIgbnVtT2N0YXZlcz0iNCIgc2VlZD0iMiIgcmVzdWx0PSJ0dXJidWxlbmNlIj48L2ZlVHVyYnVsZW5jZT48ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIiByZXN1bHQ9ImRlc2F0dXJhdGVkVHVyYnVsZW5jZSI+PC9mZUNvbG9yTWF0cml4PjxmZUJsZW5kIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImRlc2F0dXJhdGVkVHVyYnVsZW5jZSIgbW9kZT0ib3ZlcmxheSIgcmVzdWx0PSJub2lzZUJsZW5kIj48L2ZlQmxlbmQ+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMiI+PC9yZWN0Pjwvc3ZnPg==')]"></div>
      
      {/* Background container */}
      <div className="absolute inset-0 overflow-hidden bg-theme-lightblue" ref={containerRef}>
        {/* Desktop background image as actual IMG element for better reliability */}
        <div className="absolute inset-0 z-0 hidden md:block">
          <img 
            src={imagePath}
            alt="Background decoration" 
            className="absolute right-0 h-full object-contain object-right"
            style={{
              opacity: imageLoaded ? 0.95 : 0,
              transition: 'opacity 0.3s ease-in-out',
              filter: 'saturate(1.05)',
              maxWidth: '70%'
            }}
            onLoad={() => setImageLoaded(true)}
          />
          
          {!imageLoaded && (
            <div className="absolute right-0 top-0 bottom-0 w-[40%] flex items-center justify-center">
              <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        
        {/* Mobile background image as actual IMG element */}
        <div className="absolute inset-0 z-0 block md:hidden">
          <img 
            src={imagePath}
            alt="Background decoration" 
            className="absolute inset-0 w-full h-full object-contain object-center opacity-50"
            style={{
              opacity: imageLoaded ? 0.5 : 0,
              transition: 'opacity 0.3s ease-in-out'
            }}
            onLoad={() => setImageLoaded(true)}
          />
          
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-10 w-10 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
});

BackgroundElements.displayName = "BackgroundElements";
