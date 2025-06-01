
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UseFormReturn } from "react-hook-form";
import { BookingFormData, Frequency } from "@/schemas/booking";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Calculator, Clock } from 'lucide-react';
import { calculateRecommendedTime } from '@/utils/bookingCalculations';
import { useState } from 'react';

interface HoursSelectionProps {
  form: UseFormReturn<BookingFormData>;
}

const HoursSelection = ({ form }: HoursSelectionProps) => {
  const selectedHours = form.watch('hours') || 2;
  const bedrooms = form.watch('bedrooms') || 1;
  const bathrooms = form.watch('bathrooms') || 1;
  const frequency = form.watch('frequency') || 'onetime';
  
  const [showCalculator, setShowCalculator] = useState(false);
  const [tempBedrooms, setTempBedrooms] = useState(bedrooms);
  const [tempBathrooms, setTempBathrooms] = useState(bathrooms);

  // Fix frequency comparison to handle both enum and string values
  const getHourlyRate = () => {
    if (frequency === Frequency.Weekly || frequency === 'weekly') return 27;
    if (frequency === Frequency.BiWeekly || frequency === 'bi-weekly') return 30;
    return 35;
  };

  const handleHoursChange = (hours: number) => {
    form.setValue('hours', hours);
  };

  const handleCalculateTime = () => {
    const recommendedTime = calculateRecommendedTime(tempBedrooms, tempBathrooms);
    form.setValue('hours', recommendedTime);
    form.setValue('bedrooms', tempBedrooms);
    form.setValue('bathrooms', tempBathrooms);
    setShowCalculator(false);
  };

  const getHourRecommendation = (hours: number) => {
    if (hours <= 2) return { text: "Quick clean", color: "text-blue-600" };
    if (hours <= 4) return { text: "Standard clean", color: "text-green-600" };
    if (hours <= 6) return { text: "Deep clean", color: "text-orange-600" };
    return { text: "Extensive clean", color: "text-purple-600" };
  };

  // Updated hour options starting from 2 hours minimum
  const hourOptions = [2, 3, 4, 5, 6, 7, 8];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Duration
            </h4>
            <p className="text-sm text-gray-500">Select cleaning time (minimum 2 hours)</p>
          </div>
        </div>
        
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowCalculator(!showCalculator)}
          className="text-primary border-primary/20 hover:bg-primary/5 flex items-center gap-2"
        >
          <Calculator className="h-4 w-4" />
          Calculate
        </Button>
      </div>

      {/* Inline Calculator */}
      {showCalculator && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border border-blue-200 dark:border-gray-600 rounded-xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <h5 className="font-semibold text-gray-900 dark:text-white">Smart Time Calculator</h5>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Bedrooms
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setTempBedrooms(Math.max(1, tempBedrooms - 1))}
                  className="h-10 w-10 p-0 rounded-lg"
                >
                  -
                </Button>
                <div className="flex-1 text-center">
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{tempBedrooms}</div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setTempBedrooms(Math.min(10, tempBedrooms + 1))}
                  className="h-10 w-10 p-0 rounded-lg"
                >
                  +
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Bathrooms
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setTempBathrooms(Math.max(1, tempBathrooms - 1))}
                  className="h-10 w-10 p-0 rounded-lg"
                >
                  -
                </Button>
                <div className="flex-1 text-center">
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{tempBathrooms}</div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setTempBathrooms(Math.min(10, tempBathrooms + 1))}
                  className="h-10 w-10 p-0 rounded-lg"
                >
                  +
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t border-blue-200 dark:border-gray-600">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Recommended: <span className="font-bold text-primary text-lg">
                {calculateRecommendedTime(tempBedrooms, tempBathrooms)}h
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={handleCalculateTime}
                size="sm"
                className="bg-primary hover:bg-primary/90"
              >
                Apply
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCalculator(false)}
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Enhanced Hour Selection */}
      <div className="space-y-4">
        <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
          {hourOptions.map((hours) => {
            const isSelected = selectedHours === hours;
            const recommendation = getHourRecommendation(hours);
            
            return (
              <TooltipProvider key={hours}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant={isSelected ? "default" : "outline"}
                        onClick={() => handleHoursChange(hours)}
                        className={`
                          relative h-16 flex flex-col items-center justify-center transition-all duration-200
                          ${isSelected 
                            ? "bg-primary text-white shadow-lg border-primary" 
                            : "hover:border-primary/50 hover:bg-primary/5 hover:shadow-md"
                          }
                        `}
                      >
                        <span className="text-lg font-bold">{hours}h</span>
                        <span className={`text-xs ${isSelected ? "text-white/80" : recommendation.color}`}>
                          {recommendation.text.split(' ')[0]}
                        </span>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                          />
                        )}
                      </Button>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-medium">{hours} hour{hours > 1 ? 's' : ''}</p>
                    <p className="text-sm text-gray-500">{recommendation.text}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default HoursSelection;
