
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Hero from '../components/Hero';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import ProgressBar from '../components/booking/ProgressBar';
import BookingSummary from '../components/booking/BookingSummary';
import BookingContent from '../components/booking/BookingContent';
import { AnimatePresence, motion } from 'framer-motion';
import { useBookingForm } from '../hooks/useBookingForm';
import { toast } from 'sonner';
import { ErrorBoundary } from 'react-error-boundary';

const ErrorFallback = () => (
  <div className="text-center py-8">
    <p>Something went wrong loading this section.</p>
  </div>
);

const Index = () => {
  const { form, currentStep, handleNextStep, handleBackStep, watch, setValue } = useBookingForm();

  const selectedService = watch('service');
  const frequency = watch('frequency');
  const hours = watch('hours');
  const date = watch('date');
  const bedrooms = watch('bedrooms');
  const bathrooms = watch('bathrooms');
  const selectedExtras = watch('extras') || [];
  const postalCode = watch('postalCode') || '';

  const currentPrice = frequency === 'weekly' ? 27 : frequency === 'biweekly' ? 30 : 35;

  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    handleNextStep();
    if (currentStep === 2) {
      toast.success("Great! Let's complete your booking details.");
    }
  };

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    handleBackStep();
  };

  return (
    <div className="min-h-screen font-raleway bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <AnimatePresence mode="wait">
        {currentStep === 1 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Hero 
              selectedService={selectedService}
              setSelectedService={(service) => setValue('service', service)}
              postalCode={postalCode}
              setPostalCode={(code) => setValue('postalCode', code)}
              handleNextStep={handleNextStep}
            />
            <WhyChooseUs />
            <Services />
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Testimonials />
            </ErrorBoundary>
          </motion.div>
        ) : (
          <motion.div
            className="pt-24 pb-32 px-4 md:pt-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="max-w-7xl mx-auto">
              <ProgressBar currentStep={currentStep} />
              
              <div className="flex flex-col md:flex-row gap-8 relative">
                <BookingContent 
                  currentStep={currentStep}
                  selectedService={selectedService}
                  form={form}
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="w-full md:w-[20%] fixed bottom-0 left-0 right-0 z-20 md:relative md:bottom-auto md:left-auto md:right-auto md:z-auto"
                >
                  <BookingSummary 
                    selectedService={selectedService}
                    frequency={frequency || ''}
                    hours={hours}
                    currentPrice={currentPrice}
                    selectedExtras={selectedExtras}
                  />
                </motion.div>
              </div>

              <div className="flex justify-between mt-8 pb-20 md:pb-0">
                <Button 
                  onClick={handleBack}
                  variant="outline"
                  className="rounded-xl h-12"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                {currentStep < 3 && (
                  <Button 
                    onClick={handleNext}
                    className="bg-primary hover:bg-primary/90 text-white rounded-xl h-12"
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
