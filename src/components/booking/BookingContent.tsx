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
import { useMediaQuery } from '@/hooks/use-media-query';
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
  const handleSubmit = (data: BookingFormData) => {
    console.log('Form submitted:', data);
    toast.success('Booking submitted successfully!');
  };
  const frequency = form.watch('frequency') as Frequency | undefined;
  const postalCode = form.watch('postalCode') || '';
  const showCalendar = frequency && frequency !== Frequency.Custom;
  const isMobile = useMediaQuery("(max-width: 768px)");
  const handleFormClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return <div className={`w-full ${isMobile ? 'px-2' : 'md:w-[80%]'}`} onClick={handleFormClick}>
      <Form {...form}>
        <form onSubmit={e => e.preventDefault()}>
          {currentStep === 2 && selectedService === 'regular' && <motion.div initial="hidden" animate="visible" variants={fadeVariant} className="space-y-6 bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold mb-4 md:mb-6 text-center text-zinc-950 text-sm">Regular Cleaning</h3>
              <ServiceOptions frequency={frequency} setFrequency={freq => form.setValue('frequency', freq)} isRegularCleaning={true} />
              {frequency !== Frequency.Custom && <div className="space-y-4 md:space-y-6">
                  <HoursSelection form={form} />
                  {showCalendar && <Calendar form={form} />}
                  <Extras form={form} />
                </div>}
            </motion.div>}
          {currentStep === 2 && selectedService === 'moveInOut' && <motion.div initial="hidden" animate="visible" variants={fadeVariant} key="moveinout-step" className="space-y-4 md:space-y-6">
              <MoveInOutStep form={form} />
            </motion.div>}
          {currentStep === 2 && selectedService === 'business' && <motion.div initial="hidden" animate="visible" variants={fadeVariant} key="business-step">
              <BusinessStep form={form} />
            </motion.div>}
          {currentStep === 3 && <motion.div initial="hidden" animate="visible" variants={fadeVariant} key="final-step">
              <FinalStep postalCode={postalCode} onSubmit={handleSubmit} form={form} />
            </motion.div>}
        </form>
      </Form>
    </div>;
};
export default BookingContent;