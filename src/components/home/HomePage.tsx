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
import { BookingSteps } from './BookingSteps';

// Centralized imports
import { Hero } from '../hero';
import { MobileBookingSummaryOptimized } from '../booking/mobile';
import { serviceCategories } from '@/components/navbar/navigationData';

// Enhanced professional sections
import { EnhancedProfessionalTrustSection } from '../hero/EnhancedProfessionalTrustSection';
import { EnhancedProcessSteps } from '../hero/EnhancedProcessSteps';
import { EnhancedServiceCategoriesSection } from '../services/EnhancedServiceCategoriesSection';
import { EnhancedBusinessSolutionsSection } from './EnhancedBusinessSolutionsSection';

// Optimized lazy loading
const LazyHomeSections = lazy(() => import('./HomeSections').then(module => ({ default: module.HomeSections })));

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

  // Performance monitoring - simplified to prevent blocking
  useEffect(() => {
    if (import.meta.env.DEV) {
      performanceMonitor.markAsImportant('HomePage');
      startTimer('initialRender');
    }
    
    return () => {
      if (import.meta.env.DEV) {
        endTimer('initialRender');
      }
    };
  }, [startTimer, endTimer]);

  // Memoized watched values
  const selectedService = watch('service');
  const frequency = watch('frequency');
  const hours = watch('hours');
  const selectedExtras = watch('extras') || [];
  const postalCode = watch('postalCode') || '';

  // Memoized handlers
  const handleNext = useCallback(() => {
    if (import.meta.env.DEV) startTimer('nextStepInteraction');
    
    if (currentStep === 1 && (!selectedService || !postalCode)) {
      if (!selectedService) toast.error("Please select a service type");
      if (!postalCode) toast.error("Please enter your postal code");
      if (import.meta.env.DEV) endTimer('nextStepInteraction');
      return;
    }
    
    if (currentStep === 2 && (!frequency || !hours)) {
      if (!frequency) toast.error("Please select a frequency");
      if (!hours) toast.error("Please specify the hours needed");
      if (import.meta.env.DEV) endTimer('nextStepInteraction');
      return;
    }
    
    if (isMobile) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    handleNextStep();
    
    if (currentStep === 2) {
      toast.success("Great! Let's complete your booking details.");
    }
    if (import.meta.env.DEV) endTimer('nextStepInteraction');
  }, [currentStep, selectedService, postalCode, frequency, hours, handleNextStep, isMobile, startTimer, endTimer]);

  const handleBack = useCallback(() => {
    if (import.meta.env.DEV) startTimer('backStepInteraction');
    if (isMobile) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    handleBackStep();
    if (import.meta.env.DEV) endTimer('backStepInteraction');
  }, [handleBackStep, isMobile, startTimer, endTimer]);

  const handleHeroNextStep = useCallback(() => {
    if (import.meta.env.DEV) startTimer('heroNextStepInteraction');
    handleNextStep();
    if (import.meta.env.DEV) endTimer('heroNextStepInteraction');
  }, [handleNextStep, startTimer, endTimer]);

  const setSelectedService = useCallback((service: ServiceType | string) => {
    if (import.meta.env.DEV) startTimer('setServiceInteraction');
    setValue('service', service as ServiceType);
    if (import.meta.env.DEV) endTimer('setServiceInteraction');
  }, [setValue, startTimer, endTimer]);

  const setPostalCode = useCallback((code: string) => {
    if (import.meta.env.DEV) startTimer('setPostalCodeInteraction');
    setValue('postalCode', code);
    if (import.meta.env.DEV) endTimer('setPostalCodeInteraction');
  }, [setValue, startTimer, endTimer]);

  // Convert serviceCategories to the expected format
  const convertedServiceCategories = useMemo(() => {
    return serviceCategories.map(category => ({
      id: category.title.toLowerCase().replace(/\s+/g, '-'),
      title: category.title,
      description: category.description,
      image: "/placeholder.svg",
      price: "From €25/hour",
      href: category.services[0]?.href || "/services",
      features: category.services.map(service => service.title),
      category: category.title.toLowerCase(),
      icon: category.icon,
      services: category.services
    }));
  }, []);

  return (
    <div className="min-h-screen font-raleway bg-section-primary transition-colors duration-300">
      <AnimatePresence mode="wait">
        {currentStep === 1 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-section-primary"
          >
            <Hero 
              selectedService={selectedService || ''}
              setSelectedService={setSelectedService}
              postalCode={postalCode}
              setPostalCode={setPostalCode}
              handleNextStep={handleHeroNextStep}
            />
            
            {/* Enhanced trust section */}
            <EnhancedProfessionalTrustSection />
            
            {/* Enhanced how it works section */}
            <EnhancedProcessSteps />
            
            {/* Enhanced Service Categories Section */}
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<SectionLoading />}>
                <EnhancedServiceCategoriesSection serviceCategories={convertedServiceCategories} />
              </Suspense>
            </ErrorBoundary>
            
            {/* Enhanced Business Solutions Section */}
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<SectionLoading />}>
                <EnhancedBusinessSolutionsSection />
              </Suspense>
            </ErrorBoundary>
            
            {/* Why Choose Us, Testimonials, FAQ Section */}
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<SectionLoading />}>
                <LazyHomeSections />
              </Suspense>
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
            selectedExtras={selectedExtras}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
