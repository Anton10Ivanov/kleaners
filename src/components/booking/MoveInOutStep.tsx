
import { useState } from 'react';
import { motion } from 'framer-motion';
import Calendar from './Calendar';
import MoveInOutFields from './moveInOut/MoveInOutFields';
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";

interface MoveInOutStepProps {
  form: UseFormReturn<BookingFormData>;
}

const MoveInOutStep = ({ form }: MoveInOutStepProps) => {
  const [squareMeters, setSquareMeters] = useState(50);
  const [bathrooms, setBathrooms] = useState(1);
  const [bedrooms, setBedrooms] = useState(1);
  const [dirtinessLevel, setDirtinessLevel] = useState(0);
  const [lastCleaned, setLastCleaned] = useState(0);
  const [cleaningPersonnel, setCleaningPersonnel] = useState<'normal' | 'experienced'>('normal');
  const [specialConditions, setSpecialConditions] = useState<string[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState('');

  console.log('Rendering MoveInOutStep');

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-dark-background p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800"
      >
        <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Move In/Out Cleaning Details</h3>
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
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white dark:bg-dark-background rounded-xl shadow-sm border border-gray-100 dark:border-gray-800"
      >
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Schedule Your Move In/Out Cleaning</h3>
          <Calendar form={form} />
        </div>
      </motion.div>
    </div>
  );
};

export default MoveInOutStep;
