import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { homeCleaningSchema, BookingFormData, ServiceType } from '@/schemas/booking';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceOptions from '@/components/booking/ServiceOptions';
import OptimizedCalendar from '@/components/booking/OptimizedCalendar';
import EnhancedExtras from '@/components/booking/EnhancedExtras';
import FinalStep from '@/components/booking/FinalStep';
import { HomeDetailsSection } from '@/components/booking/HomeDetailsSection';
import { useBookingSubmission } from '@/hooks/useBookingSubmission';
import { useNavigate } from 'react-router-dom';

const HomeCleaningBooking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { submitBooking } = useBookingSubmission();
  const navigate = useNavigate();
  
  const form = useForm<BookingFormData>({
    resolver: zodResolver(homeCleaningSchema),
    defaultValues: {
      service: "home",
      hours: 2,
      propertySize: 70,
      cleaningPace: 'standard',
      extras: [],
    },
  });

  const frequency = form.watch('frequency');
  const showCalendar = frequency && frequency !== 'custom';

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    if (currentStep === 1) {
      navigate('/');
    } else {
      setCurrentStep(prev => Math.max(prev - 1, 1));
    }
  };

  const handleSubmit = async (data: BookingFormData) => {
    await submitBooking(data);
  };

  const handleSuggestedTimeSelect = (hours: number) => {
    form.setValue('hours', hours);
    const hoursSection = document.querySelector('[data-hours-selection]');
    if (hoursSection) {
      hoursSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Home Cleaning Booking
          </h1>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Step {currentStep} of 3</span>
            <div className="flex space-x-1">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-2 h-2 rounded-full ${
                    step <= currentStep ? 'bg-primary' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <HomeDetailsSection 
                    form={form} 
                    onSuggestedTimeSelect={handleSuggestedTimeSelect}
                  />
                  
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border">
                    <ServiceOptions
                      frequency={frequency}
                      setFrequency={(freq) => form.setValue('frequency', freq)}
                      isRegularCleaning={true}
                    />
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {showCalendar && (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border">
                      <OptimizedCalendar form={form} />
                    </div>
                  )}
                  
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border">
                    <EnhancedExtras form={form} />
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <FinalStep
                    form={form}
                    postalCode={form.watch('postalCode') || ''}
                    onSubmit={handleSubmit}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              <Button
                type="button"
                onClick={handleBack}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                {currentStep === 1 ? 'Back to Services' : 'Previous'}
              </Button>
              
              {currentStep < 3 && (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default HomeCleaningBooking;
