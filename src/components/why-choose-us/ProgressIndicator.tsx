
import React from "react";
import { whyChooseUsContent } from "./WhyChooseUsContent";

interface ProgressIndicatorProps {
  activeSection: number;
  sections: typeof whyChooseUsContent;
  containerRef: React.RefObject<HTMLDivElement>;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  activeSection, 
  sections, 
  containerRef 
}) => {
  return (
    <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
      {sections.map((_, index) => (
        <div 
          key={index}
          className={`w-2 h-2 rounded-full transition-all duration-500 ${
            index === activeSection 
              ? 'bg-white w-6' 
              : 'bg-white/40'
          }`}
          aria-label={`Section ${index + 1} of ${sections.length}`}
          role="button"
          tabIndex={0}
          onClick={() => {
            // Scroll to the corresponding section when indicator is clicked
            if (containerRef.current) {
              const sections = containerRef.current.querySelectorAll('.content-section');
              sections[index].scrollIntoView({ behavior: 'smooth' });
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              if (containerRef.current) {
                const sections = containerRef.current.querySelectorAll('.content-section');
                sections[index].scrollIntoView({ behavior: 'smooth' });
              }
            }
          }}
        ></div>
      ))}
    </div>
  );
};

export default ProgressIndicator;
