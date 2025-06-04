
import { Suspense, lazy, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ErrorBoundary } from 'react-error-boundary';
import { SectionLoading } from '@/components/ui/section-loading';
import { useMediaQuery } from '@/hooks/use-media-query';

const LazyBookingContent = lazy(() => import('../booking/BookingContent'));

const ErrorFallback = () => (
  <div className="text-center py-8">
    <p>Something went wrong loading this section.</p>
  </div>
);

interface BookingStepsProps {
  currentStep: number;
  selectedService: string;
  form: any;
  handleNext: () => void;
  handleBack: () => void;
  isMobile: boolean;
  frequency: any;
  hours: any;
  currentPrice: number;
  selectedExtras: string[];
}

export const BookingSteps = ({
  currentStep,
  selectedService,
  form,
  handleNext,
  handleBack,
  isMobile,
  frequency,
  hours,
  currentPrice,
  selectedExtras
}: BookingStepsProps) => {
  const formData = form?.getValues();
  const isReallyMobile = useMediaQuery("(max-width: 768px)");

  // Browser back button support for main steps
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (currentStep > 1) {
        event.preventDefault();
        handleBack();
        window.history.pushState(null, '', window.location.pathname);
      }
    };

    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [currentStep, handleBack]);

  return (
    <motion.div
      className="pt-16 md:pt-24 pb-20 md:pb-32 px-2 md:px-4 md:pt-32 bg-white dark:bg-gray-900 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className={`max-w-7xl mx-auto ${isReallyMobile ? 'pt-4' : ''}`}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<SectionLoading />}>
            <LazyBookingContent 
              currentStep={currentStep}
              selectedService={selectedService}
              form={form}
            />
          </Suspense>
        </ErrorBoundary>

        {/* Navigation buttons - Only show on desktop or when not in progressive mobile form */}
        {(!isReallyMobile || currentStep === 3) && (
          <div className={`flex justify-between mt-6 ${isReallyMobile ? 'pb-20' : 'pb-8'}`}>
            <Button 
              onClick={handleBack}
              variant="outline"
              className="rounded-xl h-12 px-6 hover:bg-white/50 hover:text-primary dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            {currentStep < 3 && (
              <Button 
                onClick={handleNext}
                className="bg-primary hover:bg-primary/90 text-white rounded-xl h-12 px-6 shadow-[0_8px_15px_rgba(126,188,230,0.2)] hover:shadow-[0_8px_15px_rgba(126,188,230,0.4)] dark:bg-primary dark:text-white dark:hover:bg-primary/90"
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};
