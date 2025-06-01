
import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ErrorBoundary } from 'react-error-boundary';
import { SectionLoading } from '@/components/ui/section-loading';
import MobileBookingSummary from '../booking/MobileBookingSummary';

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
  return (
    <motion.div
      className="pt-20 md:pt-24 pb-24 md:pb-32 px-4 md:pt-32 bg-white dark:bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto">
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
            />
          </ErrorBoundary>
        )}

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
  );
};
