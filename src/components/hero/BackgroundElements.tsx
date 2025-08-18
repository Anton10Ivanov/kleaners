import { memo } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

export const BackgroundElements = memo(() => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-accent/5" />
      
      {/* Decorative shapes */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-32 left-16 w-24 h-24 bg-accent/20 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-secondary/15 rounded-full blur-md animate-float" style={{ animationDelay: '4s' }} />
      
      {/* Cleaning bubbles animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-primary/30 rounded-full animate-bubble" />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-accent/40 rounded-full animate-bubble" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-secondary/25 rounded-full animate-bubble" style={{ animationDelay: '3s' }} />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-primary/35 rounded-full animate-bubble" style={{ animationDelay: '5s' }} />
      </div>

      {/* Person silhouette - Desktop only */}
      {!isMobile && (
        <div className="absolute right-8 bottom-0 h-full flex items-end justify-center">
          <svg 
            width="320" 
            height="480" 
            viewBox="0 0 320 480" 
            className="opacity-20 animate-gentle-sway"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Person silhouette */}
            <g fill="hsl(var(--primary))">
              {/* Head */}
              <ellipse cx="160" cy="60" rx="25" ry="30" />
              
              {/* Body */}
              <rect x="140" y="85" width="40" height="80" rx="8" />
              
              {/* Arms - cleaning pose */}
              <ellipse cx="120" cy="110" rx="12" ry="35" transform="rotate(-25 120 110)" />
              <ellipse cx="200" cy="120" rx="12" ry="40" transform="rotate(15 200 120)" />
              
              {/* Legs */}
              <ellipse cx="150" cy="200" rx="10" ry="45" />
              <ellipse cx="170" cy="200" rx="10" ry="45" />
              
              {/* Cleaning tool */}
              <rect x="195" y="80" width="4" height="60" rx="2" transform="rotate(15 197 110)" />
              <ellipse cx="205" cy="75" rx="8" ry="4" transform="rotate(15 205 75)" />
            </g>
            
            {/* Cleaning sparkles */}
            <g fill="hsl(var(--accent))" opacity="0.6">
              <circle cx="220" cy="90" r="2" className="animate-twinkle" />
              <circle cx="240" cy="110" r="1.5" className="animate-twinkle" style={{ animationDelay: '1s' }} />
              <circle cx="230" cy="130" r="1" className="animate-twinkle" style={{ animationDelay: '2s' }} />
              <circle cx="250" cy="105" r="1.5" className="animate-twinkle" style={{ animationDelay: '0.5s' }} />
            </g>
          </svg>
        </div>
      )}

      {/* Mobile simplified background */}
      {isMobile && (
        <>
          <div className="absolute top-10 right-6 w-16 h-16 bg-primary/15 rounded-full blur-lg animate-float" />
          <div className="absolute bottom-20 left-6 w-12 h-12 bg-accent/20 rounded-full blur-md animate-float" style={{ animationDelay: '1.5s' }} />
          
          {/* Mobile cleaning elements */}
          <div className="absolute top-1/3 right-8 opacity-30">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="15" fill="hsl(var(--primary))" opacity="0.3" />
              <circle cx="20" cy="20" r="8" fill="hsl(var(--accent))" opacity="0.5" />
              <circle cx="20" cy="20" r="3" fill="hsl(var(--secondary))" />
            </svg>
          </div>
        </>
      )}
    </div>
  );
});

BackgroundElements.displayName = "BackgroundElements";