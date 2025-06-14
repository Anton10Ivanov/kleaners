
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
      {/* Show the opciya image as soon as it loads */}
      {imageLoaded && (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImageSrc})`,
            zIndex: 1
          }}
        />
      )}
      
      {/* Light overlay only to ensure text readability - much more transparent */}
      <div 
        className="absolute inset-0 bg-white/30"
        style={{ zIndex: 2 }}
      />
      
      {/* Fallback gradient if image fails to load */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100" />
      )}
    </div>
  );
});

BackgroundElements.displayName = "BackgroundElements";
