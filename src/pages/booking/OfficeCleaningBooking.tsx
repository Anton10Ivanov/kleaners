import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { businessCleaningSchema, BusinessCleaningFormData, ServiceType } from '@/schemas/booking';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FinalStep from '@/components/booking/FinalStep';
import { useBookingSubmission } from '@/hooks/useBookingSubmission';
import { useNavigate } from 'react-router-dom';
import BusinessBookingForm from '@/components/booking/business/BusinessBookingForm';
import { BookingProgress } from '@/components/booking/BookingProgress';

const OfficeCleaningBooking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { submitBooking } = useBookingSubmission();
  const navigate = useNavigate();
  
  const form = useForm<BusinessCleaningFormData>({
    resolver: zodResolver(businessCleaningSchema),
    mode: 'onTouched',
    defaultValues: {
      service: ServiceType.Office,
      businessType: '',
      squareMeters: 100,
      cleaningOptions: [],
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      postalCode: '',
      address: '',
      city: '',
      specialInstructions: '',
      promoCode: ''
    },
  });

  const handleNext = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, 2));
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      navigate('/');
    } else {
      setCurrentStep(prev => Math.max(prev - 1, 1));
    }
  };

  const handleSubmit = async (data: BusinessCleaningFormData) => {
    await submitBooking(data as any);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Office Cleaning Booking
          </h1>
          <BookingProgress 
            currentStep={currentStep}
            totalSteps={2}
            steps={['Booking Details', 'Confirmation']}
          />
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
                  <BusinessBookingForm form={form} />
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <FinalStep
                    form={form}
                    postalCode={form.watch('postalCode') || ''}
                    onSubmit={handleSubmit}
                    onBack={handleBack}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {currentStep < 2 && (
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
                
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default OfficeCleaningBooking;
