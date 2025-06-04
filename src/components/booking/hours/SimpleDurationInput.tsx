
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
    const adjustedHours = Math.max(2, Math.min(8, newHours)); // Min 2, Max 8
    form.setValue('hours', adjustedHours);
  };

  const incrementHours = () => {
    handleHoursChange(hours + 0.5);
  };

  const decrementHours = () => {
    handleHoursChange(hours - 0.5);
  };

  const getRecommendation = (duration: number) => {
    if (duration <= 2.5) return { text: "Quick clean", color: "text-blue-600" };
    if (duration <= 4) return { text: "Standard clean", color: "text-green-600" };
    if (duration <= 6) return { text: "Deep clean", color: "text-orange-600" };
    return { text: "Extensive clean", color: "text-purple-600" };
  };

  const recommendation = getRecommendation(hours);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="space-y-4">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Hours needed (minimum 2 hours)
        </Label>
        
        <div className="flex items-center gap-4 justify-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={decrementHours}
            disabled={hours <= 2}
            className="h-12 w-12 p-0 rounded-full border-2 hover:border-primary hover:bg-primary/10 transition-all"
          >
            <Minus className="h-5 w-5" />
          </Button>
          
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 bg-primary/10 rounded-lg px-4 py-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold text-primary">{hours}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">hours</span>
            </div>
            <div className="text-center">
              <div className={`text-sm font-medium ${recommendation.color}`}>
                {recommendation.text}
              </div>
              <div className="text-xs text-gray-500">
                €{hours * 30}/session
              </div>
            </div>
          </div>
          
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={incrementHours}
            disabled={hours >= 8}
            className="h-12 w-12 p-0 rounded-full border-2 hover:border-primary hover:bg-primary/10 transition-all"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        {/* Visual connection to home estimation */}
        <div className="bg-gradient-to-r from-primary/10 to-transparent border-l-4 border-primary pl-4 py-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            💡 This duration was calculated based on your home details above
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SimpleDurationInput;
