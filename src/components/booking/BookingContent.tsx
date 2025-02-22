
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
import { FrequencyTimeSelector } from './business/components/FrequencyTimeSelector';

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
  const frequency = form.watch('frequency') as Frequency | undefined;
  const showFrequencyTimeSelector = frequency === Frequency.Weekly || 
    frequency === Frequency.Biweekly || 
    frequency === Frequency.Custom;
  const showCalendar = frequency === Frequency.Onetime || frequency === Frequency.Biweekly;

  const handleFormClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="w-full md:w-[70%]" onClick={handleFormClick}>
      <Form {...form}>
        <form onSubmit={(e) => e.preventDefault()}>
          {currentStep === 2 && selectedService === 'regular' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <ServiceOptions 
                frequency={frequency}
                setFrequency={(freq) => form.setValue('frequency', freq)} 
              />
              {frequency !== Frequency.Custom && (
                <>
                  <HoursSelection form={form} />
                  {showCalendar && <Calendar form={form} />}
                  {showFrequencyTimeSelector && <FrequencyTimeSelector form={form} />}
                  <Extras form={form} />
                </>
              )}
              {frequency === Frequency.Custom && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <p className="text-gray-600">
                    Our team will contact you shortly to discuss your custom cleaning schedule and requirements.
                  </p>
                </div>
              )}
            </motion.div>
          )}
          {currentStep === 2 && selectedService === 'moveinout' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              key="moveinout-step"
              className="space-y-6"
            >
              <MoveInOutStep form={form} />
            </motion.div>
          )}
          {currentStep === 2 && selectedService === 'business' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key="business-step"
            >
              <BusinessStep form={form} />
            </motion.div>
          )}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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

