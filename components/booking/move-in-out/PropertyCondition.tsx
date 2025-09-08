
import { Label } from '@/components/ui/label";
import { Button } from '@/components/ui/button";

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
  const dirtinessOptions = [
    { value: 0, label: "Very Clean", description: "Light dusting needed" },
    { value: 1, label: "Slightly Dirty", description: "Minor cleaning required" },
    { value: 2, label: "Dirty", description: "Visible dirt & stains" },
    { value: 3, label: "Very Dirty", description: "Heavy cleaning needed" },
  ];

  const cleaningTimeOptions = [
    { value: 0, label: "Recent", description: "Within 1 month" },
    { value: 1, label: "1 Month", description: "Ago" },
    { value: 2, label: "3 Months", description: "Ago" },
    { value: 3, label: "6 Months", description: "Ago" },
    { value: 4, label: "1 Year+", description: "Or more" },
  ];

  return (
    <div className="component-spacing-xl animate-fadeIn">
      <div className="form-spacing-relaxed">
        <Label className="text-secondary-text text-base">How would you describe the current condition of your property?</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {dirtinessOptions.map((option) => (
            <Button
              key={option.value}
              type="button"
              variant={dirtinessLevel === option.value ? "default" : "outline"}
              className="h-auto section-spacing-xs px-3 flex flex-col items-center text-center component-spacing-xs"
              onClick={() => setDirtinessLevel(option.value)}
            >
              <span className="font-medium">{option.label}</span>
              <span className="text-xs text-muted-foreground">{option.description}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="form-spacing-relaxed">
        <Label className="text-secondary-text text-base">When was your last professional cleaning?</Label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {cleaningTimeOptions.map((option) => (
            <Button
              key={option.value}
              type="button"
              variant={lastCleaned === option.value ? "default" : "outline"}
              className="h-auto section-spacing-xs px-3 flex flex-col items-center text-center component-spacing-xs"
              onClick={() => setLastCleaned(option.value)}
            >
              <span className="font-medium">{option.label}</span>
              <span className="text-xs text-muted-foreground">{option.description}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyCondition;
