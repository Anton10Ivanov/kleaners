
import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import MobileView from "./why-choose-us/MobileView";
import DesktopView from "./why-choose-us/DesktopView";
import Animations from "./why-choose-us/Animations";

const WhyChooseUs = () => {
  const [activeSection, setActiveSection] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section id="about" className="py-16 md:py-24 bg-theme-lightblue dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 drop-shadow-sm">
            Why Choose Kleaners.de
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Experience the difference with our professional cleaning service. We combine quality, reliability, and flexibility to give you the best possible cleaning experience.
          </p>
        </div>
        
        {isMobile ? <MobileView /> : <DesktopView activeSection={activeSection} setActiveSection={setActiveSection} />}
      </div>
      
      <Animations />
    </section>
  );
};

export default WhyChooseUs;
