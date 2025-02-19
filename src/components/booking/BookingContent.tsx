
import { motion } from 'framer-motion';
import ServiceOptions from './ServiceOptions';
import HoursSelection from './HoursSelection';
import Calendar from './Calendar';
import Extras from './Extras';
import MoveInOutStep from './MoveInOutStep';
import FinalStep from './FinalStep';
import { BookingFormData } from '@/schemas/booking';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';

interface BookingContentProps {
  currentStep: number;
  selectedService: string;
  form: ReturnType<typeof useForm<BookingFormData>>;
}

type FrequencyType = 'onetime' | 'weekly' | 'biweekly';

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
  const frequency = form.watch('frequency');

  const handleFrequencyChange = (freq: FrequencyType) => {
    form.setValue('frequency', freq);
  };

  const getRegularOrBusinessContent = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <ServiceOptions 
        frequency={(frequency as FrequencyType) || (selectedService === 'business' ? 'weekly' : 'onetime')} 
        setFrequency={handleFrequencyChange} 
      />
      <HoursSelection form={form} />
      <Calendar form={form} />
      <Extras form={form} />
    </motion.div>
  );

  return (
    <div className="w-full md:w-[70%]">
      {currentStep === 2 && selectedService === 'regular' && getRegularOrBusinessContent()}
      {currentStep === 2 && selectedService === 'moveinout' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <MoveInOutStep form={form} />
        </motion.div>
      )}
      {currentStep === 2 && selectedService === 'business' && getRegularOrBusinessContent()}
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
