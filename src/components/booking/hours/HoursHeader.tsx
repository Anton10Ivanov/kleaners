
import { Button } from '@/components/ui/button';
import { Calculator, Clock } from 'lucide-react';

interface HoursHeaderProps {
  onCalculatorToggle: () => void;
}

const HoursHeader = ({ onCalculatorToggle }: HoursHeaderProps) => {
  return (
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
        onClick={onCalculatorToggle}
        className="text-primary border-primary/20 hover:bg-primary/5 flex items-center gap-2"
      >
        <Calculator className="h-4 w-4" />
        Calculate
      </Button>
    </div>
  );
};

export default HoursHeader;
