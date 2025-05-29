
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ServiceOptions from './ServiceOptions';
import HoursSelection from './HoursSelection';
import Calendar from './Calendar';
import Extras from './Extras';
import MoveInOutStep from './MoveInOutStep';
import BusinessStep from './business/BusinessStep';
import DeepCleaningStep from './DeepCleaningStep';
import FinalStep from './FinalStep';
import { BookingFormData, Frequency } from '@/schemas/booking';
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
  const postalCode = form.watch('postalCode') || '';
  const showCalendar = frequency && frequency !== Frequency.Custom;
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const handleFormClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  return (
    <div className={`w-full ${isMobile ? 'px-2' : 'md:w-[80%]'}`} onClick={handleFormClick}>
      <Form {...form}>
        <form onSubmit={e => e.preventDefault()}>
          {currentStep === 2 && selectedService === 'regular' && (
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={fadeVariant} 
              className="space-y-3"
            >
              <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold mb-3 text-center text-zinc-950 text-sm">Regular Cleaning</h3>
                <ServiceOptions 
                  frequency={frequency} 
                  setFrequency={freq => form.setValue('frequency', freq)} 
                  isRegularCleaning={true} 
                />
              </div>
              
              {frequency !== Frequency.Custom && (
                <>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <HoursSelection form={form} />
                  </div>
                  
                  {showCalendar && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                      <Calendar form={form} />
                    </div>
                  )}
                  
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <Extras form={form} />
                  </div>
                </>
              )}
            </motion.div>
          )}
          
          {currentStep === 2 && selectedService === 'deep' && (
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={fadeVariant} 
              key="deep-cleaning-step"
            >
              <DeepCleaningStep form={form} />
            </motion.div>
          )}
          
          {currentStep === 2 && selectedService === 'moveInOut' && (
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={fadeVariant} 
              key="moveinout-step"
            >
              <MoveInOutStep form={form} />
            </motion.div>
          )}
          
          {currentStep === 2 && selectedService === 'business' && (
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
