
import { UseFormReturn } from "react-hook-form";
import { MoveInOutFormData } from '@/schemas/booking';
import { PropertySizeField } from '../PropertySizeField';
import PropertyCondition from './PropertyCondition';
import CleaningPersonnel from './CleaningPersonnel';
import SpecialConditions from './SpecialConditions';
import AdditionalNotesField from './components/AdditionalNotesField';
import { logger } from '@/utils/logging';

interface MoveInOutFieldsProps {
  form: UseFormReturn<MoveInOutFormData>;
}

const MoveInOutFields = ({ form }: MoveInOutFieldsProps) => {
  const squareMeters = form.watch('squareMeters') || 60;
  const bedrooms = form.watch('bedrooms') || 2;
  const bathrooms = form.watch('bathrooms') || 1;
  const dirtinessLevel = form.watch('dirtinessLevel') || 3;
  const lastCleaned = form.watch('lastCleaned') || 6;
  const cleaningPersonnel = (form.watch('cleaningPersonnel') as 'normal' | 'experienced') || 'normal';
  const specialConditions = form.watch('specialConditions') || [];
  const additionalNotes = form.watch('additionalNotes') || '';

  logger.debug('Rendering MoveInOutFields', { squareMeters }, 'MoveInOutFields');
  
  return (
    <div className="form-spacing-loose">
      <PropertySizeField
        value={squareMeters}
        onChange={(value) => form.setValue('squareMeters', value)}
        label="Property Size (m²)"
      />

      {/* Keep existing bedrooms/bathrooms in PropertyDetails */}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-spacing-tight">
          <label className="text-sm font-medium text-gray-700">Bedrooms</label>
          <select 
            value={bedrooms}
            onChange={(e) => form.setValue('bedrooms', Number(e.target.value))}
            className="w-full p-2 border rounded-lg"
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        <div className="form-spacing-tight">
          <label className="text-sm font-medium text-gray-700">Bathrooms</label>
          <select 
            value={bathrooms}
            onChange={(e) => form.setValue('bathrooms', Number(e.target.value))}
            className="w-full p-2 border rounded-lg"
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
      </div>

      <PropertyCondition
        dirtinessLevel={dirtinessLevel}
        setDirtinessLevel={(value) => form.setValue('dirtinessLevel', value)}
        lastCleaned={lastCleaned}
        setLastCleaned={(value) => form.setValue('lastCleaned', value)}
      />

      <CleaningPersonnel
        cleaningPersonnel={cleaningPersonnel}
        setCleaningPersonnel={(value) => form.setValue('cleaningPersonnel', value as 'normal' | 'experienced')}
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
