
import { motion } from 'framer-motion';
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calculator, Clock, Minus, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useSwipeGesture, useHapticFeedback, useReducedMotion } from '@/hooks/useMobileInteractions';

interface EnhancedMobileHoursProps {
  form: UseFormReturn<BookingFormData>;
  onComplete?: () => void;
}

const EnhancedMobileHours = ({ form, onComplete }: EnhancedMobileHoursProps) => {
  const selectedHours = form.watch('hours') || 2;
  const [showCalculator, setShowCalculator] = useState(false);
  const { triggerHaptic } = useHapticFeedback();
  const prefersReducedMotion = useReducedMotion();

  const hourOptions = [1, 2, 3, 4, 5, 6, 7, 8];

  const swipeRef = useSwipeGesture({
    onSwipeLeft: () => {
      const currentIndex = hourOptions.indexOf(selectedHours);
      if (currentIndex < hourOptions.length - 1) {
        handleHoursChange(hourOptions[currentIndex + 1]);
      }
    },
    onSwipeRight: () => {
      const currentIndex = hourOptions.indexOf(selectedHours);
      if (currentIndex > 0) {
        handleHoursChange(hourOptions[currentIndex - 1]);
      }
    }
  });

  const handleHoursChange = (hours: number) => {
    form.setValue('hours', hours);
    triggerHaptic('light');
    
    // Auto-advance when selection is made
    setTimeout(() => {
      onComplete?.();
    }, 300);
  };

  const incrementHours = () => {
    const newHours = Math.min(selectedHours + 1, 8);
    if (newHours !== selectedHours) {
      handleHoursChange(newHours);
    }
  };

  const decrementHours = () => {
    const newHours = Math.max(selectedHours - 1, 1);
    if (newHours !== selectedHours) {
      handleHoursChange(newHours);
    }
  };

  const getRecommendation = (hours: number) => {
    if (hours <= 2) return 'Quick clean';
    if (hours <= 4) return 'Standard clean';
    if (hours <= 6) return 'Deep clean';
    return 'Thorough clean';
  };

  const animationProps = prefersReducedMotion ? {} : {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  };

  return (
    <motion.div {...animationProps} className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-6 w-6 text-primary" />
          <h3 className="text-xl font-semibold">How many hours?</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowCalculator(!showCalculator)}
          className="h-10 px-4"
          aria-label="Show cleaning time calculator"
        >
          <Calculator className="h-4 w-4 mr-2" />
          Help
        </Button>
      </div>

      {showCalculator && (
        <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200">
          <p className="text-sm text-blue-800 dark:text-blue-200" role="region" aria-label="Cleaning time guide">
            <strong>Quick guide:</strong><br />
            • 1-2 hours: Small apartment, light cleaning<br />
            • 3-4 hours: Standard home, regular cleaning<br />
            • 5+ hours: Large home or deep cleaning
          </p>
        </Card>
      )}

      {/* Enhanced slider with +/- controls */}
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={decrementHours}
            disabled={selectedHours <= 1}
            className="h-12 w-12 rounded-full"
            aria-label="Decrease hours"
          >
            <Minus className="h-5 w-5" />
          </Button>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">{selectedHours}h</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {getRecommendation(selectedHours)}
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={incrementHours}
            disabled={selectedHours >= 8}
            className="h-12 w-12 rounded-full"
            aria-label="Increase hours"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        {/* Swipeable grid with better touch targets */}
        <div 
          ref={swipeRef as any}
          className="grid grid-cols-4 gap-3"
          role="radiogroup"
          aria-label="Select cleaning duration"
        >
          {hourOptions.map((hours) => (
            <motion.div 
              key={hours} 
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              className="aspect-square"
            >
              <Button
                variant={selectedHours === hours ? "default" : "outline"}
                onClick={() => handleHoursChange(hours)}
                className={`
                  w-full h-full min-h-[56px] flex flex-col items-center justify-center
                  text-base font-medium transition-all touch-manipulation
                  ${selectedHours === hours 
                    ? 'bg-primary text-white shadow-lg ring-2 ring-primary/20' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100'
                  }
                `}
                role="radio"
                aria-checked={selectedHours === hours}
                aria-label={`${hours} hours - ${getRecommendation(hours)}`}
              >
                <span className="text-xl font-bold">{hours}h</span>
                <span className="text-xs opacity-75 text-center leading-tight">
                  {getRecommendation(hours)}
                </span>
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
          Selected: <strong>{selectedHours} hours</strong> • {getRecommendation(selectedHours)}
          <div className="text-xs mt-1 opacity-75">Swipe left/right to change quickly</div>
        </div>
      </div>
    </motion.div>
  );
};

export default EnhancedMobileHours;
