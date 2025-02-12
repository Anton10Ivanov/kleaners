
import { motion } from 'framer-motion';
import ServiceOptions from './ServiceOptions';
import HoursSelection from './HoursSelection';
import Calendar from './Calendar';
import Extras from './Extras';
import DeepCleaningStep from './DeepCleaningStep';
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
    // Handle form submission
    console.log('Form submitted:', data);
    toast.success('Booking submitted successfully!');
    // Here you would typically send the data to your backend
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
      {currentStep === 2 && selectedService === 'deep' && (
        <DeepCleaningStep
          date={date}
          setDate={(date) => setValue('date', date)}
        />
      )}
      {currentStep === 3 && (
        <FinalStep 
          postalCode={postalCode}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default BookingContent;
