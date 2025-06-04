
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormData } from '@/schemas/booking';

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

  const handleHoursChange = (newHours: number) => {
    const adjustedHours = Math.max(2, Math.min(8, newHours));
    form.setValue('hours', adjustedHours);
  };

  const incrementHours = () => handleHoursChange(hours + 0.5);
  const decrementHours = () => handleHoursChange(hours - 0.5);

  const handleUseSuggestedDuration = () => {
    if (onSuggestedTimeSelect && suggestedDuration > 0) {
      form.setValue('hours', suggestedDuration);
      onSuggestedTimeSelect(suggestedDuration);
    }
  };

  const getServiceType = (duration: number) => {
    if (duration <= 2.5) return { text: "Quick clean", color: "text-blue-600" };
    if (duration <= 4) return { text: "Standard clean", color: "text-green-600" };
    if (duration <= 6) return { text: "Deep clean", color: "text-orange-600" };
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
          <Alert className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
            <div className="flex items-start gap-3">
              <div className="p-1 bg-primary/20 rounded-full mt-1">
                <CheckCircle className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 space-y-4">
                <AlertDescription>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-base">
                      🧹 Estimated cleaning time: {suggestedDuration} hours{cleaningPace === 'quick' ? ' (Quick Clean)' : ''}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Based on {propertySize} m², {bedrooms === 0 ? 'Studio' : `${bedrooms} bedroom${bedrooms !== 1 ? 's' : ''}`}, {bathrooms} bathroom{bathrooms !== 1 ? 's' : ''}{cleaningPace === 'quick' ? ', and a quick pace' : ''}.
                    </p>
                  </div>
                </AlertDescription>
                
                {/* Duration Selector */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Adjust duration:
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={decrementHours} 
                      disabled={hours <= 2} 
                      className="h-10 w-10 p-0 rounded-full disabled:opacity-30"
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
                      <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border rounded-lg px-4 py-2">
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
                      className="h-10 w-10 p-0 rounded-full disabled:opacity-30"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="text-center space-y-1">
                    <div className={`text-sm font-medium ${serviceType.color}`}>
                      {serviceType.text}
                    </div>
                    <div className="text-sm text-gray-500">
                      Estimated cost: €{hours * 30} per session
                    </div>
                  </div>
                </div>
                
                <Button 
                  type="button" 
                  onClick={handleUseSuggestedDuration} 
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Use Suggested Duration ({suggestedDuration} hours)
                </Button>
              </div>
            </div>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
