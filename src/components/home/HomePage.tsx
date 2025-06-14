import React, { Suspense, lazy, useCallback, useMemo, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { ErrorBoundary } from 'react-error-boundary';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Frequency, ServiceType } from '@/schemas/booking';
import { SectionLoading } from '@/components/ui/section-loading';
import { performanceMonitor } from '@/utils/performance'; 
import { useComponentTimer } from '@/hooks/useComponentTimer';
import { useBookingForm } from '@/hooks/useBookingForm';

// Centralized imports
import { Hero } from '../hero';
import { MobileBookingSummaryOptimized } from '../booking/mobile';
import { serviceCategories } from '@/components/navbar/navigationData';

// Optimized lazy loading
const LazyBookingContent = lazy(() => import('../booking/BookingContent'));
const LazyServiceCategoriesSection = lazy(() => import('../services/ServiceCategoriesSection'));
const LazyBusinessSolutionsSection = lazy(() => import('./BusinessSolutionsSection'));
const LazyHomeSections = lazy(() => import('./HomeSections'));

// Simple error fallback component
const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="text-center py-8 text-red-500">
    <p>Something went wrong loading this section.</p>
    <p className="text-sm">{error?.message}</p>
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
      // Performance monitor results are logged globally or can be triggered elsewhere if needed.
      // Avoid logging on every unmount if it's too noisy.
      // performanceMonitor.logResults(); 
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
    
    if (currentStep === 1 && (!selectedService || !postalCode)) {
      if (!selectedService) toast.error("Please select a service type");
      if (!postalCode) toast.error("Please enter your postal code");
      endTimer('nextStepInteraction');
      return;
    }
    
    if (currentStep === 2 && (!frequency || !hours)) {
      if (!frequency) toast.error("Please select a frequency");
      if (!hours) toast.error("Please specify the hours needed");
      endTimer('nextStepInteraction');
      return;
    }
    
    if (isMobile) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    handleNextStep();
    
    if (currentStep === 2) {
      toast.success("Great! Let's complete your booking details.");
    }
    endTimer('nextStepInteraction');
  }, [currentStep, selectedService, postalCode, frequency, hours, handleNextStep, isMobile, startTimer, endTimer]);

  const handleBack = useCallback(() => {
    startTimer('backStepInteraction');
    if (isMobile) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    handleBackStep();
    endTimer('backStepInteraction');
  }, [handleBackStep, isMobile, startTimer, endTimer]);

  const handleHeroNextStep = useCallback(() => {
    startTimer('heroNextStepInteraction');
    handleNextStep();
    endTimer('heroNextStepInteraction');
  }, [handleNextStep, startTimer, endTimer]);

  const setSelectedService = useCallback((service: ServiceType | string) => {
    startTimer('setServiceInteraction');
    setValue('service', service as ServiceType); // Ensure service is of type ServiceType
    endTimer('setServiceInteraction');
  }, [setValue, startTimer, endTimer]);

  const setPostalCode = useCallback((code: string) => {
    startTimer('setPostalCodeInteraction');
    setValue('postalCode', code);
    endTimer('setPostalCodeInteraction');
  }, [setValue, startTimer, endTimer]);

  // Convert serviceCategories to the expected format with proper ServiceCategory interface
  const convertedServiceCategories = useMemo(() => {
    return serviceCategories.map(category => ({
      id: category.title.toLowerCase().replace(/\s+/g, '-'),
      title: category.title,
      description: category.description,
      image: "/placeholder.svg", // Consider actual images
      price: "From €25/hour",
      href: category.services[0]?.href || "/services",
      features: category.services.map(service => service.title),
      category: category.title.toLowerCase(),
      icon: category.icon,
      services: category.services
    }));
  }, []);

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
            
            <Suspense fallback={<SectionLoading />}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <LazyServiceCategoriesSection serviceCategories={convertedServiceCategories} />
              </ErrorBoundary>
            </Suspense>
            
            <div className="wave-divider bg-theme-lightblue dark:bg-gray-900 h-16 md:h-24"></div>
            
            <Suspense fallback={<SectionLoading />}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <LazyBusinessSolutionsSection />
              </ErrorBoundary>
            </Suspense>
            
            <div className="wave-divider bg-white dark:bg-gray-800 h-16 md:h-24"></div>
            
            <Suspense fallback={<SectionLoading />}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <LazyHomeSections />
              </ErrorBoundary>
            </Suspense>
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
