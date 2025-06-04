
import { motion } from 'framer-motion';
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import HoursHeader from './hours/HoursHeader';
import HourOptionsGrid from './hours/HourOptionsGrid';
import CalculatorDialog from './hours/CalculatorDialog';
import { useTimeCalculator } from './hours/TimeCalculator';

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
  const [hasConfirmedSelection, setHasConfirmedSelection] = useState(false);

  const { getHourRecommendation, calculateTime } = useTimeCalculator();

  const handleHoursChange = (hours: number) => {
    form.setValue('hours', hours);
    // Reset confirmation when hours change
    setHasConfirmedSelection(false);
  };

  const handleCalculateTime = () => {
    const recommendedTime = calculateTime(tempBedrooms, tempBathrooms);
    form.setValue('hours', recommendedTime);
    form.setValue('bedrooms', tempBedrooms);
    form.setValue('bathrooms', tempBathrooms);
    setShowCalculator(false);
    setHasConfirmedSelection(true);
  };

  const handleUseMyPreference = () => {
    setHasConfirmedSelection(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <HoursHeader onCalculatorToggle={() => setShowCalculator(!showCalculator)} />

      {showCalculator && (
        <CalculatorDialog
          tempBedrooms={tempBedrooms}
          tempBathrooms={tempBathrooms}
          setTempBedrooms={setTempBedrooms}
          setTempBathrooms={setTempBathrooms}
          onApply={handleCalculateTime}
          onCancel={() => setShowCalculator(false)}
        />
      )}

      <div className="space-y-4">
        <HourOptionsGrid
          selectedHours={selectedHours}
          onHoursChange={handleHoursChange}
          getHourRecommendation={getHourRecommendation}
        />
        
        {/* Use My Preference Button */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={handleUseMyPreference}
            className={`
              px-8 h-12 font-medium transition-all
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
        </div>
      </div>
    </motion.div>
  );
};

export default HoursSelection;
