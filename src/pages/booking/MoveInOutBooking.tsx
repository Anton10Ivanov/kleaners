
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MoveInOutSchema, MoveInOutBookingForm } from '@/schemas/bookingSchemas';
import { Form } from '@/components/ui/form';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FinalStep from '@/components/booking/FinalStep';
import { useBookingSubmission } from '@/hooks/useBookingSubmission';
import { useNavigate } from 'react-router-dom';
import EnhancedMoveInOutFields from '@/components/booking/EnhancedMoveInOutFields';
import MoveInOutStep2 from './MoveInOutStep2';
import { ResponsiveBookingLayout } from '@/components/booking/shared/ResponsiveBookingLayout';

const MoveInOutBooking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { submitBooking } = useBookingSubmission();
  const navigate = useNavigate();
  
  const form = useForm<MoveInOutBookingForm>({
    resolver: zodResolver(MoveInOutSchema),
    defaultValues: {
      serviceType: "move-in-out",
      squareMeters: 60,
      bedrooms: 2,
      bathrooms: 1,
      dirtinessLevel: 3,
      isFurnished: false,
      trashRemovalNeeded: false,
      cleaningGoal: "deposit",
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

  // Auto-progression logic
  const checkStepCompletion = (step: number): boolean => {
    const values = form.getValues();
    switch (step) {
      case 1:
        return !!(values.squareMeters && values.bedrooms && values.bathrooms && values.cleaningGoal);
      case 2:
        return !!(values.selectedDate && values.selectedTime);
      default:
        return false;
    }
  };

  // Auto-advance when step is complete
  useState(() => {
    const subscription = form.watch((values) => {
      if (currentStep === 1 && checkStepCompletion(1)) {
        setTimeout(() => setCurrentStep(2), 800);
      }
    });
    return () => subscription.unsubscribe();
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

  const handleSubmit = async (data: MoveInOutBookingForm) => {
    await submitBooking(data as any);
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return <EnhancedMoveInOutFields form={form} />;
      case 2:
        return <MoveInOutStep2 form={form} />;
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
      title="Move In/Out Cleaning Booking"
      subtitle="Professional cleaning for your moving needs"
      currentStep={currentStep}
      totalSteps={3}
      onBack={handleBack}
      onNext={currentStep < 3 ? handleNext : undefined}
      canProceed={checkStepCompletion(currentStep) || currentStep === 3}
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

export default MoveInOutBooking;
