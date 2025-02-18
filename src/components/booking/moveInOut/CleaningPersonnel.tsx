
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CleaningPersonnelProps {
  cleaningPersonnel: 'normal' | 'experienced';
  setCleaningPersonnel: (value: 'normal' | 'experienced') => void;
}

const CleaningPersonnel = ({
  cleaningPersonnel,
  setCleaningPersonnel,
}: CleaningPersonnelProps) => {
  return (
    <div className="space-y-4 animate-fadeIn">
      <Label className="text-secondary-text">What level of expertise do you prefer for the cleaning team?</Label>
      <RadioGroup
        value={cleaningPersonnel}
        onValueChange={(value: 'normal' | 'experienced') => setCleaningPersonnel(value)}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex items-center space-x-2 p-4 rounded-lg border border-gray-200 hover:border-primary/50 transition-colors cursor-pointer">
          <RadioGroupItem value="normal" id="normal" />
          <Label htmlFor="normal" className="cursor-pointer">Normal (standard cleaning team)</Label>
        </div>
        <div className="flex items-center space-x-2 p-4 rounded-lg border border-gray-200 hover:border-primary/50 transition-colors cursor-pointer">
          <RadioGroupItem value="experienced" id="experienced" />
          <Label htmlFor="experienced" className="cursor-pointer">Experienced (advanced cleaning team)</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default CleaningPersonnel;
