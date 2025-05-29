
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";

interface HoursSelectionProps {
  form: UseFormReturn<BookingFormData>;
}

const HoursSelection = ({ form }: HoursSelectionProps) => {
  const selectedHours = form.watch('hours') || 2;

  const handleHoursChange = (hours: number) => {
    form.setValue('hours', hours);
  };

  const hourOptions = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-2"
    >
      <h4 className="text-base font-medium text-gray-900 dark:text-white mb-2">
        Set Duration
      </h4>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
        {hourOptions.map((hours) => (
          <Button
            key={hours}
            variant={selectedHours === hours ? "default" : "outline"}
            onClick={() => handleHoursChange(hours)}
            className="py-2 px-3 text-sm"
          >
            {hours}h
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

export default HoursSelection;
