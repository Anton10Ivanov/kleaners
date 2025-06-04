
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ServiceOptions from './ServiceOptions';
import OptimizedCalendar from './OptimizedCalendar';
import EnhancedExtras from './EnhancedExtras';
import BusinessStep from './business/BusinessStep';
import FinalStep from './FinalStep';
import { HomeDetailsSection } from './HomeDetailsSection';
import SimpleDurationInput from './hours/SimpleDurationInput';
import { BookingFormData, Frequency } from '@/schemas/booking';
import { ServiceType } from '@/types/enums';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useBookingSubmission } from '@/hooks/useBookingSubmission';
import { useState, useEffect } from 'react';
import { Home, Calendar, Clock, Plus } from 'lucide-react';

interface BookingContentProps {
  currentStep: number;
  selectedService: string;
  form: ReturnType<typeof useForm<BookingFormData>>;
}

const fadeVariant = {
  hidden: {
    opacity: 0,
    y: 10
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4
    }
  }
};

const BookingContent = ({
  currentStep,
  selectedService,
  form
}: BookingContentProps) => {
  const { submitBooking } = useBookingSubmission();
  const frequency = form.watch('frequency') as Frequency | undefined;
  const hours = form.watch('hours') || 2;
  const postalCode = form.watch('postalCode') || '';
  const propertySize = form.watch('propertySize') || 70;
  const bedrooms = form.watch('bedrooms') || 0;
  const bathrooms = form.watch('bathrooms') || 0;
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  // Progressive disclosure states
  const [sectionsCompleted, setSectionsCompleted] = useState({
    homeDetails: false,
    frequency: false,
    duration: false,
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
      duration: hours >= 2,
      calendar: !!form.watch('selectedDate')
    }));
  }, [homeDetailsComplete, frequency, hours, form]);

  const showCalendar = frequency && frequency !== Frequency.Custom;
  
  const handleFormClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSuggestedTimeSelect = (suggestedHours: number) => {
    form.setValue('hours', suggestedHours);
  };

  // Section header component
  const SectionHeader = ({ 
    icon: Icon, 
    title, 
    stepNumber 
  }: { 
    icon: any; 
    title: string; 
    stepNumber: number;
  }) => (
    <div className="flex items-center gap-3 mb-6">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-medium">
        {stepNumber}
      </div>
      <Icon className="h-5 w-5 text-primary" />
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
    </div>
  );
  
  return (
    <div className="w-full" onClick={handleFormClick}>
      <Form {...form}>
        <form onSubmit={e => e.preventDefault()}>
          {currentStep === 2 && selectedService === ServiceType.Home && (
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={fadeVariant}
            >
              {/* Unified Container */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                
                {/* 1. Home Details Section */}
                <div className="p-6">
                  <SectionHeader 
                    icon={Home} 
                    title="Home Details" 
                    stepNumber={1}
                  />
                  <HomeDetailsSection 
                    form={form} 
                    onSuggestedTimeSelect={handleSuggestedTimeSelect}
                  />
                </div>

                <div className="border-t border-gray-100 dark:border-gray-700"></div>

                {/* 2. Frequency Selection */}
                <div className="p-6">
                  <SectionHeader 
                    icon={Calendar} 
                    title="Cleaning Frequency" 
                    stepNumber={2}
                  />
                  <ServiceOptions 
                    frequency={frequency} 
                    setFrequency={freq => form.setValue('frequency', freq)} 
                    isRegularCleaning={true} 
                  />
                </div>
                
                {/* Progressive Disclosure - Show next sections only when previous are complete */}
                {sectionsCompleted.homeDetails && sectionsCompleted.frequency && frequency !== Frequency.Custom && (
                  <>
                    <div className="border-t border-gray-100 dark:border-gray-700"></div>
                    
                    {/* 3. Duration Section */}
                    <div className="p-6">
                      <SectionHeader 
                        icon={Clock} 
                        title="Duration" 
                        stepNumber={3}
                      />
                      <SimpleDurationInput form={form} />
                    </div>
                    
                    {/* 4. Calendar Section */}
                    {showCalendar && sectionsCompleted.duration && (
                      <>
                        <div className="border-t border-gray-100 dark:border-gray-700"></div>
                        <div className="p-6">
                          <SectionHeader 
                            icon={Calendar} 
                            title="Date & Time" 
                            stepNumber={4}
                          />
                          <OptimizedCalendar form={form} />
                        </div>
                      </>
                    )}
                    
                    {/* 5. Extras Section */}
                    {sectionsCompleted.duration && (
                      <>
                        <div className="border-t border-gray-100 dark:border-gray-700"></div>
                        <div className="p-6">
                          <SectionHeader 
                            icon={Plus} 
                            title="Additional Services" 
                            stepNumber={5}
                          />
                          <EnhancedExtras form={form} />
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>

              {/* Mobile Sticky Save Button */}
              {isMobile && (
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
                  <Button 
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl"
                    disabled={!sectionsCompleted.homeDetails || !sectionsCompleted.frequency}
                  >
                    Continue to Next Step
                  </Button>
                </div>
              )}
            </motion.div>
          )}
          
          {currentStep === 2 && selectedService === ServiceType.Office && (
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={fadeVariant} 
              key="business-step"
            >
              <BusinessStep form={form} />
            </motion.div>
          )}
          
          {currentStep === 3 && (
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={fadeVariant} 
              key="final-step"
            >
              <FinalStep 
                postalCode={postalCode} 
                onSubmit={submitBooking} 
                form={form} 
              />
            </motion.div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default BookingContent;
