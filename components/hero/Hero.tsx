import { useEffect, memo } from "react";
import { useRouter } from 'next/navigation';
import { HeroContent } from "./HeroContent";
import { BackgroundElements } from "./BackgroundElements";
// Performance monitoring removed to prevent blocking
import environmentUtils from '@/utils/environment';
import { FullWidthSection } from "../layout/FullWidthSection";

export const Hero = memo(() => {
  const router = useRouter();
  const isPreviewWindow = environmentUtils.isPreviewWindow();

  // Simplified Hero component without performance monitoring
  useEffect(() => {
    // Add debug info for preview windows
    if (isPreviewWindow) {
      console.log("Hero: Running in preview window mode");
    }
  }, [isPreviewWindow]);

  const handleGetQuote = () => {
    router.push('/booking');
  };


  return (
    <FullWidthSection 
      background="gradient" 
      spacing="xl" 
      containerSize="ultra-wide"
      className="relative min-h-screen overflow-hidden pt-16 flex items-center"
    >
      {/* Clean background */}
      <BackgroundElements />
      
      {/* Content with modern spacing */}
      <div className="relative z-10 w-full">
        <HeroContent onGetQuote={handleGetQuote} />
      </div>
    </FullWidthSection>
  );
});

Hero.displayName = "Hero";
export default Hero;
