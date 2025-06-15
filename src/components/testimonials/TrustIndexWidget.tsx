
import React, { useEffect, useRef } from 'react';
import { SectionLoading } from '@/components/ui/section-loading';

const TrustIndexWidget = () => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure the TrustIndex script has loaded and initialize the widget
    const initializeWidget = () => {
      if (widgetRef.current && typeof window !== 'undefined') {
        // The TrustIndex script will automatically detect and initialize divs with the proper data attributes
        // We'll add a small delay to ensure the script is fully loaded
        setTimeout(() => {
          if ((window as any).TI) {
            (window as any).TI.init();
          }
        }, 100);
      }
    };

    initializeWidget();
  }, []);

  return (
    <section className="py-8 md:py-12 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Real reviews from real customers who trust our cleaning services.
          </p>
        </div>
        
        <div className="flex justify-center">
          <div 
            ref={widgetRef}
            data-trustindex-widget="ed06e1248098193470661bc87c7"
            className="w-full max-w-4xl"
          >
            {/* Fallback content while TrustIndex loads */}
            <div className="text-center py-8">
              <SectionLoading />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndexWidget;
