
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface SpecialConditionsProps {
  specialConditions: string[];
  setSpecialConditions: (value: string[]) => void;
}

const specialOptions = [
  { id: 'mold', label: 'Mold present (visible mold in bathrooms, walls, etc.)' },
  { id: 'pets', label: 'Pets in the home (cats, dogs, etc.)' },
  { id: 'drains', label: 'Clogged drains (sinks, showers, etc.)' },
  { id: 'feces', label: 'Feces or biohazard waste (e.g., pet accidents, human waste)' },
  { id: 'messy', label: 'Extremely messy (hoarding, excessive clutter)' }
];

const SpecialConditions = ({
  specialConditions,
  setSpecialConditions,
}: SpecialConditionsProps) => {
  return (
    <div className="space-y-4 animate-fadeIn">
      <Label className="text-secondary-text">Does your property have any of the following conditions?</Label>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {specialOptions.map((option) => (
          <div 
            key={option.id} 
            className={`flex items-center space-x-2 p-4 rounded-lg border transition-all duration-200 ${
              specialConditions.includes(option.id) 
                ? 'border-primary/50 bg-primary/5' 
                : 'border-gray-200 hover:border-primary/30'
            }`}
          >
            <Checkbox
              id={option.id}
              checked={specialConditions.includes(option.id)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSpecialConditions([...specialConditions, option.id]);
                } else {
                  setSpecialConditions(
                    specialConditions.filter((id) => id !== option.id)
                  );
                }
              }}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <label
              htmlFor={option.id}
              className="text-sm font-medium leading-none cursor-pointer select-none"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialConditions;
