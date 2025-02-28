
import { MapPin, Euro, Settings, Calendar, X, Star, Clock, Shield, Sparkles } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

const WhyChooseUs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Content sections for the sticky scroll effect
  const content = [
    {
      title: "Local Cleaners",
      description: "Our cleaners live in your area, thanks to our postal code-based system. This means no travel fees and prompt arrivals for every appointment.",
      icon: MapPin,
      color: "bg-gradient-to-br from-cyan-500 to-emerald-500"
    },
    {
      title: "Transparent Pricing",
      description: "No hidden costs or surprise charges. With our fixed pricing structure, you'll know exactly what you're paying from the start, giving you peace of mind.",
      icon: Euro,
      color: "bg-gradient-to-br from-orange-500 to-yellow-500"
    },
    {
      title: "Customizable Service",
      description: "Every home is unique, and so are your cleaning needs. Tailor our services to match your specific requirements and adjust the cleaning scope as needed.",
      icon: Settings,
      color: "bg-gradient-to-br from-purple-500 to-pink-500"
    },
    {
      title: "Flexible Scheduling",
      description: "Life is busy, and we understand that. Book appointments that work with your schedule, with availability Monday through Saturday.",
      icon: Calendar,
      color: "bg-gradient-to-br from-blue-500 to-teal-500"
    },
    {
      title: "No Long-Term Commitments",
      description: "We're confident in our service quality without locking you into contracts. Book as needed, and cancel anytime with no penalties.",
      icon: X,
      color: "bg-gradient-to-br from-red-500 to-pink-500"
    },
    {
      title: "Exceptional Results",
      description: "Our 95% success rate speaks volumes about our dedication to quality. Experience the difference with cleaners who truly care about their work.",
      icon: Star,
      color: "bg-gradient-to-br from-amber-500 to-orange-500"
    }
  ];

  // Create stacked card list for mobile with improved visual design
  const MobileView = () => (
    <div className="space-y-6 pt-4">
      {content.map((item, index) => (
        <div 
          key={index}
          className={`p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:scale-102 ${item.color} bg-opacity-10 dark:bg-opacity-20`}
        >
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-lg ${item.color} bg-opacity-90 text-white shadow-lg`}>
              <item.icon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Enhanced scroll effect for desktop with better sensitivity
  useEffect(() => {
    if (isMobile || !containerRef.current) return;

    const container = containerRef.current;
    const sections = Array.from(container.querySelectorAll('.content-section'));
    
    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const scrollMiddle = window.innerHeight / 2;
      
      // Find which section is currently most visible in the viewport
      let closestSection = 0;
      let closestDistance = Infinity;
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        // Improved calculation for more accurate section detection
        const sectionMiddle = rect.top + rect.height / 2;
        const distance = Math.abs(sectionMiddle - scrollMiddle);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestSection = index;
        }
      });
      
      // Add a threshold to avoid too frequent updates
      // This ensures smoother transitions when scrolling quickly
      if (closestSection !== activeSection) {
        setActiveSection(closestSection);
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
  }, [isMobile, activeSection]);

  // Desktop sticky scroll view with enhanced transitions
  const DesktopView = () => (
    <div className="flex gap-10 lg:gap-16 relative">
      {/* Left scrollable content - optimized spacing for smooth transitions */}
      <div className="w-1/2 space-y-32 pb-[30vh]" ref={containerRef}>
        {content.map((item, index) => (
          <div 
            key={index} 
            className="content-section h-[50vh] flex items-center"
          >
            <div 
              className={`transition-all duration-500 ease-in-out px-4 py-6 rounded-xl 
                ${activeSection === index 
                  ? 'opacity-100 transform translate-y-0 scale-105 shadow-lg' 
                  : 'opacity-40 transform translate-y-4'}`
              }
            >
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-shadow">
                {item.title}
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Right sticky content with enhanced visual appeal */}
      <div className="w-1/2 sticky top-24 h-[75vh] flex items-center">
        <div 
          className={`w-full h-full rounded-2xl overflow-hidden transition-all duration-500 transform ${
            activeSection !== undefined ? content[activeSection].color : content[0].color
          } shadow-xl`}
        >
          <div className="relative w-full h-full flex items-center justify-center text-white p-10 overflow-hidden">
            {/* Background pattern for visual interest */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
              <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
            </div>
            
            <div className="text-center transform transition-all duration-500 z-10">
              {(() => {
                const IconComponent = content[activeSection].icon;
                return (
                  <div className="mb-8 p-6 rounded-full bg-white/20 inline-block backdrop-blur-sm animate-fadeIn shadow-inner">
                    <IconComponent className="w-20 h-20" />
                  </div>
                );
              })()}
              <h3 className="text-4xl font-bold mb-4 animate-fadeIn text-shadow">
                {content[activeSection].title}
              </h3>
              <p className="text-xl max-w-md mx-auto animate-fadeIn font-medium text-white/90">
                {content[activeSection].description}
              </p>
            </div>
          </div>
          
          {/* Progress indicator */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
            {content.map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeSection 
                    ? 'bg-white w-6' 
                    : 'bg-white/40'
                }`}
                aria-label={`Section ${index + 1} of ${content.length}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="about" className="py-16 md:py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-shadow">
            Why Choose Kleaners.de
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-medium">
            Experience the difference with our professional cleaning service. We combine quality, reliability, and flexibility to give you the best possible cleaning experience.
          </p>
        </div>
        
        {isMobile ? <MobileView /> : <DesktopView />}
      </div>
      
      <style jsx global>{`
        .text-shadow {
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;
