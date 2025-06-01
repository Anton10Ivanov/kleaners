
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, CheckCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormData } from '@/schemas/booking';
import { DeepCleaningPopup } from './DeepCleaningPopup';

interface HomeDetailsSectionProps {
  form: UseFormReturn<BookingFormData>;
  onSuggestedTimeSelect?: (hours: number) => void;
}

function estimateDuration(size: number, bedrooms: number, bathrooms: number): number {
  let duration = 2; // Base

  if (size > 60) duration += Math.ceil((size - 60) / 20) * 0.5;
  if (bedrooms > 1) duration += (bedrooms - 1) * 0.3;
  if (bathrooms > 1) duration += (bathrooms - 1) * 0.5;

  return Math.min(duration, 8);
}

export const HomeDetailsSection = ({ form, onSuggestedTimeSelect }: HomeDetailsSectionProps) => {
  const [showDeepCleaningPopup, setShowDeepCleaningPopup] = useState(false);
  
  const propertySize = form.watch('propertySize') || 0;
  const bedrooms = form.watch('bedrooms') || 0;
  const bathrooms = form.watch('bathrooms') || 0;

  const allFieldsFilled = propertySize > 0 && bedrooms > 0 && bathrooms > 0;
  const suggestedDuration = allFieldsFilled ? estimateDuration(propertySize, bedrooms, bathrooms) : 0;
  
  // Check if deep cleaning should be suggested
  const shouldSuggestDeepCleaning = suggestedDuration >= 6 || bathrooms >= 3;

  useEffect(() => {
    if (allFieldsFilled && shouldSuggestDeepCleaning) {
      setShowDeepCleaningPopup(true);
    }
  }, [allFieldsFilled, shouldSuggestDeepCleaning]);

  const handleUseSuggestedDuration = () => {
    if (onSuggestedTimeSelect && suggestedDuration > 0) {
      form.setValue('hours', suggestedDuration);
      onSuggestedTimeSelect(suggestedDuration);
    }
  };

  const getCleanTypeText = (duration: number) => {
    if (duration <= 3) return "Quick Clean";
    if (duration <= 5) return "Standard Clean";
    return "Thorough Clean";
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Home className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            🏠 About Your Home
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Home Size */}
          <div className="space-y-2">
            <Label htmlFor="property-size" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Home size (in m²)
            </Label>
            <Input
              id="property-size"
              type="number"
              placeholder="70"
              value={propertySize || ''}
              onChange={(e) => form.setValue('propertySize', Number(e.target.value))}
              className="h-12"
              min="20"
              max="500"
            />
            <p className="text-xs text-gray-500">
              Include all living areas. Rough estimate is fine.
            </p>
          </div>

          {/* Bedrooms */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Number of bedrooms
            </Label>
            <Select 
              value={bedrooms?.toString()} 
              onValueChange={(value) => form.setValue('bedrooms', Number(value))}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Studio</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bathrooms */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Number of bathrooms
            </Label>
            <Select 
              value={bathrooms?.toString()} 
              onValueChange={(value) => form.setValue('bathrooms', Number(value))}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select bathrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="1.5">1.5</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Estimation Display */}
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
                <div className="flex-1">
                  <AlertDescription className="space-y-3">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-base">
                        🧹 Suggested cleaning duration: {suggestedDuration} hours ({getCleanTypeText(suggestedDuration)})
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Based on your input ({propertySize} m², {bedrooms === 0 ? 'Studio' : `${bedrooms} bedroom${bedrooms !== 1 ? 's' : ''}`}, {bathrooms} bathroom{bathrooms !== 1 ? 's' : ''}), we recommend a {suggestedDuration}-hour session.
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button 
                        onClick={handleUseSuggestedDuration}
                        className="flex items-center gap-2 bg-primary hover:bg-primary/90"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Use Suggested Duration
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex items-center gap-2"
                      >
                        <Settings className="h-4 w-4" />
                        Adjust Manually Below
                      </Button>
                    </div>
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Deep Cleaning Popup */}
      <DeepCleaningPopup 
        isOpen={showDeepCleaningPopup}
        onClose={() => setShowDeepCleaningPopup(false)}
        onSwitchToDeepCleaning={() => {
          // This would redirect to deep cleaning booking
          window.location.href = '/deep-cleaning';
        }}
        onContinueStandard={() => setShowDeepCleaningPopup(false)}
      />
    </div>
  );
};
