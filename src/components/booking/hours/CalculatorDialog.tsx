
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { calculateRecommendedTime } from '@/utils/bookingCalculations';

interface CalculatorDialogProps {
  tempBedrooms: number;
  tempBathrooms: number;
  setTempBedrooms: (value: number) => void;
  setTempBathrooms: (value: number) => void;
  onApply: () => void;
  onCancel: () => void;
}

const CalculatorDialog = ({
  tempBedrooms,
  tempBathrooms,
  setTempBedrooms,
  setTempBathrooms,
  onApply,
  onCancel
}: CalculatorDialogProps) => {
  return (
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
            onClick={onApply}
            size="sm"
            className="bg-primary hover:bg-primary/90"
          >
            Apply
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            size="sm"
          >
            Cancel
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CalculatorDialog;
