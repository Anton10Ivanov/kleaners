
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
      <div className="space-y-6">
        <Label className="text-secondary-text text-base">How would you describe the current condition of your property?</Label>
        <Slider
          value={[dirtinessLevel]}
          onValueChange={(value) => setDirtinessLevel(value[0])}
          max={3}
          step={1}
          className="w-full cursor-pointer [&>span]:h-2.5 [&>span]:bg-[#8B5CF6] hover:[&>span]:bg-[#7C3AED] [&>span]:transition-all [&>span]:duration-200"
        />
        <div className="grid grid-cols-4 gap-2 text-xs sm:text-sm text-muted-foreground">
          <div className="text-left space-y-1">
            <span className="font-medium text-secondary-text">Very Clean</span>
            <p>Light dusting needed</p>
          </div>
          <div className="text-center space-y-1">
            <span className="font-medium text-secondary-text">Slightly Dirty</span>
            <p>Minor cleaning required</p>
          </div>
          <div className="text-center space-y-1">
            <span className="font-medium text-secondary-text">Dirty</span>
            <p>Visible dirt & stains</p>
          </div>
          <div className="text-right space-y-1">
            <span className="font-medium text-secondary-text">Very Dirty</span>
            <p>Heavy cleaning needed</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Label className="text-secondary-text text-base">When was your last professional cleaning?</Label>
        <Slider
          value={[lastCleaned]}
          onValueChange={(value) => setLastCleaned(value[0])}
          max={4}
          step={1}
          className="w-full cursor-pointer [&>span]:h-2.5 [&>span]:bg-[#8B5CF6] hover:[&>span]:bg-[#7C3AED] [&>span]:transition-all [&>span]:duration-200"
        />
        <div className="grid grid-cols-5 gap-2 text-xs sm:text-sm">
          <div className="text-left">
            <span className="font-medium text-secondary-text">Recent</span>
            <p className="text-muted-foreground">Within 1 month</p>
          </div>
          <div className="text-center">
            <span className="font-medium text-secondary-text">1 Month</span>
            <p className="text-muted-foreground">Ago</p>
          </div>
          <div className="text-center">
            <span className="font-medium text-secondary-text">3 Months</span>
            <p className="text-muted-foreground">Ago</p>
          </div>
          <div className="text-center">
            <span className="font-medium text-secondary-text">6 Months</span>
            <p className="text-muted-foreground">Ago</p>
          </div>
          <div className="text-right">
            <span className="font-medium text-secondary-text">1 Year+</span>
            <p className="text-muted-foreground">Or more</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCondition;
