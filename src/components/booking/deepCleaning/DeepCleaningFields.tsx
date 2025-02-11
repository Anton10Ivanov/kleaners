
import { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Minus } from 'lucide-react';

interface DeepCleaningFieldsProps {
  squareMeters: number;
  setSquareMeters: (value: number) => void;
  bathrooms: number;
  setBathrooms: (value: number) => void;
  bedrooms: number;
  setBedrooms: (value: number) => void;
  dirtinessLevel: number;
  setDirtinessLevel: (value: number) => void;
  lastCleaned: number;
  setLastCleaned: (value: number) => void;
  cleaningPersonnel: 'normal' | 'experienced';
  setCleaningPersonnel: (value: 'normal' | 'experienced') => void;
  specialConditions: string[];
  setSpecialConditions: (value: string[]) => void;
  additionalNotes?: string;
  setAdditionalNotes?: (value: string) => void;
}

const DeepCleaningFields = ({
  squareMeters,
  setSquareMeters,
  bathrooms,
  setBathrooms,
  bedrooms,
  setBedrooms,
  dirtinessLevel,
  setDirtinessLevel,
  lastCleaned,
  setLastCleaned,
  cleaningPersonnel,
  setCleaningPersonnel,
  specialConditions,
  setSpecialConditions,
  additionalNotes = '',
  setAdditionalNotes = () => {}
}: DeepCleaningFieldsProps) => {
  const specialOptions = [
    { id: 'mold', label: 'Mold present (visible mold in bathrooms, walls, etc.)' },
    { id: 'pets', label: 'Pets in the home (cats, dogs, etc.)' },
    { id: 'drains', label: 'Clogged drains (sinks, showers, etc.)' },
    { id: 'feces', label: 'Feces or biohazard waste (e.g., pet accidents, human waste)' },
    { id: 'messy', label: 'Extremely messy (hoarding, excessive clutter)' }
  ];

  const handleSquareMeters = (increment: boolean) => {
    const newValue = increment ? squareMeters + 5 : squareMeters - 5;
    if (newValue >= 10 && newValue <= 200) {
      setSquareMeters(newValue);
    }
  };

  const handleRoomsChange = (value: number, setter: (value: number) => void) => {
    if (value >= 1 && value <= 10) {
      setter(value);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Property Details</h3>
        
        <div className="space-y-2">
          <Label>Square Meters ({squareMeters}m²)</Label>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleSquareMeters(false)}
              disabled={squareMeters <= 10}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="min-w-[3rem] text-center">{squareMeters}</span>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleSquareMeters(true)}
              disabled={squareMeters >= 200}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Bathrooms</Label>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleRoomsChange(bathrooms - 1, setBathrooms)}
                disabled={bathrooms <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="min-w-[3rem] text-center">{bathrooms}</span>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleRoomsChange(bathrooms + 1, setBathrooms)}
                disabled={bathrooms >= 10}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Bedrooms</Label>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleRoomsChange(bedrooms - 1, setBedrooms)}
                disabled={bedrooms <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="min-w-[3rem] text-center">{bedrooms}</span>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleRoomsChange(bedrooms + 1, setBedrooms)}
                disabled={bedrooms >= 10}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>How would you describe the current condition of your property?</Label>
          <Slider
            value={[dirtinessLevel]}
            onValueChange={(value) => setDirtinessLevel(value[0])}
            max={3}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Very Clean (light dusting, no major mess)</span>
            <span>Slightly Dirty (some clutter, light stains)</span>
            <span>Dirty (visible dirt, stains, and clutter)</span>
            <span>Very Dirty (heavy dirt, grime, and disorganization)</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label>When was the last time your property was professionally cleaned?</Label>
          <Slider
            value={[lastCleaned]}
            onValueChange={(value) => setLastCleaned(value[0])}
            max={4}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Recent (within the last month)</span>
            <span>1 Month Ago</span>
            <span>3 Months Ago</span>
            <span>6 Months Ago</span>
            <span>1 Year or More</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Label>What level of expertise do you prefer for the cleaning team?</Label>
        <RadioGroup
          value={cleaningPersonnel}
          onValueChange={(value: 'normal' | 'experienced') => setCleaningPersonnel(value)}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="normal" id="normal" />
            <Label htmlFor="normal">Normal (standard cleaning team)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="experienced" id="experienced" />
            <Label htmlFor="experienced">Experienced (advanced cleaning team for tougher jobs)</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label>Does your property have any of the following conditions?</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specialOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
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
              />
              <label
                htmlFor={option.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Additional Notes</Label>
        <Textarea
          placeholder="Is there anything else we should know about your property?"
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};

export default DeepCleaningFields;
