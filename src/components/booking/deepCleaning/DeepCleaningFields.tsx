
import { UseFormReturn } from "react-hook-form";
import { DeepCleaningFormData } from "@/schemas/booking";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import PropertyDetails from './PropertyDetails';
import PropertyCondition from './PropertyCondition';
import CleaningPersonnel from './CleaningPersonnel';
import SpecialConditions from './SpecialConditions';

interface DeepCleaningFieldsProps {
  form: UseFormReturn<DeepCleaningFormData>;
}

const DeepCleaningFields = ({ form }: DeepCleaningFieldsProps) => {
  const squareMeters = form.watch('squareMeters') || 50;
  const bedrooms = form.watch('bedrooms') || 1;
  const bathrooms = form.watch('bathrooms') || 1;
  const dirtinessLevel = form.watch('dirtinessLevel') || 3;
  const lastCleaned = form.watch('lastCleaned') || 3;
  const cleaningPersonnel = (form.watch('cleaningPersonnel') as 'normal' | 'experienced') || 'normal';
  const specialConditions = form.watch('specialConditions') || [];
  const additionalNotes = form.watch('additionalNotes') || '';

  return (
    <div className="space-y-6">
      <PropertyDetails
        squareMeters={squareMeters}
        setSquareMeters={(value) => form.setValue('squareMeters', value)}
        bathrooms={bathrooms}
        setBathrooms={(value) => form.setValue('bathrooms', value)}
        bedrooms={bedrooms}
        setBedrooms={(value) => form.setValue('bedrooms', value)}
      />

      <PropertyCondition
        dirtinessLevel={dirtinessLevel}
        setDirtinessLevel={(value) => form.setValue('dirtinessLevel', value)}
        lastCleaned={lastCleaned}
        setLastCleaned={(value) => form.setValue('lastCleaned', value)}
      />

      <CleaningPersonnel
        cleaningPersonnel={cleaningPersonnel}
        setCleaningPersonnel={(value) => form.setValue('cleaningPersonnel', value)}
      />

      <SpecialConditions
        specialConditions={specialConditions}
        setSpecialConditions={(value) => form.setValue('specialConditions', value)}
      />

      <div className="space-y-3 animate-fadeIn">
        <Label className="text-secondary-text">Additional Notes</Label>
        <Textarea
          placeholder="Is there anything else we should know about your property?"
          value={additionalNotes}
          onChange={(e) => form.setValue('additionalNotes', e.target.value)}
          className="min-h-[80px] resize-y transition-colors focus:border-primary"
        />
      </div>
    </div>
  );
};

export default DeepCleaningFields;
