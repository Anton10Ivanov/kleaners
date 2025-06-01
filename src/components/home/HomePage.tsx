
import { Suspense, lazy, useCallback, useMemo, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { ErrorBoundary } from 'react-error-boundary';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Frequency, ServiceType } from '@/schemas/booking';
import { SectionLoading } from '@/components/ui/section-loading';
import { performanceMonitor } from '@/utils/performance'; 
import { useComponentTimer } from '@/hooks/useComponentTimer';
import { useBookingForm } from '../hooks/useBookingForm';

import Hero from '../hero';
import MobileBookingSummary from '../booking/MobileBookingSummary';
import { ServiceCategoriesSection } from '../services/ServiceCategoriesSection';
import { serviceCategories } from '@/components/navbar/navigationData';
import { HomeSections } from './HomeSections';
import { BookingSteps } from './BookingSteps';

// Optimized lazy loading
const LazyBookingContent = lazy(() => import('../booking/BookingContent'));

// Simple error fallback component
const ErrorFallback = () => (
  <div className="text-center py-8">
    <p>Something went wrong loading this section.</p>
  </div>
);

const HomePage = () => {
  const { startTimer, endTimer } = useComponentTimer('HomePage');
  const { form, currentStep, handleNextStep, handleBackStep, watch, setValue } = useBookingForm();
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Performance monitoring
  useEffect(() => {
    performanceMonitor.markAsImportant('HomePage');
    startTimer('initialRender');
    
    return () => {
      endTimer('initialRender');
      performanceMonitor.logResults();
    };
  }, [startTimer, endTimer]);

  // Memoized watched values
  const selectedService = watch('service');
  const frequency = watch('frequency');
  const hours = watch('hours');
  const selectedExtras = watch('extras') || [];
  const postalCode = watch('postalCode') || '';

  // Memoized price calculation
  const currentPrice = useMemo(() => {
    startTimer('priceCalculation');
    const price = frequency === Frequency.Weekly ? 27 : 
                 frequency === Frequency.BiWeekly ? 30 : 35;
    endTimer('priceCalculation');
    return price;
  }, [frequency, startTimer, endTimer]);

  // Memoized handlers
  const handleNext = useCallback(() => {
    startTimer('nextStepInteraction');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    handleNextStep();
    if (currentStep === 2) {
      toast.success("Great! Let's complete your booking details.");
    }
    endTimer('nextStepInteraction');
  }, [currentStep, handleNextStep, startTimer, endTimer]);

  const handleBack = useCallback(() => {
    startTimer('backStepInteraction');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    handleBackStep();
    endTimer('backStepInteraction');
  }, [handleBackStep, startTimer, endTimer]);

  const handleHeroNextStep = useCallback(() => {
    startTimer('heroNextStepInteraction');
    handleNextStep();
    endTimer('heroNextStepInteraction');
  }, [handleNextStep, startTimer, endTimer]);

  const setSelectedService = useCallback((service) => {
    startTimer('setServiceInteraction');
    setValue('service', service);
    endTimer('setServiceInteraction');
  }, [setValue, startTimer, endTimer]);

  const setPostalCode = useCallback((code) => {
    startTimer('setPostalCodeInteraction');
    setValue('postalCode', code);
    endTimer('setPostalCodeInteraction');
  }, [setValue, startTimer, endTimer]);

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
            <Hero 
              selectedService={selectedService || ''}
              setSelectedService={setSelectedService}
              postalCode={postalCode}
              setPostalCode={setPostalCode}
              handleNextStep={handleHeroNextStep}
            />
            
            <div className="wave-divider bg-white dark:bg-gray-800 h-16 md:h-24"></div>
            
            {/* Reordered sections - Service Categories before Why Choose Us */}
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <ServiceCategoriesSection serviceCategories={serviceCategories} />
            </ErrorBoundary>
            
            <div className="wave-divider bg-theme-lightblue dark:bg-gray-900 h-16 md:h-24"></div>
            
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <HomeSections />
            </ErrorBoundary>
          </motion.div>
        ) : (
          <BookingSteps
            currentStep={currentStep}
            selectedService={selectedService || ''}
            form={form}
            handleNext={handleNext}
            handleBack={handleBack}
            isMobile={isMobile}
            frequency={frequency}
            hours={hours}
            currentPrice={currentPrice}
            selectedExtras={selectedExtras}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
