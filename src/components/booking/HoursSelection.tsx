
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, Calculator } from 'lucide-react';
import { calculateRecommendedTime } from '@/utils/bookingCalculations';
import { useState, useEffect } from 'react';

interface HoursSelectionProps {
  form: UseFormReturn<BookingFormData>;
}

const HoursSelection = ({ form }: HoursSelectionProps) => {
  const selectedHours = form.watch('hours') || 2;
  const bedrooms = form.watch('bedrooms') || 1;
  const bathrooms = form.watch('bathrooms') || 1;
  
  const [showCalculator, setShowCalculator] = useState(false);
  const [tempBedrooms, setTempBedrooms] = useState(bedrooms);
  const [tempBathrooms, setTempBathrooms] = useState(bathrooms);

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

  const hourOptions = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-2 mb-2">
        <h4 className="text-base font-medium text-gray-900 dark:text-white">
          Duration
        </h4>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
            </TooltipTrigger>
            <TooltipContent className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
              <p className="font-medium">Select cleaning duration</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Typical home cleaning takes 2-4 hours depending on size and condition
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Calculator Toggle Button */}
      <Button
        type="button"
        variant="outline"
        onClick={() => setShowCalculator(!showCalculator)}
        className="mb-3 text-sm"
      >
        <Calculator className="h-4 w-4 mr-2" />
        Calculate recommended time
      </Button>

      {/* Time Calculator */}
      {showCalculator && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50"
        >
          <h5 className="font-medium text-gray-900 mb-3">Calculate recommended time</h5>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="calc-bedrooms" className="text-sm font-medium">
                Bedrooms
              </Label>
              <Input
                id="calc-bedrooms"
                type="number"
                min="1"
                max="10"
                value={tempBedrooms}
                onChange={(e) => setTempBedrooms(Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="calc-bathrooms" className="text-sm font-medium">
                Bathrooms
              </Label>
              <Input
                id="calc-bathrooms"
                type="number"
                min="1"
                max="10"
                value={tempBathrooms}
                onChange={(e) => setTempBathrooms(Number(e.target.value))}
                className="mt-1"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={handleCalculateTime}
              size="sm"
              className="bg-primary"
            >
              Apply ({calculateRecommendedTime(tempBedrooms, tempBathrooms)}h)
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
        </motion.div>
      )}

      <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
        {hourOptions.map((hours) => (
          <Button
            key={hours}
            variant={selectedHours === hours ? "default" : "outline"}
            onClick={() => handleHoursChange(hours)}
            className="py-2 px-3 text-sm"
          >
            {hours}h
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

export default HoursSelection;
