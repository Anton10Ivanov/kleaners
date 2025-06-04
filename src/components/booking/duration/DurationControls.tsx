
import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormData } from '@/schemas/booking';

interface DurationControlsProps {
  form: UseFormReturn<BookingFormData>;
  visible: boolean;
}

export const DurationControls = ({ form, visible }: DurationControlsProps) => {
  const selectedHours = form.watch('hours') || 2;

  const handleHoursChange = (hours: number) => {
    const adjustedHours = Math.max(1, Math.min(8, hours));
    form.setValue('hours', adjustedHours);
  };

  const incrementHours = () => handleHoursChange(selectedHours + 0.5);
  const decrementHours = () => handleHoursChange(selectedHours - 0.5);

  const getRecommendation = (hours: number) => {
    if (hours <= 2) return 'Quick clean';
    if (hours <= 4) return 'Standard clean';
    if (hours <= 6) return 'Deep clean';
    return 'Thorough clean';
  };

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <h4 className="text-base font-medium text-gray-900 dark:text-white">
        Duration Selection
      </h4>
      
      <div className="flex items-center justify-center gap-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={decrementHours}
          disabled={selectedHours <= 1}
          className="h-10 w-10 rounded-full"
          aria-label="Decrease hours"
        >
          <Minus className="h-4 w-4" />
        </Button>
        
        <motion.div 
          className="text-center min-w-[80px]"
          key={selectedHours}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-2xl font-bold text-primary">{selectedHours}h</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {getRecommendation(selectedHours)}
          </div>
        </motion.div>
        
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={incrementHours}
          disabled={selectedHours >= 8}
          className="h-10 w-10 rounded-full"
          aria-label="Increase hours"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-center text-xs text-gray-500 bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">
        Selected: <strong>{selectedHours} hours</strong> • {getRecommendation(selectedHours)}
      </div>
    </motion.div>
  );
};
