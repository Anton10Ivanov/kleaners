import { memo } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

export const BackgroundElements = memo(() => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-orange-50/30" />
      
      {/* Large geometric shapes */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-orange-200/20 to-orange-300/30 rounded-full blur-3xl animate-float" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-blue-200/25 to-blue-300/35 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }} />
      
      {/* Layered wave patterns */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute bottom-0 left-0 w-full h-1/2" viewBox="0 0 1200 600" preserveAspectRatio="none">
          <path d="M0,400 C300,300 600,500 900,400 C1050,350 1150,400 1200,350 L1200,600 L0,600 Z" 
                fill="hsl(var(--accent))" className="animate-wave" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-full h-1/2" viewBox="0 0 1200 600" preserveAspectRatio="none">
          <path d="M0,450 C400,350 800,550 1200,400 L1200,600 L0,600 Z" 
                fill="hsl(var(--primary))" className="animate-wave-slow" />
        </svg>
      </div>

      {/* Floating cleaning elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soap bubbles */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white/40 rounded-full shadow-lg animate-bubble-float" />
        <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-white/30 rounded-full shadow-lg animate-bubble-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-white/50 rounded-full shadow-lg animate-bubble-float" style={{ animationDelay: '4s' }} />
        <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-white/60 rounded-full shadow-lg animate-bubble-float" style={{ animationDelay: '1s' }} />
        
        {/* Sparkle elements */}
        <div className="absolute top-1/5 right-1/5 w-1 h-8 bg-gradient-to-b from-orange-300 to-transparent rotate-45 animate-sparkle" />
        <div className="absolute top-1/5 right-1/5 w-8 h-1 bg-gradient-to-r from-orange-300 to-transparent animate-sparkle" />
        <div className="absolute bottom-1/4 left-1/5 w-1 h-6 bg-gradient-to-b from-blue-300 to-transparent rotate-45 animate-sparkle" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-1/4 left-1/5 w-6 h-1 bg-gradient-to-r from-blue-300 to-transparent animate-sparkle" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Professional illustration - Desktop */}
      {!isMobile && (
        <div className="absolute right-16 bottom-0 h-full flex items-end justify-center">
          <svg 
            width="400" 
            height="500" 
            viewBox="0 0 400 500" 
            className="opacity-25 animate-gentle-sway"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Cleaning professional */}
            <g>
              {/* Shadow */}
              <ellipse cx="200" cy="480" rx="60" ry="15" fill="hsl(var(--primary))" opacity="0.1" />
              
              {/* Person body */}
              <g fill="hsl(var(--primary))" opacity="0.8">
                {/* Head */}
                <circle cx="200" cy="80" r="35" />
                
                {/* Hair */}
                <path d="M170,60 Q200,40 230,60 Q225,45 200,40 Q175,45 170,60" fill="hsl(var(--secondary))" />
                
                {/* Body */}
                <rect x="175" y="110" width="50" height="120" rx="15" />
                
                {/* Uniform details */}
                <rect x="185" y="120" width="30" height="8" rx="4" fill="hsl(var(--accent))" />
                <circle cx="195" cy="140" r="3" fill="hsl(var(--accent))" />
                <circle cx="205" cy="140" r="3" fill="hsl(var(--accent))" />
                
                {/* Arms */}
                <ellipse cx="150" cy="150" rx="15" ry="45" transform="rotate(-20 150 150)" />
                <ellipse cx="250" cy="160" rx="15" ry="50" transform="rotate(25 250 160)" />
                
                {/* Legs */}
                <ellipse cx="185" cy="270" rx="12" ry="60" />
                <ellipse cx="215" cy="270" rx="12" ry="60" />
                
                {/* Feet */}
                <ellipse cx="180" cy="340" rx="18" ry="8" />
                <ellipse cx="220" cy="340" rx="18" ry="8" />
              </g>
              
              {/* Cleaning equipment */}
              <g fill="hsl(var(--accent))" opacity="0.9">
                {/* Mop handle */}
                <rect x="265" y="120" width="6" height="140" rx="3" />
                
                {/* Mop head */}
                <ellipse cx="268" cy="270" rx="20" ry="12" />
                <path d="M250,275 Q268,285 286,275 Q280,290 268,292 Q256,290 250,275" fill="hsl(var(--secondary))" opacity="0.7" />
                
                {/* Cleaning spray */}
                <rect x="125" y="130" width="12" height="20" rx="6" fill="hsl(var(--primary))" />
                <rect x="128" y="125" width="6" height="8" rx="3" fill="hsl(var(--accent))" />
                
                {/* Spray effect */}
                <circle cx="110" cy="125" r="2" fill="hsl(var(--accent))" opacity="0.6" className="animate-spray" />
                <circle cx="115" cy="120" r="1.5" fill="hsl(var(--accent))" opacity="0.6" className="animate-spray" style={{ animationDelay: '0.3s' }} />
                <circle cx="105" cy="130" r="1" fill="hsl(var(--accent))" opacity="0.6" className="animate-spray" style={{ animationDelay: '0.6s' }} />
              </g>
              
              {/* Cleaning effects */}
              <g fill="hsl(var(--accent))" opacity="0.4">
                <circle cx="300" cy="250" r="3" className="animate-twinkle" />
                <circle cx="320" cy="230" r="2" className="animate-twinkle" style={{ animationDelay: '1s' }} />
                <circle cx="310" cy="270" r="2.5" className="animate-twinkle" style={{ animationDelay: '2s' }} />
                <circle cx="330" cy="250" r="1.5" className="animate-twinkle" style={{ animationDelay: '0.5s' }} />
              </g>
            </g>
          </svg>
        </div>
      )}

      {/* Mobile optimized elements */}
      {isMobile && (
        <>
          {/* Simplified floating elements */}
          <div className="absolute top-16 right-8 w-20 h-20 bg-gradient-to-br from-orange-200/30 to-orange-300/40 rounded-full blur-xl animate-float" />
          <div className="absolute bottom-24 left-8 w-16 h-16 bg-gradient-to-tr from-blue-200/30 to-blue-300/40 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }} />
          
          {/* Mobile cleaning icon */}
          <div className="absolute top-1/3 right-12 opacity-20">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <circle cx="30" cy="30" r="25" fill="hsl(var(--primary))" opacity="0.3" />
              <circle cx="30" cy="30" r="15" fill="hsl(var(--accent))" opacity="0.5" />
              <rect x="27" y="10" width="6" height="20" rx="3" fill="hsl(var(--secondary))" />
              <circle cx="30" cy="45" r="8" fill="hsl(var(--accent))" opacity="0.7" />
            </svg>
          </div>
        </>
      )}
    </div>
  );
});

BackgroundElements.displayName = "BackgroundElements";