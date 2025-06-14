
import { memo, useEffect, useState } from "react";

export const BackgroundElements = memo(() => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Direct path to the opciya image
  const heroImageSrc = '/lovable-uploads/opciya1 (1) 2.png';
  
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      console.log('Opciya background image loaded successfully');
      setImageLoaded(true);
    };
    img.onerror = (error) => {
      console.error('Failed to load opciya background image:', error);
      setImageLoaded(false);
    };
    img.src = heroImageSrc;
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Simple, direct opciya background image - no overlays */}
      {imageLoaded && (
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${heroImageSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 1
          }}
        />
      )}
      
      {/* Very subtle overlay only for text readability - much lighter */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          zIndex: 2
        }}
      />
      
      {/* Blue fallback only if image fails to load */}
      {!imageLoaded && (
        <div 
          className="absolute inset-0 bg-blue-500"
          style={{ zIndex: 1 }}
        />
      )}
    </div>
  );
});

BackgroundElements.displayName = "BackgroundElements";
