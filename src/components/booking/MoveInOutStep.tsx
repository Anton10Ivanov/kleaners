
import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import MoveInOutFields from './moveInOut/MoveInOutFields';

interface MoveInOutStepProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

const MoveInOutStep = ({ date, setDate }: MoveInOutStepProps) => {
  const [squareMeters, setSquareMeters] = useState(50);
  const [bathrooms, setBathrooms] = useState(1);
  const [bedrooms, setBedrooms] = useState(1);
  const [dirtinessLevel, setDirtinessLevel] = useState(0);
  const [lastCleaned, setLastCleaned] = useState(0);
  const [cleaningPersonnel, setCleaningPersonnel] = useState<'normal' | 'experienced'>('normal');
  const [specialConditions, setSpecialConditions] = useState<string[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState('');

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-6">Move In/Out Cleaning Service</h3>
        <MoveInOutFields
          squareMeters={squareMeters}
          setSquareMeters={setSquareMeters}
          bathrooms={bathrooms}
          setBathrooms={setBathrooms}
          bedrooms={bedrooms}
          setBedrooms={setBedrooms}
          dirtinessLevel={dirtinessLevel}
          setDirtinessLevel={setDirtinessLevel}
          lastCleaned={lastCleaned}
          setLastCleaned={setLastCleaned}
          cleaningPersonnel={cleaningPersonnel}
          setCleaningPersonnel={setCleaningPersonnel}
          specialConditions={specialConditions}
          setSpecialConditions={setSpecialConditions}
          additionalNotes={additionalNotes}
          setAdditionalNotes={setAdditionalNotes}
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-6">Select a Date</h3>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          disabled={(date) => date < new Date() || date.getDay() === 0}
        />
      </div>
    </div>
  );
};

export default MoveInOutStep;
