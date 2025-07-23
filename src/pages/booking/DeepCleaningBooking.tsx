
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DeepCleaningSchema, DeepCleaningBookingForm } from '@/schemas/bookingSchemas';
import { Form } from '@/components/ui/form';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FinalStep from '@/components/booking/FinalStep';
import { useBookingSubmission } from '@/hooks/useBookingSubmission';
import { useNavigate } from 'react-router-dom';
import EnhancedDeepCleaningFields from '@/components/booking/EnhancedDeepCleaningFields';
import DeepCleaningStep2 from './DeepCleaningStep2';
import { ResponsiveBookingLayout } from '@/components/booking/shared/ResponsiveBookingLayout';

const DeepCleaningBooking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { submitBooking } = useBookingSubmission();
  const navigate = useNavigate();
  
  const form = useForm<DeepCleaningBookingForm>({
    resolver: zodResolver(DeepCleaningSchema),
    defaultValues: {
      serviceType: "deep-cleaning",
      squareMeters: 50,
      bedrooms: 1,
      bathrooms: 1,
      dirtinessLevel: 3,
      includeWallsAndCeilings: false,
      targetAreas: ["bathroom"],
      postalCode: '',
      selectedDate: new Date(),
      selectedTime: '',
      address: '',
      city: '',
      accessMethod: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
  });

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

  const handleSubmit = async (data: DeepCleaningBookingForm) => {
    await submitBooking(data as any);
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return <EnhancedDeepCleaningFields form={form} />;
      case 2:
        return <DeepCleaningStep2 form={form} />;
      case 3:
        return (
          <FinalStep
            form={form as any}
            postalCode={form.watch('postalCode') || ''}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ResponsiveBookingLayout
      title="Deep Cleaning Booking"
      subtitle="Professional deep cleaning for your home"
      currentStep={currentStep}
      totalSteps={3}
      onBack={handleBack}
      onNext={currentStep < 3 ? handleNext : undefined}
      canProceed={true}
      showBackButton={true}
      nextButtonText={currentStep === 3 ? undefined : 'Continue'}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {getStepContent()}
            </motion.div>
          </AnimatePresence>
        </form>
      </Form>
    </ResponsiveBookingLayout>
  );
};

export default DeepCleaningBooking;
