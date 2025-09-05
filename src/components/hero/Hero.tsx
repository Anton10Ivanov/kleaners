import { useEffect, memo } from "react";
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from "@/hooks/use-media-query";
import { HeroContent } from "./HeroContent";
import { BackgroundElements } from "./BackgroundElements";
import { performanceMonitor } from "@/utils/performance";
import { useComponentTimer } from "@/hooks/useComponentTimer";
import environmentUtils from "@/utils/environment";
import { FullWidthSection } from "../layout/FullWidthSection";

export const Hero = memo(() => {
  const navigate = useNavigate();
  const {
    startTimer,
    endTimer
  } = useComponentTimer('Hero');
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isPreviewWindow = environmentUtils.isPreviewWindow();

  // Mark Hero as important for Core Web Vitals
  useEffect(() => {
    performanceMonitor.markAsImportant('Hero');

    // Add debug info for preview windows
    if (isPreviewWindow) {
      console.log("Hero: Running in preview window mode");
    }
  }, [isPreviewWindow]);

  const handleGetQuote = () => {
    startTimer('navigateToBooking');
    navigate('/booking');
    endTimer('navigateToBooking');
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
