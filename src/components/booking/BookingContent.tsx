
import { motion } from 'framer-motion';
import ServiceOptions from './ServiceOptions';
import HoursSelection from './HoursSelection';
import Calendar from './Calendar';
import Extras from './Extras';
import MoveInOutStep from './MoveInOutStep';
import BusinessStep from './business/BusinessStep';
import FinalStep from './FinalStep';
import { BookingFormData, Frequency } from '@/schemas/booking';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';

interface BookingContentProps {
  currentStep: number;
  selectedService: string;
  form: ReturnType<typeof useForm<BookingFormData>>;
}

const fadeVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const BookingContent = ({
  currentStep,
  selectedService,
  form
}: BookingContentProps) => {
  const handleSubmit = (data: BookingFormData) => {
    console.log('Form submitted:', data);
    toast.success('Booking submitted successfully!');
  };

  const postalCode = form.watch('postalCode') || '';
  const frequency = form.watch('frequency') as Frequency | undefined;
  const showCalendar = frequency && frequency !== Frequency.Custom;
  
  const handleFormClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="w-full md:w-[80%]" onClick={handleFormClick}>
      <Form {...form}>
        <form onSubmit={(e) => e.preventDefault()}>
          {currentStep === 2 && selectedService === 'regular' && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeVariant}
              className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                Regular Cleaning Details
              </h3>
              <ServiceOptions 
                frequency={frequency}
                setFrequency={(freq) => form.setValue('frequency', freq)}
                isRegularCleaning={true}
              />
              {frequency !== Frequency.Custom && (
                <>
                  <HoursSelection form={form} />
                  {showCalendar && <Calendar form={form} />}
                  <Extras form={form} />
                </>
              )}
            </motion.div>
          )}
          {currentStep === 2 && selectedService === 'moveInOut' && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeVariant}
              key="moveinout-step"
              className="space-y-6"
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
                onSubmit={handleSubmit}
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
