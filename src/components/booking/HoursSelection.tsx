
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, Calculator, Clock, Home } from 'lucide-react';
import { calculateRecommendedTime } from '@/utils/bookingCalculations';
import { useState, useEffect } from 'react';

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

  // Calculate price per hour based on frequency
  const pricePerHour = frequency === 'weekly' ? 27 : frequency === 'biweekly' ? 30 : 35;
  const totalPrice = selectedHours * pricePerHour;

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

  const hourOptions = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      {/* Header with integrated calculator toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            Duration
          </h4>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
              </TooltipTrigger>
              <TooltipContent className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border">
                <p className="font-medium">Select cleaning duration</p>
                <p className="text-sm text-gray-500">Typical home cleaning takes 2-4 hours</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowCalculator(!showCalculator)}
          className="text-primary hover:bg-primary/10 flex items-center gap-1"
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
          className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 border border-blue-200 dark:border-gray-600 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <Home className="h-4 w-4 text-blue-600" />
            <h5 className="font-medium text-gray-900 dark:text-white">Property Calculator</h5>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="calc-bedrooms" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Bedrooms
              </Label>
              <div className="flex items-center gap-2 mt-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setTempBedrooms(Math.max(1, tempBedrooms - 1))}
                  className="h-8 w-8 p-0"
                >
                  -
                </Button>
                <Input
                  id="calc-bedrooms"
                  type="number"
                  min="1"
                  max="10"
                  value={tempBedrooms}
                  onChange={(e) => setTempBedrooms(Number(e.target.value))}
                  className="text-center h-8 flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setTempBedrooms(Math.min(10, tempBedrooms + 1))}
                  className="h-8 w-8 p-0"
                >
                  +
                </Button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="calc-bathrooms" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Bathrooms
              </Label>
              <div className="flex items-center gap-2 mt-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setTempBathrooms(Math.max(1, tempBathrooms - 1))}
                  className="h-8 w-8 p-0"
                >
                  -
                </Button>
                <Input
                  id="calc-bathrooms"
                  type="number"
                  min="1"
                  max="10"
                  value={tempBathrooms}
                  onChange={(e) => setTempBathrooms(Number(e.target.value))}
                  className="text-center h-8 flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setTempBathrooms(Math.min(10, tempBathrooms + 1))}
                  className="h-8 w-8 p-0"
                >
                  +
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Recommended: <span className="font-semibold text-primary">
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

      {/* Hour Selection with Visual Enhancements */}
      <div className="space-y-3">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {hourOptions.map((hours) => {
            const isSelected = selectedHours === hours;
            const recommendation = getHourRecommendation(hours);
            
            return (
              <TooltipProvider key={hours}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isSelected ? "default" : "outline"}
                      onClick={() => handleHoursChange(hours)}
                      className={`
                        relative h-12 flex flex-col items-center justify-center transition-all
                        ${isSelected 
                          ? "bg-primary text-white shadow-lg scale-105" 
                          : "hover:border-primary/50 hover:bg-primary/5"
                        }
                      `}
                    >
                      <span className="font-semibold">{hours}h</span>
                      <span className={`text-xs ${isSelected ? "text-white/80" : recommendation.color}`}>
                        {recommendation.text.split(' ')[0]}
                      </span>
                    </Button>
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

        {/* Real-time Price Feedback */}
        <motion.div 
          layout
          className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 border border-green-200 dark:border-gray-600 rounded-lg p-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Selected: {selectedHours} hour{selectedHours > 1 ? 's' : ''}
              </span>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-primary">
                {totalPrice.toFixed(0)} €
              </div>
              <div className="text-xs text-gray-500">
                {pricePerHour}€/hour
              </div>
            </div>
          </div>
          
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
              <span>{getHourRecommendation(selectedHours).text}</span>
              <span>
                {frequency === 'weekly' ? 'Weekly rate' : 
                 frequency === 'biweekly' ? 'Bi-weekly rate' : 
                 'One-time rate'}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HoursSelection;
