
import { Button } from '@/components/ui/button';
import { Clock, Minus, Plus } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormData } from '@/schemas/booking';
import { motion } from 'framer-motion';

interface SimpleDurationInputProps {
  form: UseFormReturn<BookingFormData>;
}

const SimpleDurationInput = ({ form }: SimpleDurationInputProps) => {
  const hours = form.watch('hours') || 2;

  const handleHoursChange = (newHours: number) => {
    const adjustedHours = Math.max(2, Math.min(8, newHours));
    form.setValue('hours', adjustedHours);
  };

  const incrementHours = () => {
    handleHoursChange(hours + 0.5);
  };

  const decrementHours = () => {
    handleHoursChange(hours - 0.5);
  };

  const getServiceType = (duration: number) => {
    if (duration <= 2.5) return { text: "Quick clean", color: "text-blue-600" };
    if (duration <= 4) return { text: "Standard clean", color: "text-green-600" };
    if (duration <= 6) return { text: "Deep clean", color: "text-orange-600" };
    return { text: "Extensive clean", color: "text-purple-600" };
  };

  const serviceType = getServiceType(hours);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-6">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={decrementHours}
            disabled={hours <= 2}
            className="h-12 w-12 p-0 rounded-full border-2 hover:border-primary hover:bg-primary/10 transition-all disabled:opacity-30"
          >
            <Minus className="h-5 w-5" />
          </Button>
          
          <motion.div 
            className="text-center"
            key={hours}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-2 bg-primary/10 rounded-xl px-6 py-3">
              <Clock className="h-6 w-6 text-primary" />
              <span className="text-3xl font-bold text-primary">{hours}</span>
              <span className="text-lg text-gray-600 dark:text-gray-400">hours</span>
            </div>
          </motion.div>
          
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={incrementHours}
            disabled={hours >= 8}
            className="h-12 w-12 p-0 rounded-full border-2 hover:border-primary hover:bg-primary/10 transition-all disabled:opacity-30"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="text-center space-y-2">
        <div className={`text-base font-medium ${serviceType.color}`}>
          {serviceType.text}
        </div>
        <div className="text-sm text-gray-500">
          Estimated cost: €{hours * 30} per session
        </div>
      </div>
    </div>
  );
};

export default SimpleDurationInput;
