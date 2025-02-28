
import { MapPin, Euro, Settings, Calendar, X, Star } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

const WhyChooseUs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Content sections for the sticky scroll effect
  const content = [
    {
      title: "Local Cleaners",
      description: "Our cleaners live in your area, thanks to our postal code-based system. This means no travel fees and prompt arrivals for every appointment.",
      icon: MapPin,
      color: "bg-gradient-to-br from-cyan-500 to-emerald-500",
      image: "/images/local-cleaners.jpg",
      imageFallback: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
      alt: "Local cleaner with cleaning equipment"
    },
    {
      title: "Transparent Pricing",
      description: "No hidden costs or surprise charges. With our fixed pricing structure, you'll know exactly what you're paying from the start, giving you peace of mind.",
      icon: Euro,
      color: "bg-gradient-to-br from-orange-500 to-yellow-500",
      image: "/images/transparent-pricing.jpg",
      imageFallback: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&q=80",
      alt: "Person showing transparent pricing chart"
    },
    {
      title: "Customizable Service",
      description: "Every home is unique, and so are your cleaning needs. Tailor our services to match your specific requirements and adjust the cleaning scope as needed.",
      icon: Settings,
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
      image: "/images/customizable-service.jpg",
      imageFallback: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80",
      alt: "Customizable cleaning options interface"
    },
    {
      title: "Flexible Scheduling",
      description: "Life is busy, and we understand that. Book appointments that work with your schedule, with availability Monday through Saturday.",
      icon: Calendar,
      color: "bg-gradient-to-br from-blue-500 to-teal-500",
      image: "/images/flexible-scheduling.jpg",
      imageFallback: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80",
      alt: "Calendar showing flexible booking options"
    },
    {
      title: "No Long-Term Commitments",
      description: "We're confident in our service quality without locking you into contracts. Book as needed, and cancel anytime with no penalties.",
      icon: X,
      color: "bg-gradient-to-br from-red-500 to-pink-500",
      image: "/images/no-commitments.jpg",
      imageFallback: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80",
      alt: "Person with freedom to choose cleaning services"
    },
    {
      title: "Exceptional Results",
      description: "Our 95% success rate speaks volumes about our dedication to quality. Experience the difference with cleaners who truly care about their work.",
      icon: Star,
      color: "bg-gradient-to-br from-amber-500 to-orange-500",
      image: "/images/exceptional-results.jpg",
      imageFallback: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&q=80",
      alt: "Pristine clean home showing exceptional results"
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

  // Handle scroll for desktop view
  useEffect(() => {
    if (isMobile || !sectionsRef.current) return;

    const handleScroll = () => {
      const container = sectionsRef.current;
      if (!container) return;
      
      const sections = Array.from(container.children);
      let newActiveSection = 0;
      
      // Determine which section is currently most visible in the viewport
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
        
        // If the section is significantly visible and near the center of the viewport
        if (visibleHeight > 0 && rect.top < viewportHeight * 0.6) {
          newActiveSection = index;
        }
      });
      
      setActiveSection(newActiveSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial active section
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  // Desktop sticky scroll view
  const DesktopView = () => (
    <div className="flex gap-8 md:gap-16 relative">
      {/* Left scrollable content */}
      <div className="w-1/2 sticky top-24 h-[80vh] flex items-center">
        <div 
          ref={sectionsRef}
          className="space-y-48" // Generous spacing between sections
          style={{
            paddingTop: '30vh',
            paddingBottom: '40vh'
          }}
        >
          {content.map((item, index) => (
            <div 
              key={index} 
              className="min-h-[20vh] flex items-center"
            >
              <div 
                className={`transition-all duration-500 transform p-6 rounded-xl border border-gray-100 dark:border-gray-800 ${
                  activeSection === index 
                    ? `opacity-100 translate-y-0 shadow-lg ${item.color} bg-opacity-10 dark:bg-opacity-20` 
                    : 'opacity-40 translate-y-4'
                }`}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-base md:text-xl text-gray-600 dark:text-gray-400 max-w-lg">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Right sticky content with images */}
      <div className="w-1/2 sticky top-24 h-[80vh] flex items-center">
        <div className="w-full h-full overflow-hidden rounded-2xl shadow-xl">
          {content.map((item, index) => (
            <div 
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
                activeSection === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img 
                src={item.imageFallback}
                alt={item.alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== item.imageFallback) {
                    target.src = item.imageFallback;
                  }
                }}
              />
              <div className={`absolute inset-0 ${item.color} opacity-60 mix-blend-overlay`}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-3xl font-bold mb-2">{item.title}</h3>
                <p className="text-lg text-white/90">{item.description}</p>
              </div>
            </div>
          ))}
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
