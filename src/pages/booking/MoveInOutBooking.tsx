
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MoveInOutSchema, MoveInOutBookingForm } from '@/schemas/bookingSchemas';
import { Form } from '@/components/ui/form';
import { useState, useEffect } from 'react';
import FinalStep from '@/components/booking/FinalStep';
import { useEnhancedBookingSubmission } from '@/hooks/useEnhancedBookingSubmission';
import { useNavigate } from 'react-router-dom';
import EnhancedMoveInOutFields from '@/components/booking/EnhancedMoveInOutFields';
import MoveInOutStep2 from './MoveInOutStep2';
import { AutoProgressiveWrapper } from '@/components/booking/shared/AutoProgressiveWrapper';
import { EnhancedProgressIndicator } from '@/components/booking/shared/EnhancedProgressIndicator';
import { SummaryPill } from '@/components/booking/summary/SummaryPill';
import { enhancedFormPersistence, FormAutoSave } from '@/utils/enhancedFormPersistence';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const MoveInOutBooking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { submitBooking } = useEnhancedBookingSubmission();
  const navigate = useNavigate();
  const [autoSave, setAutoSave] = useState<FormAutoSave | null>(null);
  
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
      ...enhancedFormPersistence.load('move-in-out'), // Load persisted data
    },
  });

  // Enhanced form persistence
  useEffect(() => {
    const autoSaveInstance = new FormAutoSave(
      () => form.getValues(),
      'move-in-out',
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

  // Completion checks for auto-progression
  const checkStep1Completion = (values: MoveInOutBookingForm) => {
    return !!(values.squareMeters && values.bedrooms && values.bathrooms && values.cleaningGoal);
  };

  const checkStep2Completion = (values: MoveInOutBookingForm) => {
    return !!(values.selectedDate && values.selectedTime);
  };

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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 pb-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Move In/Out Cleaning Booking
          </h1>
          
          {/* Enhanced Progress Indicator */}
          <EnhancedProgressIndicator 
            currentStep={currentStep} 
            totalSteps={3}
            stepLabels={['Property Details', 'Schedule & Contact', 'Confirmation']}
          />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            {/* Step 1: Property Details with Auto-Progression */}
            {currentStep === 1 && (
              <AutoProgressiveWrapper
                form={form}
                currentStep={currentStep}
                onNext={handleNext}
                completionCheck={checkStep1Completion}
              >
                <EnhancedMoveInOutFields form={form} />
              </AutoProgressiveWrapper>
            )}

            {/* Step 2: Schedule with Auto-Progression */}
            {currentStep === 2 && (
              <AutoProgressiveWrapper
                form={form}
                currentStep={currentStep}
                onNext={handleNext}
                completionCheck={checkStep2Completion}
              >
                <MoveInOutStep2 form={form} />
              </AutoProgressiveWrapper>
            )}

            {/* Step 3: Contact Information */}
            {currentStep === 3 && (
              <FinalStep
                form={form as any}
                postalCode={form.watch('postalCode') || ''}
                onSubmit={handleSubmit}
              />
            )}

            {/* Navigation Buttons */}
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
              
              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="flex items-center gap-2"
                >
                  Submit Booking
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </form>
        </Form>
        
        {/* Enhanced Summary Pill */}
        <SummaryPill form={form as any} currentStep={currentStep} />
      </div>
    </div>
  );
};

export default MoveInOutBooking;
