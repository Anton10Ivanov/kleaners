import { memo } from "react";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import heroCleanerImage from "@/assets/hero-cleaner-orange.jpg";
interface HeroContentProps {
  onGetQuote: () => void;
}
export const HeroContent = memo(({
  onGetQuote
}: HeroContentProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return <div className={`grid ${isMobile ? 'grid-cols-1 gap-12 text-center' : 'grid-cols-2 gap-16 lg:gap-20'} items-center min-h-[calc(100vh-200px)]`}>
      {/* Left content - Enhanced typography and spacing */}
      <div className={`${isMobile ? 'order-2' : 'order-1'} space-y-8 lg:space-y-10`}>
        {/* Trust badge */}
        

        {/* Main headline with better typography */}
        <div className="space-y-4">
          <h1 className={`font-bold leading-[1.1] tracking-tight ${isMobile ? 'text-4xl sm:text-5xl' : 'text-5xl lg:text-6xl xl:text-7xl'}`}>
            <span className="block text-accent">Professional</span>
            <span className="block text-accent">Cleaning</span>
            <span className="block bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              Made Simple
            </span>
          </h1>
          
          <div className="w-16 h-1 bg-secondary mx-auto md:mx-0 rounded-full"></div>
        </div>
        
        {/* Enhanced description */}
        <p className={`text-muted-foreground leading-relaxed ${isMobile ? 'text-lg' : 'text-xl lg:text-2xl'} max-w-lg font-light`}>
          Experience spotless results with our eco-friendly cleaning solutions. 
          <span className="font-medium text-foreground"> Trusted by 2,500+ homeowners</span> across the city.
        </p>

        {/* Value propositions */}
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          <div className="flex items-center gap-2 bg-secondary/10 border border-secondary/20 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-secondary rounded-full"></div>
            <span className="text-sm font-medium text-secondary">Same-day booking</span>
          </div>
          <div className="flex items-center gap-2 bg-secondary/10 border border-secondary/20 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-secondary rounded-full"></div>
            <span className="text-sm font-medium text-secondary">Eco-friendly products</span>
          </div>
          <div className="flex items-center gap-2 bg-secondary/10 border border-secondary/20 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-secondary rounded-full"></div>
            <span className="text-sm font-medium text-secondary">100% satisfaction</span>
          </div>
        </div>
        
        {/* Simple CTA Button */}
        <div className="space-y-6">
          <div className="space-y-4">
            <Button 
              onClick={onGetQuote} 
              size="lg" 
              className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold rounded-xl h-16 px-8 text-xl shadow-[0_8px_25px_rgba(0,255,135,0.3)] hover:shadow-[0_12px_35px_rgba(0,255,135,0.4)] transform hover:-translate-y-1 transition-all duration-300 group"
            >
              Get Your Free Quote Now
              <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
            
            <p className="text-sm text-muted-foreground text-center">
              ✓ No obligation • ✓ Instant pricing • ✓ Book in 60 seconds
            </p>
          </div>
        </div>
      </div>

      {/* Right content - Enhanced image presentation */}
      <div className={`${isMobile ? 'order-1' : 'order-2'} flex justify-center items-center`}>
        <div className="relative w-full max-w-lg">
          {/* Background decorative elements */}
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-secondary/15 rounded-full blur-2xl"></div>
          
          {/* Main image */}
          <div className="relative z-10">
            <img src={heroCleanerImage} alt="Professional cleaning service specialist with orange uniform" className="w-full h-auto object-cover rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-500" />
            
            {/* Floating badge - Hunter Green for secondary support */}
            <div className="absolute -bottom-6 -left-6 bg-secondary text-secondary-foreground px-6 py-4 rounded-2xl shadow-lg">
              <div className="text-2xl font-bold">2.5K+</div>
              <div className="text-sm opacity-90">Happy Clients</div>
            </div>
          </div>
        </div>
      </div>
    </div>;
});
HeroContent.displayName = "HeroContent";