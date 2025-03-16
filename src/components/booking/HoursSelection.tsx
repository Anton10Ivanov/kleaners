
import { ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HoursSelectionProps {
  hours: number;
  setHours: (hours: number) => void;
}

const HoursSelection = ({ hours, setHours }: HoursSelectionProps) => {
  const incrementHours = () => {
    if (hours < 8) {
      setHours(hours + 1);
    }
  };

  const decrementHours = () => {
    if (hours > 2) {
      setHours(hours - 1);
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-5 bg-white dark:bg-gray-800">
      <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Cleaning Hours</h3>
      
      <div className="space-y-3">
        <p className="text-subtext dark:text-gray-400">
          Select how many hours you need for your cleaning
        </p>
        
        <div className="flex items-center justify-between max-w-xs mx-auto">
          <Button
            type="button"
            variant="outline"
            className="h-10 w-10 rounded-full"
            onClick={decrementHours}
            disabled={hours <= 2}
            aria-label="Decrease hours"
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
          
          <div className="text-center min-w-[100px]">
            <span className="text-3xl font-bold">{hours}</span>
            <span className="text-lg ml-2">hours</span>
          </div>
          
          <Button
            type="button"
            variant="outline"
            className="h-10 w-10 rounded-full"
            onClick={incrementHours}
            disabled={hours >= 8}
            aria-label="Increase hours"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="text-center text-sm mt-3 text-subtext dark:text-gray-400">
          {hours === 2 && "Recommended for a small apartment (1 bedroom)"}
          {hours === 3 && "Recommended for a medium apartment (2 bedrooms)"}
          {hours === 4 && "Recommended for a large apartment (3 bedrooms)"}
          {hours === 5 && "Recommended for a small house (3-4 bedrooms)"}
          {hours >= 6 && "Recommended for a larger house (4+ bedrooms)"}
        </div>
      </div>
    </div>
  );
};

export default HoursSelection;
