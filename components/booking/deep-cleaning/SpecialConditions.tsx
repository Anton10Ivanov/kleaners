
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

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
    <div className="form-spacing-loose animate-fadeIn">
      <Label className="text-secondary-text text-lg block mb-4">
        Does your property have any of the following conditions?
      </Label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {specialOptions.map((option) => (
          <div 
            key={option.id} 
            className={`flex items-start space-x-4 p-5 rounded-xl transition-all duration-200 hover:shadow-md ${
              specialConditions.includes(option.id) 
                ? 'bg-primary/5 border-2 border-primary/30 shadow-sm' 
                : 'bg-white border border-gray-100 hover:border-primary/20'
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
              className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <label
              htmlFor={option.id}
              className="text-sm font-medium leading-relaxed cursor-pointer select-none text-gray-700"
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
