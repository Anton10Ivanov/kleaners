
import { motion } from 'framer-motion';
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calculator, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface MobileHoursSelectionProps {
  form: UseFormReturn<BookingFormData>;
  onComplete?: () => void;
}

const MobileHoursSelection = ({ form, onComplete }: MobileHoursSelectionProps) => {
  const selectedHours = form.watch('hours') || 2;
  const [showCalculator, setShowCalculator] = useState(false);

  const hourOptions = [1, 2, 3, 4, 5, 6, 7, 8];

  const handleHoursChange = (hours: number) => {
    form.setValue('hours', hours);
    // Auto-advance when selection is made
    setTimeout(() => {
      onComplete?.();
    }, 300);
  };

  const getRecommendation = (hours: number) => {
    if (hours <= 2) return 'Quick clean';
    if (hours <= 4) return 'Standard clean';
    if (hours <= 6) return 'Deep clean';
    return 'Thorough clean';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">How many hours?</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowCalculator(!showCalculator)}
          className="h-8 px-3"
        >
          <Calculator className="h-4 w-4 mr-1" />
          Help
        </Button>
      </div>

      {showCalculator && (
        <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Quick guide:</strong><br />
            • 1-2 hours: Small apartment, light cleaning<br />
            • 3-4 hours: Standard home, regular cleaning<br />
            • 5+ hours: Large home or deep cleaning
          </p>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-3">
        {hourOptions.map((hours) => (
          <motion.div key={hours} whileTap={{ scale: 0.95 }}>
            <Button
              variant={selectedHours === hours ? "default" : "outline"}
              onClick={() => handleHoursChange(hours)}
              className={`
                w-full h-16 flex flex-col items-center justify-center
                text-base font-medium transition-all
                ${selectedHours === hours 
                  ? 'bg-primary text-white shadow-md ring-2 ring-primary/20' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                }
              `}
            >
              <span className="text-xl font-bold">{hours}h</span>
              <span className="text-xs opacity-75">
                {getRecommendation(hours)}
              </span>
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        Selected: <strong>{selectedHours} hours</strong> • {getRecommendation(selectedHours)}
      </div>
    </motion.div>
  );
};

export default MobileHoursSelection;
