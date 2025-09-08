
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormData } from '@/schemas/booking';
import { useState } from 'react';

interface EstimationDisplayProps {
  form: UseFormReturn<BookingFormData>;
  allFieldsFilled: boolean;
  suggestedDuration: number;
  propertySize: number;
  bedrooms: number;
  bathrooms: number;
  cleaningPace: string;
  onSuggestedTimeSelect?: (hours: number) => void;
}

export const EstimationDisplay = ({
  form,
  allFieldsFilled,
  suggestedDuration,
  propertySize,
  bedrooms,
  bathrooms,
  cleaningPace,
  onSuggestedTimeSelect
}: EstimationDisplayProps) => {
  const hours = form.watch('hours') || 2;
  const [hasSuggestedTimeUsed, setHasSuggestedTimeUsed] = useState(false);

  const handleHoursChange = (newHours: number) => {
    const adjustedHours = Math.max(2, Math.min(8, newHours));
    form.setValue('hours', adjustedHours);
  };

  const incrementHours = () => handleHoursChange(hours + 0.5);
  const decrementHours = () => handleHoursChange(hours - 0.5);

  const handleUseSuggestedDuration = () => {
    if (onSuggestedTimeSelect && suggestedDuration > 0) {
      form.setValue('hours', suggestedDuration);
      setHasSuggestedTimeUsed(true);
      onSuggestedTimeSelect(suggestedDuration);
    }
  };

  const getServiceType = (duration: number) => {
    if (duration <= 2.5) return { text: "Quick clean", color: "text-blue-600" };
    if (duration <= 4) return { text: "Standard clean", color: "text-green-600" };
    if (duration <= 6) return { text: "Deep clean", color: "text-secondary" };
    return { text: "Extensive clean", color: "text-purple-600" };
  };

  const serviceType = getServiceType(hours);

  return (
    <AnimatePresence>
      {allFieldsFilled && suggestedDuration > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <Alert className="bg-primary/10 border-primary/20">
            <div className="flex items-start gap-3">
              <div className="p-1 bg-primary/20 rounded-full mt-1">
                <CheckCircle className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 form-spacing-relaxed">
                <AlertDescription>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-base">
                      🧹 Estimated cleaning time: {suggestedDuration} hours{cleaningPace === 'quick' ? ' (Quick Clean)' : ''}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Based on {propertySize} m², {bedrooms === 0 ? 'Studio' : `${bedrooms} bedroom${bedrooms !== 1 ? 's' : ''}`}, {bathrooms} bathroom{bathrooms !== 1 ? 's' : ''}{cleaningPace === 'quick' ? ', and a quick pace' : ''}.
                    </p>
                    
                    <Button 
                      type="button" 
                      onClick={handleUseSuggestedDuration} 
                      className={`
                        w-full mt-3 font-medium transition-all
                        ${hasSuggestedTimeUsed 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : 'bg-primary hover:bg-primary/90'
                        }
                      `}
                      disabled={hasSuggestedTimeUsed}
                    >
                      {hasSuggestedTimeUsed ? (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Suggested Duration Applied ({suggestedDuration} hours)
                        </div>
                      ) : (
                        `Use Suggested Duration (${suggestedDuration} hours)`
                      )}
                    </Button>
                  </div>
                </AlertDescription>
                
                {/* Duration Selector */}
                <div className="form-spacing-normal">
                  <div className="flex items-center justify-center gap-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={decrementHours} 
                      disabled={hours <= 2} 
                      className="h-10 w-10 card-spacing-none rounded-full disabled:opacity-30"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    
                    <motion.div 
                      className="text-center" 
                      key={hours} 
                      initial={{ scale: 1.05 }} 
                      animate={{ scale: 1 }} 
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border rounded-lg px-4 section-spacing-xs">
                        <span className="text-xl font-bold text-primary">{hours}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">hours</span>
                      </div>
                    </motion.div>
                    
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={incrementHours} 
                      disabled={hours >= 8} 
                      className="h-10 w-10 card-spacing-none rounded-full disabled:opacity-30"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="text-center">
                    <div className={`text-sm font-medium ${serviceType.color}`}>
                      {serviceType.text}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
