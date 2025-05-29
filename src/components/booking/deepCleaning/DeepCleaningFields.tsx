
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import PropertyDetails from './PropertyDetails';
import PropertyCondition from './PropertyCondition';
import CleaningPersonnel from './CleaningPersonnel';
import SpecialConditions from './SpecialConditions';

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
  setAdditionalNotes = () => {},
}: DeepCleaningFieldsProps) => {
  return (
    <div className="space-y-6">
      <PropertyDetails
        squareMeters={squareMeters}
        setSquareMeters={setSquareMeters}
        bathrooms={bathrooms}
        setBathrooms={setBathrooms}
        bedrooms={bedrooms}
        setBedrooms={setBedrooms}
      />

      <PropertyCondition
        dirtinessLevel={dirtinessLevel}
        setDirtinessLevel={setDirtinessLevel}
        lastCleaned={lastCleaned}
        setLastCleaned={setLastCleaned}
      />

      <CleaningPersonnel
        cleaningPersonnel={cleaningPersonnel}
        setCleaningPersonnel={setCleaningPersonnel}
      />

      <SpecialConditions
        specialConditions={specialConditions}
        setSpecialConditions={setSpecialConditions}
      />

      <div className="space-y-3 animate-fadeIn">
        <Label className="text-secondary-text">Additional Notes</Label>
        <Textarea
          placeholder="Is there anything else we should know about your property?"
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          className="min-h-[80px] resize-y transition-colors focus:border-primary"
        />
      </div>
    </div>
  );
};

export default DeepCleaningFields;
