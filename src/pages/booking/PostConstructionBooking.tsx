import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostConstructionSchema, PostConstructionBookingForm } from '@/schemas/bookingSchemas';
import { Form } from '@/components/ui/form';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FinalStep from '@/components/booking/FinalStep';
import { useBookingSubmission } from '@/hooks/useBookingSubmission';
import { useNavigate } from 'react-router-dom';
import PostConstructionFields from '@/components/booking/postConstruction/PostConstructionFields';
import PostConstructionStep2 from './PostConstructionStep2';
import { ResponsiveBookingLayout } from '@/components/booking/shared/ResponsiveBookingLayout';

const PostConstructionBooking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { submitBooking } = useBookingSubmission();
  const navigate = useNavigate();
  
  const form = useForm<PostConstructionBookingForm>({
    resolver: zodResolver(PostConstructionSchema),
    defaultValues: {
      serviceType: "post-construction",
      squareMeters: 100,
      constructionType: "renovation",
      dustLevel: 3,
      hazardousMaterials: false,
      specialEquipmentNeeded: false,
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
        return !!(values.squareMeters && values.constructionType && values.dustLevel);
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

  const handleSubmit = async (data: PostConstructionBookingForm) => {
    await submitBooking(data as any);
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PostConstructionFields form={form} />;
      case 2:
        return <PostConstructionStep2 form={form} />;
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
      title="Post Construction Cleaning"
      subtitle="Professional cleaning after construction work"
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

export default PostConstructionBooking;