
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface PropertyConditionProps {
  dirtinessLevel: number;
  setDirtinessLevel: (value: number) => void;
  lastCleaned: number;
  setLastCleaned: (value: number) => void;
}

const PropertyCondition = ({
  dirtinessLevel,
  setDirtinessLevel,
  lastCleaned,
  setLastCleaned,
}: PropertyConditionProps) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="space-y-4">
        <Label className="text-secondary-text">How would you describe the current condition of your property?</Label>
        <Slider
          value={[dirtinessLevel]}
          onValueChange={(value) => setDirtinessLevel(value[0])}
          max={3}
          step={1}
          className="w-full [&>span]:bg-primary hover:[&>span]:bg-primary-hover transition-colors"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span className="flex-1 text-left">Very Clean<br/>(light dusting, no major mess)</span>
          <span className="flex-1 text-center">Slightly Dirty<br/>(some clutter, light stains)</span>
          <span className="flex-1 text-center">Dirty<br/>(visible dirt, stains)</span>
          <span className="flex-1 text-right">Very Dirty<br/>(heavy dirt, grime)</span>
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-secondary-text">When was the last time your property was professionally cleaned?</Label>
        <Slider
          value={[lastCleaned]}
          onValueChange={(value) => setLastCleaned(value[0])}
          max={4}
          step={1}
          className="w-full [&>span]:bg-primary hover:[&>span]:bg-primary-hover transition-colors"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Recent</span>
          <span>1 Month</span>
          <span>3 Months</span>
          <span>6 Months</span>
          <span>1 Year+</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCondition;
