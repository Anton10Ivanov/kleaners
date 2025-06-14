
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
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Opciya background image - direct implementation */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${heroImageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
          zIndex: 1
        }}
      />
      
      {/* Subtle overlay for text readability */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(37, 99, 235, 0.2) 50%, transparent 100%)',
          zIndex: 2
        }}
      />
      
      {/* Fallback blue background if image fails */}
      {!imageLoaded && (
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)',
            zIndex: 1
          }}
        />
      )}
    </div>
  );
});

BackgroundElements.displayName = "BackgroundElements";
