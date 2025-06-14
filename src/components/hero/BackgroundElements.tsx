
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
    <div className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
      {/* Show the opciya image directly without complex overlays */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: imageLoaded ? `url(${heroImageSrc})` : 'none',
          opacity: imageLoaded ? 1 : 0,
        }}
      />
      
      {/* Very minimal overlay just for text readability on the left side */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/20 to-transparent"
        style={{ zIndex: 2 }}
      />
      
      {/* Fallback background if image fails to load */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100" />
      )}
    </div>
  );
});

BackgroundElements.displayName = "BackgroundElements";
