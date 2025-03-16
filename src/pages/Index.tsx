
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Suspense, lazy, useCallback, useMemo } from 'react';
import Hero from '../components/hero';
import ProgressBar from '../components/booking/ProgressBar';
import { AnimatePresence, motion } from 'framer-motion';
import { useBookingForm } from '../hooks/useBookingForm';
import { toast } from 'sonner';
import { ErrorBoundary } from 'react-error-boundary';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Frequency } from '@/types/enums';
import { ServiceType } from '@/schemas/booking';
import { SectionLoading } from '@/components/ui/section-loading';
import { LazyOurOptions, LazyWhyChooseUs, LazyTestimonials, LazyBookingSummary, LazyBookingContent } from '../components/lazy-components';
import { performanceMonitor } from '@/utils/performance-monitor';
import { useComponentTimer } from '@/hooks/useComponentTimer';

// Simple error fallback component
const ErrorFallback = () => (
  <div className="text-center py-8">
    <p>Something went wrong loading this section.</p>
  </div>
);

const Index = () => {
  // Start performance timer
  const { startTimer, endTimer } = useComponentTimer('IndexPage');
  
  const { form, currentStep, handleNextStep, handleBackStep, watch, setValue } = useBookingForm();
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Memoize watched values to prevent unnecessary re-renders
  const selectedService = watch('service');
  const frequency = watch('frequency');
  const hours = watch('hours');
  const date = watch('date');
  const bedrooms = watch('bedrooms');
  const bathrooms = watch('bathrooms');
  const selectedExtras = watch('extras') || [];
  const postalCode = watch('postalCode') || '';

  // Memoize price calculation to prevent unnecessary recalculation
  const currentPrice = useMemo(() => {
    startTimer('priceCalculation');
    const price = frequency === Frequency.Weekly ? 27 : 
                 frequency === Frequency.BiWeekly ? 30 : 35;
    endTimer('priceCalculation');
    return price;
  }, [frequency, startTimer, endTimer]);

  // Memoize handlers to prevent unnecessary re-renders
  const handleNext = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    handleNextStep();
    if (currentStep === 2) {
      toast.success("Great! Let's complete your booking details.");
    }
  }, [currentStep, handleNextStep]);

  const handleBack = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    handleBackStep();
  }, [handleBackStep]);

  const handleHeroNextStep = useCallback(() => {
    handleNextStep();
  }, [handleNextStep]);

  // Memoize service setter to prevent unnecessary re-renders
  const setSelectedService = useCallback((service) => {
    setValue('service', service);
  }, [setValue]);

  // Memoize postal code setter to prevent unnecessary re-renders
  const setPostalCode = useCallback((code) => {
    setValue('postalCode', code);
  }, [setValue]);

  return (
    <div className="min-h-screen font-raleway bg-theme-lightblue dark:bg-gray-900 transition-colors duration-300">
      <AnimatePresence mode="wait">
        {currentStep === 1 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-theme-lightblue dark:bg-gray-900"
          >
            {/* Landing page content */}
            <Hero 
              selectedService={selectedService || ''}
              setSelectedService={setSelectedService}
              postalCode={postalCode}
              setPostalCode={setPostalCode}
              handleNextStep={handleHeroNextStep}
            />
            
            <div className="wave-divider bg-white dark:bg-gray-800 h-16 md:h-24"></div>
            
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <LazyWhyChooseUs />
            </ErrorBoundary>
            
            <div className="wave-divider bg-theme-lightblue dark:bg-gray-900 h-16 md:h-24"></div>
            
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <LazyOurOptions />
            </ErrorBoundary>
            
            <div className="wave-divider bg-white dark:bg-gray-800 h-16 md:h-24"></div>
            
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <LazyTestimonials />
            </ErrorBoundary>
          </motion.div>
        ) : (
          <motion.div
            className="pt-20 md:pt-24 pb-24 md:pb-32 px-4 md:pt-32 bg-theme-lightblue dark:bg-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="max-w-7xl mx-auto">
              <ProgressBar currentStep={currentStep} />
              
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 relative">
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <LazyBookingContent 
                    currentStep={currentStep}
                    selectedService={selectedService || ''}
                    form={form}
                  />
                </ErrorBoundary>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className={`w-full md:w-[20%] ${isMobile ? 'fixed bottom-0 left-0 right-0 z-20' : 'relative'}`}
                >
                  <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <LazyBookingSummary 
                      selectedService={selectedService || ''}
                      frequency={frequency || ''}
                      hours={hours}
                      currentPrice={currentPrice}
                      selectedExtras={selectedExtras}
                    />
                  </ErrorBoundary>
                </motion.div>
              </div>

              <div className="flex justify-between mt-8 pb-20 md:pb-0">
                <Button 
                  onClick={handleBack}
                  variant="outline"
                  className="rounded-xl h-10 md:h-12 hover:bg-white/50 hover:text-primary dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                {currentStep < 3 && (
                  <Button 
                    onClick={handleNext}
                    className="bg-primary hover:bg-primary/90 text-white rounded-xl h-10 md:h-12 shadow-[0_8px_15px_rgba(126,188,230,0.2)] hover:shadow-[0_8px_15px_rgba(126,188,230,0.4)] dark:bg-primary dark:text-white dark:hover:bg-primary/90"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
