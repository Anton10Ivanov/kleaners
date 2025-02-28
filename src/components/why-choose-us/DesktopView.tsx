
import React, { useRef, useEffect } from "react";
import { whyChooseUsContent } from "./WhyChooseUsContent";
import ProgressIndicator from "./ProgressIndicator";

interface DesktopViewProps {
  activeSection: number;
  setActiveSection: React.Dispatch<React.SetStateAction<number>>;
}

const DesktopView: React.FC<DesktopViewProps> = ({ activeSection, setActiveSection }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Enhanced scroll effect for desktop with better sensitivity and animations
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const sections = Array.from(container.querySelectorAll('.content-section'));
    
    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const scrollMiddle = window.innerHeight / 2;
      
      // Find which section is currently most visible in the viewport
      let maxVisibility = 0;
      let mostVisibleSection = 0;
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        
        // Calculate how much of the section is visible in the viewport
        const visibleTop = Math.max(rect.top, 0);
        const visibleBottom = Math.min(rect.bottom, window.innerHeight);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        
        // Weight sections near the middle of the screen more heavily
        const distanceFromMiddle = Math.abs((rect.top + rect.bottom) / 2 - scrollMiddle);
        const visibility = visibleHeight * (1 - distanceFromMiddle / window.innerHeight);
        
        if (visibility > maxVisibility) {
          maxVisibility = visibility;
          mostVisibleSection = index;
        }
      });
      
      // Only update if the most visible section has changed
      if (mostVisibleSection !== activeSection) {
        setActiveSection(mostVisibleSection);
      }
    };
    
    // Throttle scroll event for better performance
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', scrollListener);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', scrollListener);
  }, [activeSection, setActiveSection]);

  return (
    <div className="flex gap-10 lg:gap-16 relative">
      {/* Left scrollable content - optimized spacing for smooth transitions */}
      <div className="w-1/2 space-y-32 pb-[40vh]" ref={containerRef}>
        {whyChooseUsContent.map((item, index) => (
          <div 
            key={index} 
            className="content-section h-[60vh] flex items-center"
            aria-label={`Feature ${index + 1}: ${item.title}`}
          >
            <div 
              className={`transition-all duration-700 ease-in-out px-4 py-6 rounded-xl 
                ${activeSection === index 
                  ? 'opacity-100 transform translate-y-0 scale-105' 
                  : 'opacity-40 transform translate-y-4'}`
              }
            >
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 drop-shadow-sm">
                {item.title}
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Right sticky content with enhanced visual appeal and animations */}
      <div className="w-1/2 sticky top-24 h-[75vh] flex items-center">
        <div 
          className={`w-full h-full rounded-2xl overflow-hidden transition-all duration-700 transform ${
            activeSection !== undefined ? whyChooseUsContent[activeSection].color : whyChooseUsContent[0].color
          } shadow-xl`}
        >
          <div className="relative w-full h-full flex items-center justify-center text-white p-10 overflow-hidden">
            {/* Background pattern for visual interest */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
              <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
            </div>
            
            <div className="text-center transform transition-all duration-700 z-10">
              {(() => {
                const IconComponent = whyChooseUsContent[activeSection].icon;
                return (
                  <div className="mb-8 p-6 rounded-full bg-white/20 inline-block backdrop-blur-sm animate-pulse shadow-inner">
                    <IconComponent className="w-20 h-20" />
                  </div>
                );
              })()}
              <h3 className="text-4xl font-bold mb-4 animate-fadeIn drop-shadow-md">
                {whyChooseUsContent[activeSection].title}
              </h3>
              <p className="text-xl max-w-md mx-auto animate-fadeIn font-medium text-white/90 leading-relaxed">
                {whyChooseUsContent[activeSection].description}
              </p>
            </div>
          </div>
          
          <ProgressIndicator 
            activeSection={activeSection} 
            sections={whyChooseUsContent}
            containerRef={containerRef}
          />
        </div>
      </div>
    </div>
  );
};

export default DesktopView;
