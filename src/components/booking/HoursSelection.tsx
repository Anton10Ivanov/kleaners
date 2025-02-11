
import { Button } from "@/components/ui/button";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface HoursSelectionProps {
  hours: number;
  setHours: (hours: number) => void;
  recommendedTime: number;
  bedrooms: number;
  setBedrooms: (value: number) => void;
  bathrooms: number;
  setBathrooms: (value: number) => void;
}

const HoursSelection = ({ 
  hours, 
  setHours, 
  recommendedTime,
  bedrooms,
  setBedrooms,
  bathrooms,
  setBathrooms 
}: HoursSelectionProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">How many hours do you need?</h3>
        <Popover>
          <PopoverTrigger className="text-primary text-sm hover:underline">
            Calculate cleaning time
          </PopoverTrigger>
          <PopoverContent className="w-[300px]">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Based on your home size:</p>
              <ul className="text-sm text-gray-600 list-disc pl-4">
                <li>Each bedroom: 30 minutes</li>
                <li>Each bathroom: 30 minutes</li>
                <li>Base cleaning time: 2 hours</li>
              </ul>
              <p className="text-sm font-medium text-primary mt-4">
                Recommended time: {recommendedTime} hours
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button 
          variant="outline" 
          onClick={() => setHours(Math.max(2, hours - 0.5))}
          disabled={hours <= 2}
        >
          -
        </Button>
        <span className="w-16 text-center font-semibold">{hours}h</span>
        <Button 
          variant="outline" 
          onClick={() => setHours(hours + 0.5)}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default HoursSelection;
