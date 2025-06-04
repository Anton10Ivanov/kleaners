
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormData } from '@/schemas/booking';
import { useState } from 'react';

interface MobileEstimationDisplayProps {
  form: UseFormReturn<BookingFormData>;
  allFieldsFilled: boolean;
  suggestedDuration: number;
  propertySize: number;
  bedrooms: number;
  bathrooms: number;
  cleaningPace: string;
  onSuggestedTimeSelect?: (hours: number) => void;
}

export const MobileEstimationDisplay = ({
  form,
  allFieldsFilled,
  suggestedDuration,
  propertySize,
  bedrooms,
  bathrooms,
  cleaningPace,
  onSuggestedTimeSelect
}: MobileEstimationDisplayProps) => {
  const [hasSuggestedTimeUsed, setHasSuggestedTimeUsed] = useState(false);

  const handleUseSuggestedDuration = () => {
    if (onSuggestedTimeSelect && suggestedDuration > 0) {
      form.setValue('hours', suggestedDuration);
      setHasSuggestedTimeUsed(true);
      onSuggestedTimeSelect(suggestedDuration);
    }
  };

  return (
    <AnimatePresence>
      {allFieldsFilled && suggestedDuration > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="space-y-3"
        >
          <Alert className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
            <div className="flex items-start gap-3">
              <div className="p-1 bg-primary/20 rounded-full mt-1">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 space-y-3">
                <AlertDescription>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      🧹 Recommended: {suggestedDuration} hours{cleaningPace === 'quick' ? ' (Quick Clean)' : ''}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Based on {propertySize} m², {bedrooms === 0 ? 'Studio' : `${bedrooms} bedroom${bedrooms !== 1 ? 's' : ''}`}, {bathrooms} bathroom{bathrooms !== 1 ? 's' : ''}{cleaningPace === 'quick' ? ', quick pace' : ''}.
                    </p>
                  </div>
                </AlertDescription>
                
                <Button 
                  type="button" 
                  onClick={handleUseSuggestedDuration} 
                  className={`
                    w-full h-11 text-sm font-medium transition-all
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
                      Applied ({suggestedDuration} hours)
                    </div>
                  ) : (
                    `Use Recommended (${suggestedDuration} hours)`
                  )}
                </Button>
              </div>
            </div>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
