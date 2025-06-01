
import { UseFormReturn } from "react-hook-form";
import { MoveInOutFormData } from "@/schemas/booking";
import PropertyDetails from './PropertyDetails';
import PropertyCondition from './PropertyCondition';
import CleaningPersonnel from './CleaningPersonnel';
import SpecialConditions from './SpecialConditions';
import AdditionalNotesField from './components/AdditionalNotesField';

interface MoveInOutFieldsProps {
  form: UseFormReturn<MoveInOutFormData>;
}

const MoveInOutFields = ({ form }: MoveInOutFieldsProps) => {
  const squareMeters = form.watch('squareMeters') || 60;
  const bedrooms = form.watch('bedrooms') || 2;
  const bathrooms = form.watch('bathrooms') || 1;
  const dirtinessLevel = form.watch('dirtinessLevel') || 3;
  const lastCleaned = form.watch('lastCleaned') || 6;
  const cleaningPersonnel = form.watch('cleaningPersonnel') || 'normal';
  const specialConditions = form.watch('specialConditions') || [];
  const additionalNotes = form.watch('additionalNotes') || '';

  console.log('Rendering MoveInOutFields with squareMeters:', squareMeters);
  
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

      <AdditionalNotesField
        additionalNotes={additionalNotes}
        setAdditionalNotes={(value) => form.setValue('additionalNotes', value)}
      />
    </div>
  );
};

export default MoveInOutFields;
