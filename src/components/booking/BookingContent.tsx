
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ServiceOptions from './ServiceOptions';
import { EnhancedCalendar } from './EnhancedCalendar';
import EnhancedExtras from './EnhancedExtras';
import BusinessStep from './business/BusinessStep';
import FinalStep from './FinalStep';
import { HomeDetailsSection } from './HomeDetailsSection';
import { BookingFormData, Frequency, ServiceType } from '@/schemas/booking';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useBookingSubmission } from '@/hooks/useBookingSubmission';
import { useState, useEffect, Suspense } from 'react';
import { Calendar, Plus } from 'lucide-react';
import OptimizedProgressiveForm from './mobile/OptimizedProgressiveForm';
import MobileBookingSummaryOptimized from './mobile/MobileBookingSummaryOptimized';
import { MobileBookingCard, MobileCalendarCard, MobileServiceSelector } from './mobile';
import { EnhancedExtrasVisual } from './extras/EnhancedExtrasVisual';
import { SummaryPill } from './summary/SummaryPill';

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

// Sample service options for mobile service selector
const serviceOptions = [
  {
    id: 'home',
    name: 'Regular Home Cleaning',
    description: 'Weekly or bi-weekly cleaning for your home',
    price: 89,
    duration: '2-3 hours',
    popular: true,
  },
  {
    id: 'deep',
    name: 'Deep Cleaning',
    description: 'Thorough cleaning for move-in/move-out or spring cleaning',
    price: 149,
    duration: '4-6 hours',
  },
  {
    id: 'office',
    name: 'Office Cleaning',
    description: 'Professional cleaning for office spaces',
    price: 119,
    duration: '2-4 hours',
  },
];

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

  // Check if home details are complete (updated to match new required fields)
  const homeDetailsComplete = propertySize > 0 && 
                              bedrooms !== undefined && bedrooms !== null && 
                              bathrooms !== undefined && bathrooms !== null &&
                              hours > 0;
  
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

  const handleServiceSelect = (serviceId: string) => {
    form.setValue('service', serviceId);
  };

  const handleDateSelect = (date: Date | undefined) => {
    form.setValue('date', date);
  };

  const handleTimeSelect = (time: string) => {
    form.setValue('preferredTime', time);
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
                // Mobile: Enhanced with new mobile booking components
                <div className="space-y-4">
                  {/* Service Selection with new mobile component */}
                  <MobileServiceSelector
                    services={serviceOptions}
                    selectedService={form.watch('service')}
                    onServiceSelect={handleServiceSelect}
                  />

                  {/* Calendar with new mobile component */}
                  <MobileCalendarCard
                    selectedDate={selectedDate}
                    onDateSelect={handleDateSelect}
                    selectedTime={preferredTime}
                    onTimeSelect={handleTimeSelect}
                  />

                  {/* Existing progressive form for remaining fields */}
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
                // Desktop: Updated single container layout
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 space-y-6">
                  
                  {/* 1. Home Details Section with new flow */}
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
                        <EnhancedCalendar form={form} />
                      </div>
                    </>
                  )}
                  
                  {/* 4. Enhanced Extras Section - Show when calendar is complete */}
                  {sectionsCompleted.calendar && (
                    <>
                      <SectionDivider />
                      <div>
                        <EnhancedExtrasVisual form={form} />
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Summary Pill - replaces sticky summary */}
              <SummaryPill form={form} currentStep={currentStep} />
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
