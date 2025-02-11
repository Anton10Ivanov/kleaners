
import { Button } from "@/components/ui/button";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info } from "lucide-react";

interface HoursSelectionProps {
  hours: number;
  setHours: (hours: number) => void;
  recommendedTime: number;
}

const HoursSelection = ({ hours, setHours, recommendedTime }: HoursSelectionProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-semibold">How many hours do you need?</h3>
          <Popover>
            <PopoverTrigger>
              <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className="w-[300px]">
              <div className="space-y-2">
                <h4 className="font-semibold">Calculate cleaning time</h4>
                <p className="text-sm text-gray-600">
                  Based on your home size ({recommendedTime} hours recommended):
                </p>
                <ul className="text-sm text-gray-600 list-disc pl-4">
                  <li>Each bedroom: 30 minutes</li>
                  <li>Each bathroom: 30 minutes</li>
                  <li>Base cleaning time: 2 hours</li>
                </ul>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center gap-4">
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
      <div className="text-center text-sm text-primary">
        Recommended time: {recommendedTime} hours
      </div>
    </div>
  );
};

export default HoursSelection;
