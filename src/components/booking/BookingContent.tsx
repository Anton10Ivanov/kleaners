
import { motion } from 'framer-motion';
import ServiceOptions from './ServiceOptions';
import HoursSelection from './HoursSelection';
import Calendar from './Calendar';
import Extras from './Extras';
import MoveInOutStep from './MoveInOutStep';
import FinalStep from './FinalStep';
import { calculateRecommendedTime } from '@/utils/bookingCalculations';
import { BookingFormData } from '@/schemas/booking';
import { toast } from 'sonner';

interface BookingContentProps {
  currentStep: number;
  selectedService: string;
  frequency: string;
  hours: number;
  date: Date | undefined;
  bedrooms: number;
  bathrooms: number;
  selectedExtras: string[];
  setValue: (name: any, value: any) => void;
  postalCode: string;
}

const BookingContent = ({
  currentStep,
  selectedService,
  frequency,
  hours,
  date,
  bedrooms,
  bathrooms,
  selectedExtras,
  setValue,
  postalCode
}: BookingContentProps) => {
  const handleSubmit = (data: BookingFormData) => {
    console.log('Form submitted:', data);
    toast.success('Booking submitted successfully!');
  };

  return (
    <div className="w-full md:w-[70%]">
      {currentStep === 2 && selectedService === 'regular' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <ServiceOptions 
            frequency={frequency} 
            setFrequency={(freq) => setValue('frequency', freq as "onetime" | "weekly" | "biweekly")} 
          />
          <HoursSelection 
            hours={hours}
            setHours={(val) => setValue('hours', val)}
            recommendedTime={calculateRecommendedTime(bedrooms, bathrooms)}
            bedrooms={bedrooms}
            setBedrooms={(val) => setValue('bedrooms', val)}
            bathrooms={bathrooms}
            setBathrooms={(val) => setValue('bathrooms', val)}
          />
          <Calendar 
            date={date}
            setDate={(date) => setValue('date', date)}
          />
          <Extras
            selectedExtras={selectedExtras}
            setSelectedExtras={(extras) => setValue('extras', extras)}
            frequency={frequency}
          />
        </motion.div>
      )}
      {currentStep === 2 && selectedService === 'moveinout' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <MoveInOutStep
            date={date}
            setDate={(date) => setValue('date', date)}
          />
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
