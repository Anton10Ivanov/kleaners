
import { Button } from "@/components/ui/button";

interface HoursSelectionProps {
  hours: number;
  setHours: (hours: number) => void;
  recommendedTime: number;
}

const HoursSelection = ({ hours, setHours, recommendedTime }: HoursSelectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">How many hours do you need?</h3>
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
      <div className="text-center text-sm text-muted-foreground">
        Recommended time: {recommendedTime} hours
      </div>
    </div>
  );
};

export default HoursSelection;
