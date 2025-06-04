
import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ErrorBoundary } from 'react-error-boundary';
import { SectionLoading } from '@/components/ui/section-loading';
import MobileBookingSummary from '../booking/MobileBookingSummary';
import MobileBookingProgress from '../booking/MobileBookingProgress';

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
  
  // Check completion status for mobile progress
  const hasServiceSelection = !!selectedService;
  const hasTimeSelection = !!(frequency && hours);
  const hasPersonalInfo = !!(formData?.firstName && formData?.lastName && formData?.email);
  const hasAddress = !!(formData?.address && formData?.city);

  return (
    <motion.div
      className="pt-20 md:pt-24 pb-24 md:pb-32 px-4 md:pt-32 bg-white dark:bg-gray-900 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {/* Mobile Progress Indicator */}
      {isMobile && (
        <div className="fixed top-16 left-0 right-0 z-40">
          <MobileBookingProgress
            currentStep={currentStep}
            hasServiceSelection={hasServiceSelection}
            hasTimeSelection={hasTimeSelection}
            hasPersonalInfo={hasPersonalInfo}
            hasAddress={hasAddress}
          />
        </div>
      )}

      <div className={`max-w-7xl mx-auto ${isMobile ? 'pt-16' : ''}`}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<SectionLoading />}>
            <LazyBookingContent 
              currentStep={currentStep}
              selectedService={selectedService}
              form={form}
            />
          </Suspense>
        </ErrorBoundary>

        {/* Mobile booking summary for Step 3 */}
        {isMobile && currentStep === 3 && (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <MobileBookingSummary 
              selectedService={selectedService}
              frequency={frequency || ''}
              hours={hours}
              currentPrice={currentPrice}
              selectedExtras={selectedExtras}
              form={form}
            />
          </ErrorBoundary>
        )}

        {/* Navigation buttons */}
        <div className={`flex justify-between mt-8 ${isMobile ? 'pb-32' : 'pb-8'}`}>
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
      </div>
    </motion.div>
  );
};
