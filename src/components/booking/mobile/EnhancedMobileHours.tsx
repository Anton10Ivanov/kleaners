
import { motion } from 'framer-motion';
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calculator, Clock, Minus, Plus, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useSwipeGesture, useHapticFeedback, useReducedMotion } from '@/hooks/useMobileInteractions';
import { MobileEstimationDisplay } from './MobileEstimationDisplay';

interface EnhancedMobileHoursProps {
  form: UseFormReturn<BookingFormData>;
  onComplete?: () => void;
}

function estimateDuration(size: number, bedrooms: number, bathrooms: number, pace: 'standard' | 'quick' = 'standard'): number {
  let duration = 2; // Base

  if (size > 60) duration += Math.ceil((size - 60) / 20) * 0.5;
  if (bedrooms > 1) duration += (bedrooms - 1) * 0.3;
  if (bathrooms > 1) duration += (bathrooms - 1) * 0.5;
  let finalDuration = Math.min(duration, 8);

  // Apply quick pace reduction (20% off, but not below 2 hours)
  if (pace === 'quick') {
    finalDuration = Math.max(2, finalDuration * 0.8);
  }
  return Math.round(finalDuration * 2) / 2; // Round to nearest 0.5
}

const EnhancedMobileHours = ({ form, onComplete }: EnhancedMobileHoursProps) => {
  const selectedHours = form.watch('hours') || 2;
  const propertySize = form.watch('propertySize') || 70;
  const bedrooms = form.watch('bedrooms') || 0;
  const bathrooms = form.watch('bathrooms') || 0;
  const cleaningPace = form.watch('cleaningPace') || 'standard';
  
  const [showCalculator, setShowCalculator] = useState(false);
  const [hasConfirmedSelection, setHasConfirmedSelection] = useState(false);
  const { triggerHaptic } = useHapticFeedback();
  const prefersReducedMotion = useReducedMotion();

  const hourOptions = [1, 2, 3, 4, 5, 6, 7, 8];

  // Calculate estimation
  const allFieldsFilled = propertySize > 0 && bedrooms > 0 && bathrooms > 0;
  const suggestedDuration = allFieldsFilled ? estimateDuration(propertySize, bedrooms, bathrooms, cleaningPace as 'standard' | 'quick') : 0;

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
    // Reset confirmation when hours change
    setHasConfirmedSelection(false);
  };

  const handleSuggestedTime = (hours: number) => {
    form.setValue('hours', hours);
    triggerHaptic('light');
    setHasConfirmedSelection(true);
    
    // Grant permission to proceed immediately
    if (onComplete) {
      setTimeout(() => {
        onComplete();
      }, 300);
    }
  };

  const handleUseMyPreference = () => {
    setHasConfirmedSelection(true);
    triggerHaptic('medium');
    
    // Grant permission to proceed
    if (onComplete) {
      setTimeout(() => {
        onComplete();
      }, 300);
    }
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
    <motion.div {...animationProps} className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Duration</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowCalculator(!showCalculator)}
          className="h-9 px-3"
          aria-label="Show cleaning time calculator"
        >
          <Calculator className="h-4 w-4 mr-1" />
          Help
        </Button>
      </div>

      {showCalculator && (
        <Card className="p-3 bg-blue-50 dark:bg-blue-900/20 border-blue-200">
          <p className="text-xs text-blue-800 dark:text-blue-200">
            <strong>Quick guide:</strong><br />
            • 1-2 hours: Small apartment, light cleaning<br />
            • 3-4 hours: Standard home, regular cleaning<br />
            • 5+ hours: Large home or deep cleaning
          </p>
        </Card>
      )}

      {/* Show estimation if available */}
      <MobileEstimationDisplay
        form={form}
        allFieldsFilled={allFieldsFilled}
        suggestedDuration={suggestedDuration}
        propertySize={propertySize}
        bedrooms={bedrooms}
        bathrooms={bathrooms}
        cleaningPace={cleaningPace}
        onSuggestedTimeSelect={handleSuggestedTime}
      />

      {/* Enhanced slider with +/- controls */}
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={decrementHours}
            disabled={selectedHours <= 1}
            className="h-10 w-10 rounded-full"
            aria-label="Decrease hours"
          >
            <Minus className="h-4 w-4" />
          </Button>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{selectedHours}h</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {getRecommendation(selectedHours)}
            </div>
          </div>
          
          <Button
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

        {/* Swipeable grid with better touch targets */}
        <div 
          ref={swipeRef as any}
          className="grid grid-cols-4 gap-2"
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
                  w-full h-full min-h-[48px] flex flex-col items-center justify-center
                  text-sm font-medium transition-all touch-manipulation
                  ${selectedHours === hours 
                    ? 'bg-primary text-white shadow-lg ring-2 ring-primary/20' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100'
                  }
                `}
                role="radio"
                aria-checked={selectedHours === hours}
                aria-label={`${hours} hours - ${getRecommendation(hours)}`}
              >
                <span className="text-lg font-bold">{hours}h</span>
                <span className="text-xs opacity-75 text-center leading-tight">
                  {getRecommendation(hours)}
                </span>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Use My Preference Button */}
        <Button
          onClick={handleUseMyPreference}
          className={`
            w-full h-11 font-medium transition-all
            ${hasConfirmedSelection 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-primary hover:bg-primary/90 text-white'
            }
          `}
          disabled={hasConfirmedSelection}
        >
          {hasConfirmedSelection ? (
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Duration Confirmed ({selectedHours} hours)
            </div>
          ) : (
            `Use My Preference (${selectedHours} hours)`
          )}
        </Button>

        <div className="text-center text-xs text-gray-600 dark:text-gray-400 bg-green-50 dark:bg-green-900/20 p-2 rounded-lg">
          Selected: <strong>{selectedHours} hours</strong> • {getRecommendation(selectedHours)}
          <div className="text-xs mt-1 opacity-75">Swipe left/right to change quickly</div>
        </div>
      </div>
    </motion.div>
  );
};

export default EnhancedMobileHours;
