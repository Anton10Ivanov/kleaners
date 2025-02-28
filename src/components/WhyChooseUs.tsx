
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

  // Create stacked card list for mobile
  const MobileView = () => (
    <div className="space-y-6 pt-4">
      {content.map((item, index) => (
        <div 
          key={index}
          className={`p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-300 ${item.color} bg-opacity-10 dark:bg-opacity-20`}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-white/20 dark:bg-black/20 backdrop-blur-sm">
              <item.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-800 dark:text-gray-200">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Handle scroll effect for desktop
  useEffect(() => {
    if (isMobile || !containerRef.current) return;

    const container = containerRef.current;
    const sections = Array.from(container.querySelectorAll('.content-section'));
    
    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const scrollMiddle = window.innerHeight / 2;
      
      // Find which section is currently most centered in the viewport
      let closestSection = 0;
      let closestDistance = Infinity;
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - scrollMiddle);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestSection = index;
        }
      });
      
      setActiveSection(closestSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Desktop sticky scroll view
  const DesktopView = () => (
    <div className="flex gap-16 relative">
      {/* Left scrollable content */}
      <div className="w-1/2 space-y-80 pb-[40vh]" ref={containerRef}>
        {content.map((item, index) => (
          <div key={index} className="content-section h-[30vh] flex items-center">
            <div className={`transition-opacity duration-500 ${activeSection === index ? 'opacity-100' : 'opacity-40'}`}>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {item.title}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Right sticky content */}
      <div className="w-1/2 sticky top-32 h-[70vh]">
        <div className={`w-full h-full rounded-2xl transition-all duration-500 overflow-hidden ${content[activeSection].color}`}>
          <div className="w-full h-full flex items-center justify-center text-white p-10">
            <div className="text-center">
              {/* This is the line that had syntax errors */}
              {(() => {
                const IconComponent = content[activeSection].icon;
                return <IconComponent className="w-24 h-24 mx-auto mb-6" />;
              })()}
              <h3 className="text-3xl font-bold mb-2">{content[activeSection].title}</h3>
              <p className="text-xl max-w-md">{content[activeSection].description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="about" className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Why Choose Kleaners.de
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience the difference with our professional cleaning service. We combine quality, reliability, and flexibility to give you the best possible cleaning experience.
          </p>
        </div>
        
        {isMobile ? <MobileView /> : <DesktopView />}
      </div>
    </section>
  );
};

export default WhyChooseUs;
