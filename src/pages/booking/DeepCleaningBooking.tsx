
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DeepCleaningSchema, DeepCleaningBookingForm } from '@/schemas/bookingSchemas';
import { Form } from '@/components/ui/form';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FinalStep from '@/components/booking/FinalStep';
import { useBookingSubmission } from '@/hooks/useBookingSubmission';
import { useNavigate } from 'react-router-dom';
import EnhancedDeepCleaningFields from '@/components/booking/EnhancedDeepCleaningFields';
import DeepCleaningStep2 from './DeepCleaningStep2';
import { ResponsiveBookingLayout } from '@/components/booking/shared/ResponsiveBookingLayout';
import { EnhancedProgressIndicator } from '@/components/booking/shared/EnhancedProgressIndicator';
import { SummaryPill } from '@/components/booking/summary/SummaryPill';
import { enhancedFormPersistence, FormAutoSave } from '@/utils/enhancedFormPersistence';

const DeepCleaningBooking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { submitBooking } = useBookingSubmission();
  const navigate = useNavigate();
  const [autoSave, setAutoSave] = useState<FormAutoSave | null>(null);
  
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
      ...enhancedFormPersistence.load('deep-cleaning'), // Load persisted data
    },
  });

  // Enhanced form persistence
  useEffect(() => {
    const autoSaveInstance = new FormAutoSave(
      () => form.getValues(),
      'deep-cleaning',
      30000 // 30 seconds
    );
    autoSaveInstance.start();
    setAutoSave(autoSaveInstance);

    return () => {
      autoSaveInstance.stop();
    };
  }, [form]);

  // Save on step changes
  useEffect(() => {
    if (autoSave) {
      autoSave.saveNow();
    }
  }, [currentStep, autoSave]);

  // Auto-progression logic
  const checkStepCompletion = (step: number): boolean => {
    const values = form.getValues();
    switch (step) {
      case 1:
        return !!(values.squareMeters && values.bedrooms && values.bathrooms && values.targetAreas?.length);
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
      canProceed={checkStepCompletion(currentStep) || currentStep === 3}
      showBackButton={true}
      nextButtonText={currentStep === 3 ? undefined : 'Continue'}
    >
      {/* Enhanced Progress Indicator */}
      <EnhancedProgressIndicator 
        currentStep={currentStep} 
        totalSteps={3}
        stepLabels={['Deep Cleaning Details', 'Schedule & Contact', 'Confirmation']}
      />
      
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
      
      {/* Enhanced Summary Pill */}
      <SummaryPill form={form as any} currentStep={currentStep} />
    </ResponsiveBookingLayout>
  );
};

export default DeepCleaningBooking;
