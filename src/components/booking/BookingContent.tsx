
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
  const showCalendar = frequency && frequency !== Frequency.Custom;
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  console.log('BookingContent - selectedService:', selectedService);
  console.log('BookingContent - currentStep:', currentStep);
  
  const handleFormClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSuggestedTimeSelect = (suggestedHours: number) => {
    form.setValue('hours', suggestedHours);
    // Scroll to the duration section
    const durationSection = document.querySelector('[data-duration-section]');
    if (durationSection) {
      durationSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Calculate savings percentage
  const calculateSavings = (freq: Frequency | undefined) => {
    if (!freq || freq === Frequency.OneTime) return 0;
    
    const oneTimePrice = hours * 35; // One-time rate
    const recurringPrice = hours * (freq === Frequency.Weekly ? 27 : 30); // Recurring rates
    
    return Math.round(((oneTimePrice - recurringPrice) / oneTimePrice) * 100);
  };

  const savingsPercentage = calculateSavings(frequency);
  
  return (
    <div className="w-full" onClick={handleFormClick}>
      <Form {...form}>
        <form onSubmit={e => e.preventDefault()}>
          {currentStep === 2 && selectedService === ServiceType.Home && (
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={fadeVariant} 
              className="space-y-4"
            >
              {/* Home Details Section */}
              <HomeDetailsSection 
                form={form} 
                onSuggestedTimeSelect={handleSuggestedTimeSelect}
              />

              {/* 1. Cleaning Interval - MOVED TO POSITION 1 */}
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-center text-zinc-950 dark:text-white text-lg">
                    Cleaning Interval
                  </h3>
                  {savingsPercentage > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-1">
                      <span className="text-red-600 font-bold text-sm">
                        Save {savingsPercentage}% vs one-time
                      </span>
                    </div>
                  )}
                </div>
                <ServiceOptions 
                  frequency={frequency} 
                  setFrequency={freq => form.setValue('frequency', freq)} 
                  isRegularCleaning={true} 
                />
              </div>
              
              {frequency !== Frequency.Custom && (
                <>
                  {/* 2. Duration - SIMPLIFIED INPUT */}
                  <div 
                    className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
                    data-duration-section
                  >
                    <SimpleDurationInput form={form} />
                  </div>
                  
                  {/* 3. Calendar */}
                  {showCalendar && (
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                      <OptimizedCalendar form={form} />
                    </div>
                  )}
                  
                  {/* 4. Extras */}
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <EnhancedExtras form={form} />
                  </div>
                </>
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
