
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ServiceOptions from './ServiceOptions';
import OptimizedCalendar from './OptimizedCalendar';
import EnhancedExtras from './EnhancedExtras';
import BusinessStep from './business/BusinessStep';
import FinalStep from './FinalStep';
import { HomeDetailsSection } from './HomeDetailsSection';
import { BookingFormData, Frequency } from '@/schemas/booking';
import { ServiceType } from '@/types/enums';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useBookingSubmission } from '@/hooks/useBookingSubmission';
import { useState, useEffect, Suspense } from 'react';
import { Calendar, Plus } from 'lucide-react';
import OptimizedProgressiveForm from './mobile/OptimizedProgressiveForm';
import MobileBookingSummaryOptimized from './mobile/MobileBookingSummaryOptimized';

interface BookingContentProps {
  currentStep: number;
  selectedService: string;
  form: ReturnType<typeof useForm<BookingFormData>>;
}

const fadeVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

// Loading fallback for mobile components
const MobileLoadingFallback = () => (
  <div className="space-y-3">
    {[1, 2, 3].map((i) => (
      <div key={i} className="animate-pulse">
        <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-24 bg-gray-200 rounded"></div>
      </div>
    ))}
  </div>
);

const BookingContent = ({ currentStep, selectedService, form }: BookingContentProps) => {
  const { submitBooking } = useBookingSubmission();
  const frequency = form.watch('frequency') as Frequency | undefined;
  const hours = form.watch('hours') || 2;
  const postalCode = form.watch('postalCode') || '';
  const propertySize = form.watch('propertySize') || 70;
  const bedrooms = form.watch('bedrooms') || 0;
  const bathrooms = form.watch('bathrooms') || 0;
  const selectedDate = form.watch('date');
  const preferredTime = form.watch('preferredTime');
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  // Progressive disclosure states
  const [sectionsCompleted, setSectionsCompleted] = useState({
    homeDetails: false,
    frequency: false,
    calendar: false
  });

  // Set default frequency to Weekly on mount
  useEffect(() => {
    if (!frequency) {
      form.setValue('frequency', Frequency.Weekly);
    }
  }, [form, frequency]);

  // Check if home details are complete
  const homeDetailsComplete = propertySize > 0 && bedrooms > 0 && bathrooms > 0;
  
  // Update completion states
  useEffect(() => {
    setSectionsCompleted(prev => ({
      ...prev,
      homeDetails: homeDetailsComplete,
      frequency: !!frequency,
      calendar: !!(selectedDate && preferredTime)
    }));
  }, [homeDetailsComplete, frequency, selectedDate, preferredTime]);

  const showCalendar = frequency && frequency !== Frequency.Custom;
  
  const handleFormClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSuggestedTimeSelect = (suggestedHours: number) => {
    form.setValue('hours', suggestedHours);
  };

  const SectionDivider = () => (
    <div className="border-t border-gray-100 dark:border-gray-700 my-4"></div>
  );
  
  return (
    <div className="w-full" onClick={handleFormClick}>
      <Form {...form}>
        <form onSubmit={e => e.preventDefault()}>
          {currentStep === 2 && selectedService === ServiceType.Home && (
            <motion.div initial="hidden" animate="visible" variants={fadeVariant}>
              {isMobile ? (
                // Mobile: Enhanced progressive form with reduced padding
                <div className="space-y-4">
                  <Suspense fallback={<MobileLoadingFallback />}>
                    <OptimizedProgressiveForm 
                      form={form}
                      currentStep={currentStep}
                      onStepChange={() => {}}
                    />
                  </Suspense>
                  
                  {/* Mobile summary - optimized floating version */}
                  <div className="pb-16">
                    <MobileBookingSummaryOptimized 
                      form={form}
                      currentStep={currentStep}
                    />
                  </div>
                </div>
              ) : (
                // Desktop: Original single container layout
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-6">
                  
                  {/* 1. Home Details Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      About Your Home
                    </h3>
                    <HomeDetailsSection 
                      form={form} 
                      onSuggestedTimeSelect={handleSuggestedTimeSelect}
                    />
                  </div>

                  <SectionDivider />

                  {/* 2. Frequency Selection */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Cleaning Frequency
                    </h3>
                    <ServiceOptions 
                      frequency={frequency} 
                      setFrequency={freq => form.setValue('frequency', freq)} 
                      isRegularCleaning={true} 
                    />
                  </div>
                  
                  {/* Progressive Disclosure - Show calendar only when previous sections are complete */}
                  {sectionsCompleted.homeDetails && sectionsCompleted.frequency && showCalendar && (
                    <>
                      <SectionDivider />
                      
                      {/* 3. Calendar Section */}
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Calendar className="h-5 w-5 text-primary" />
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Date & Time
                          </h3>
                        </div>
                        <OptimizedCalendar form={form} />
                      </div>
                    </>
                  )}
                  
                  {/* 4. Extras Section - Show when calendar is complete */}
                  {sectionsCompleted.calendar && (
                    <>
                      <SectionDivider />
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Plus className="h-5 w-5 text-primary" />
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Additional Services
                          </h3>
                        </div>
                        <EnhancedExtras form={form} />
                      </div>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          )}
          
          {currentStep === 2 && selectedService === ServiceType.Office && (
            <motion.div initial="hidden" animate="visible" variants={fadeVariant} key="business-step">
              <BusinessStep form={form} />
            </motion.div>
          )}
          
          {currentStep === 3 && (
            <motion.div initial="hidden" animate="visible" variants={fadeVariant} key="final-step">
              {isMobile ? (
                <div className="space-y-4">
                  <FinalStep 
                    postalCode={postalCode} 
                    onSubmit={submitBooking} 
                    form={form} 
                  />
                  
                  {/* Detailed summary for final step */}
                  <MobileBookingSummaryOptimized 
                    form={form}
                    currentStep={currentStep}
                    showDetailed={true}
                  />
                </div>
              ) : (
                <FinalStep 
                  postalCode={postalCode} 
                  onSubmit={submitBooking} 
                  form={form} 
                />
              )}
            </motion.div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default BookingContent;
