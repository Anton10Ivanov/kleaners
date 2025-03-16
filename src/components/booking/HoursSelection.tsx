
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface HoursSelectionProps {
  hours: number;
  setHours: (hours: number) => void;
}

const HoursSelection = ({ hours, setHours }: HoursSelectionProps) => {
  const handleIncrement = () => {
    if (hours < 8) setHours(hours + 1);
  };

  const handleDecrement = () => {
    if (hours > 2) setHours(hours - 1);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">How many hours do you need?</h3>
      
      <div className="flex items-center justify-center">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-full h-10 w-10"
          onClick={handleDecrement}
          disabled={hours <= 2}
        >
          <Minus className="h-4 w-4" />
        </Button>
        
        <div className="w-20 mx-4 text-center">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">{hours}</span>
          <span className="text-subtext dark:text-gray-400 ml-1">hrs</span>
        </div>
        
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-full h-10 w-10"
          onClick={handleIncrement}
          disabled={hours >= 8}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="text-center text-sm text-subtext dark:text-gray-400">
        <p>We recommend at least 3 hours for homes with 2+ bedrooms</p>
      </div>
    </div>
  );
};

export default HoursSelection;
