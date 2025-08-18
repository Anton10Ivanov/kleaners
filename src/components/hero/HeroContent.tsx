import { memo } from "react";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import heroCleanerImage from "@/assets/hero-cleaner-orange.jpg";

interface HeroContentProps {
  onGetQuote: () => void;
}

export const HeroContent = memo(({ onGetQuote }: HeroContentProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className={`grid ${isMobile ? 'grid-cols-1 gap-8' : 'grid-cols-2 gap-12'} items-center h-full`}>
      {/* Left content */}
      <div className={`${isMobile ? 'text-center' : 'text-left'} space-y-6`}>
        <h1 className={`font-bold leading-tight ${isMobile ? 'text-4xl' : 'text-5xl lg:text-6xl'}`}>
          <span className="text-primary">A Clean Home</span>
          <br />
          <span className="text-primary">is a Happy</span>
          <br />
          <span className="text-primary">Home</span>
        </h1>
        
        <p className={`text-muted-foreground leading-relaxed ${isMobile ? 'text-lg' : 'text-xl'} max-w-md`}>
          We offer top-rated cleaning services to keep your home sparkling clean.
        </p>
        
        <Button 
          onClick={onGetQuote}
          size="lg"
          className={`bg-primary hover:bg-primary-hover text-primary-foreground font-semibold rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 ${isMobile ? 'w-full' : 'w-auto'}`}
        >
          Get an Instant Quote
        </Button>
      </div>

      {/* Right content - Person image */}
      {!isMobile && (
        <div className="flex justify-center items-center">
          <div className="relative w-full max-w-md">
            <img 
              src={heroCleanerImage}
              alt="Professional cleaning service specialist with orange uniform"
              className="w-full h-auto object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
});

HeroContent.displayName = "HeroContent";