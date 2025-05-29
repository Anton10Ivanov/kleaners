
import PropertyDetails from './PropertyDetails';
import PropertyCondition from './PropertyCondition';
import CleaningPersonnel from './CleaningPersonnel';
import SpecialConditions from './SpecialConditions';
import AdditionalNotesField from './components/AdditionalNotesField';

interface MoveInOutFieldsProps {
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

const MoveInOutFields = ({
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
}: MoveInOutFieldsProps) => {
  console.log('Rendering MoveInOutFields with squareMeters:', squareMeters);
  
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

      <AdditionalNotesField
        additionalNotes={additionalNotes}
        setAdditionalNotes={setAdditionalNotes}
      />
    </div>
  );
};

export default MoveInOutFields;
