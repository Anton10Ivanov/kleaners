import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { memo } from "react";
import heroCleanerImage from "@/assets/hero-cleaner-orange.jpg";
import { ContentGrid } from "../layout/ContentGrid";
import { FluidTypography } from "../layout/FluidTypography";
import { ModernCard } from "../layout/ModernCard";
<<<<<<< HEAD
import { LazyImage } from "@/components/ui/LazyImage";
=======
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf

interface HeroContentProps {
  onGetQuote: () => void;
}

export const HeroContent = memo(({
  onGetQuote
}: HeroContentProps) => {
  return (
    <ContentGrid variant="asymmetric" gap="xl" className="items-center">
      {/* Left Column - Content */}
      <div className="space-y-8 text-center lg:text-left">
        {/* Main Headline */}
        <div className="space-y-6">
          <FluidTypography 
            variant="display" 
            weight="extrabold" 
            className="text-accent leading-[0.9] tracking-tight"
          >
            Professional<br />
            <span className="text-primary">Cleaning</span><br />
            Services
          </FluidTypography>
          
          {/* Subheadline */}
          <FluidTypography 
            variant="subheading" 
            weight="medium" 
            color="secondary"
            className="max-w-2xl"
          >
            Transform your space with our expert cleaning team. Reliable, thorough, and tailored to your needs.
          </FluidTypography>
        </div>

        {/* Trust Indicators */}
        <ContentGrid variant="masonry" gap="md" className="justify-center lg:justify-start max-w-md">
          <ModernCard variant="glass" padding="md" className="text-center">
            <FluidTypography variant="heading" weight="bold" className="text-primary">500+</FluidTypography>
            <FluidTypography variant="caption" color="muted">Happy Clients</FluidTypography>
          </ModernCard>
          <ModernCard variant="glass" padding="md" className="text-center">
            <FluidTypography variant="heading" weight="bold" className="text-primary">5★</FluidTypography>
            <FluidTypography variant="caption" color="muted">Average Rating</FluidTypography>
          </ModernCard>
          <ModernCard variant="glass" padding="md" className="text-center">
            <FluidTypography variant="heading" weight="bold" className="text-primary">100%</FluidTypography>
            <FluidTypography variant="caption" color="muted">Satisfaction</FluidTypography>
          </ModernCard>
        </ContentGrid>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Button 
            onClick={onGetQuote}
            size="lg" 
            className="btn-modern bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Get Free Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="btn-modern border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold px-8 py-4 text-lg rounded-2xl transition-all duration-300"
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Right Column - Visual */}
      <div className="relative">
        <ModernCard 
          variant="elevated" 
          padding="none" 
          className="aspect-[4/5] relative overflow-hidden card-modern-hover"
        >
<<<<<<< HEAD
          <LazyImage 
=======
          <img 
>>>>>>> dc44d81132ea9da53ee6737f03f43d7881530caf
            src={heroCleanerImage} 
            alt="Professional cleaning service specialist with orange uniform" 
            className="w-full h-full object-cover"
          />
        </ModernCard>
        
        {/* Floating Elements */}
        <ModernCard 
          variant="glass" 
          padding="md"
          className="absolute -top-4 -right-4 animate-bounce-gentle"
        >
          <FluidTypography variant="body" weight="bold" className="text-primary">
            Same Day Service
          </FluidTypography>
        </ModernCard>
      </div>
    </ContentGrid>
  );
});

HeroContent.displayName = "HeroContent";