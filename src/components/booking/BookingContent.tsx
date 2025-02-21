
import { motion } from 'framer-motion';
import ServiceOptions from './ServiceOptions';
import HoursSelection from './HoursSelection';
import Calendar from './Calendar';
import Extras from './Extras';
import MoveInOutStep from './MoveInOutStep';
import BusinessStep from './business/BusinessStep';
import FinalStep from './FinalStep';
import { BookingFormData } from '@/schemas/booking';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';

interface BookingContentProps {
  currentStep: number;
  selectedService: string;
  form: ReturnType<typeof useForm<BookingFormData>>;
}

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

  return (
    <div className="w-full md:w-[70%]">
      {currentStep === 2 && selectedService === 'regular' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <ServiceOptions 
            frequency={form.watch('frequency') || 'onetime'} 
            setFrequency={(freq) => form.setValue('frequency', freq)} 
          />
          <HoursSelection form={form} />
          <Calendar form={form} />
          <Extras form={form} />
        </motion.div>
      )}
      {currentStep === 2 && selectedService === 'moveinout' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <MoveInOutStep form={form} />
        </motion.div>
      )}
      {currentStep === 2 && selectedService === 'business' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <BusinessStep form={form} />
        </motion.div>
      )}
      {currentStep === 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <FinalStep 
            postalCode={postalCode}
            onSubmit={handleSubmit}
          />
        </motion.div>
      )}
    </div>
  );
};

export default BookingContent;
