
import { memo, useEffect, useState, useRef } from "react";

export const BackgroundElements = memo(() => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Image paths
  const imagePath = '/lovable-uploads/a967d512-a0c9-457b-97d8-9ea49e5e2f5f.png';
  const fallbackImagePath = '/lovable-uploads/b331c1f0-907f-4c76-8eeb-393ca30e63c7.png';
  
  // Load image with improved background strategy
  useEffect(() => {
    // Track component mount state
    let isMounted = true;
    
    // Preload the main image
    const img = new Image();
    img.src = imagePath;
    
    img.onload = () => {
      if (isMounted && containerRef.current) {
        console.log("Hero background image loaded successfully");
        setImageLoaded(true);
        setImageFailed(false);
      }
    };
    
    img.onerror = () => {
      console.error("Failed to load primary hero image");
      if (isMounted) {
        setImageFailed(true);
        
        // Load fallback image
        const fallbackImg = new Image();
        fallbackImg.src = fallbackImagePath;
        fallbackImg.onload = () => {
          if (isMounted) {
            console.log("Fallback hero image loaded successfully");
            setImageLoaded(true);
          }
        };
      }
    };
    
    // Cleanup function to prevent state updates if component unmounts
    return () => {
      isMounted = false;
      img.onload = null;
      img.onerror = null;
    };
  }, []);

  // Choose which image to display
  const displayImagePath = imageFailed ? fallbackImagePath : imagePath;

  return (
    <>
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgc3RpdGNoVGlsZXM9InN0aXRjaCIgbnVtT2N0YXZlcz0iNCIgc2VlZD0iMiIgcmVzdWx0PSJ0dXJidWxlbmNlIj48L2ZlVHVyYnVsZW5jZT48ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIiByZXN1bHQ9ImRlc2F0dXJhdGVkVHVyYnVsZW5jZSI+PC9mZUNvbG9yTWF0cml4PjxmZUJsZW5kIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImRlc2F0dXJhdGVkVHVyYnVsZW5jZSIgbW9kZT0ib3ZlcmxheSIgcmVzdWx0PSJub2lzZUJsZW5kIj48L2ZlQmxlbmQ+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMiI+PC9yZWN0Pjwvc3ZnPg==')]"></div>
      
      {/* Background container with the image */}
      <div className="absolute inset-0 overflow-hidden bg-theme-lightblue" ref={containerRef}>
        {/* Desktop background with actual CSS background */}
        <div 
          className="absolute inset-0 z-0 hidden md:block"
          style={{
            backgroundImage: imageLoaded ? `url(${displayImagePath})` : 'none',
            backgroundPosition: 'right center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundOrigin: 'content-box',
            paddingRight: '5%',
            filter: 'saturate(1.05)',
            opacity: 0.95,
          }}
        >
          {/* Skeleton loader while image loads */}
          {!imageLoaded && (
            <div className="absolute right-0 top-0 bottom-0 w-[40%] flex items-center justify-center">
              <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        
        {/* Mobile background with CSS background */}
        <div 
          className="absolute inset-0 z-0 block md:hidden"
          style={{
            backgroundImage: imageLoaded ? `url(${displayImagePath})` : 'none',
            backgroundPosition: 'center 75%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '90% auto',
            opacity: 0.5,
          }}
        >
          {/* Skeleton loader while image loads */}
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
