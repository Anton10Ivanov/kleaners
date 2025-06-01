
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ServiceOptions from './ServiceOptions';
import HoursSelection from './HoursSelection';
import OptimizedCalendar from './OptimizedCalendar';
import EnhancedExtras from './EnhancedExtras';
import BusinessStep from './business/BusinessStep';
import FinalStep from './FinalStep';
import { PropertySizeField } from './PropertySizeField';
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
  const postalCode = form.watch('postalCode') || '';
  const propertySize = form.watch('propertySize') || 70;
  const showCalendar = frequency && frequency !== Frequency.Custom;
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  console.log('BookingContent - selectedService:', selectedService);
  console.log('BookingContent - currentStep:', currentStep);
  
  const handleFormClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
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
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold mb-4 text-center text-zinc-950 dark:text-white text-lg">
                  Home Cleaning
                </h3>
                <ServiceOptions 
                  frequency={frequency} 
                  setFrequency={freq => form.setValue('frequency', freq)} 
                  isRegularCleaning={true} 
                />
              </div>

              {/* Property Size Field for Home Cleaning */}
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <PropertySizeField
                  value={propertySize}
                  onChange={(value) => form.setValue('propertySize', value)}
                />
              </div>
              
              {frequency !== Frequency.Custom && (
                <>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <HoursSelection form={form} />
                  </div>
                  
                  {showCalendar && (
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                      <OptimizedCalendar form={form} />
                    </div>
                  )}
                  
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
