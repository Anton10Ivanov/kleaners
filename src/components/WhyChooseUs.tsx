
import { MapPin, Euro, Settings, Calendar, X, Star, Clock, Shield, Sparkles } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

const WhyChooseUs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
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
          className={`p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-300 ${item.color} bg-opacity-10 dark:bg-opacity-20 hover:scale-[1.02] hover:shadow-lg`}
        >
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-lg ${item.color} text-white`}>
              <item.icon className="w-6 h-6" />
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

  // Handle improved sticky scroll effect for desktop
  useEffect(() => {
    if (isMobile || !containerRef.current) return;

    const container = containerRef.current;
    const options = {
      root: null,
      rootMargin: '-45% 0px -45% 0px', // Adjust this to control when sections become active
      threshold: 0
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = sectionRefs.current.findIndex(ref => ref === entry.target);
          if (index !== -1) {
            setActiveSection(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    
    // Observe all section elements
    sectionRefs.current.forEach(section => {
      if (section) observer.observe(section);
    });
    
    return () => {
      sectionRefs.current.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, [isMobile]);

  // Desktop sticky scroll view with improved behavior
  const DesktopView = () => (
    <div className="flex gap-16 relative min-h-[120vh]">
      {/* Left scrollable content */}
      <div className="w-1/2 space-y-[85vh] py-[40vh]" ref={containerRef}>
        {content.map((item, index) => (
          <div 
            key={index} 
            className="sticky-section h-[70vh] flex items-center"
            ref={el => sectionRefs.current[index] = el}
          >
            <div className={`transition-all duration-500 transform ${activeSection === index ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-4'}`}>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {item.title}
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-lg">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Right sticky content with animated transitions */}
      <div className="w-1/2 sticky top-32 h-[70vh]">
        <div 
          className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl"
          style={{
            backgroundImage: `linear-gradient(135deg, var(--from-color), var(--to-color))`,
            "--from-color": content[activeSection].color.includes("from-") ? 
              `var(--${content[activeSection].color.split("from-")[1].split(" ")[0]})` : 
              "#3b82f6",
            "--to-color": content[activeSection].color.includes("to-") ? 
              `var(--${content[activeSection].color.split("to-")[1].split(" ")[0]})` : 
              "#10b981"
          } as React.CSSProperties}
        >
          <div className="absolute inset-0 w-full h-full flex items-center justify-center text-white p-12 backdrop-blur-sm">
            <div className="text-center max-w-md transform transition-all duration-500 animate-scale-in">
              {(() => {
                const IconComponent = content[activeSection].icon;
                return (
                  <div className="bg-white/20 p-6 rounded-full inline-block mb-8">
                    <IconComponent className="w-20 h-20" />
                  </div>
                );
              })()}
              <h3 className="text-4xl font-bold mb-4">{content[activeSection].title}</h3>
              <p className="text-xl">{content[activeSection].description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="about" className="py-20 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            Why Choose Kleaners.de
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience the difference with our professional cleaning service. We combine quality, reliability, and flexibility to give you the best possible cleaning experience.
          </p>
        </div>
        
        {isMobile ? <MobileView /> : <DesktopView />}
      </div>
    </section>
  );
};

export default WhyChooseUs;
