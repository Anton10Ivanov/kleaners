
import { useState } from 'react';
import { motion } from 'framer-motion';
import MoveInOutCalendar from './calendar/MoveInOutCalendar';
import MoveInOutFields from './moveInOut/MoveInOutFields';
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import { useUpdateEffect } from '@/hooks/useUpdateEffect';

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

  // Update the main form when our local state changes
  useUpdateEffect(() => {
    form.setValue('squareMeters', squareMeters);
    form.setValue('bathrooms', bathrooms);
    form.setValue('bedrooms', bedrooms);
    form.setValue('dirtinessLevel', dirtinessLevel);
    form.setValue('lastCleaned', lastCleaned);
    form.setValue('cleaningPersonnel', cleaningPersonnel);
    form.setValue('specialConditions', specialConditions);
    form.setValue('additionalNotes', additionalNotes);
    
    // Calculate estimated price based on parameters
    const basePrice = 120; // Base price for move in/out cleaning
    const sizeMultiplier = squareMeters / 50; // Adjust for size
    const dirtMultiplier = 1 + (dirtinessLevel * 0.1); // Adjust for dirtiness
    const personnelMultiplier = cleaningPersonnel === 'experienced' ? 1.2 : 1; // Premium for experienced personnel
    const estimatedPrice = basePrice * sizeMultiplier * dirtMultiplier * personnelMultiplier;
    
    form.setValue('totalAmount', Math.round(estimatedPrice * 100) / 100);
  }, [
    squareMeters, 
    bathrooms, 
    bedrooms, 
    dirtinessLevel, 
    lastCleaned, 
    cleaningPersonnel, 
    specialConditions, 
    additionalNotes
  ]);

  return (
    <div className="space-y-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Move In/Out Cleaning Details</h3>
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
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <MoveInOutCalendar form={form} />
      </motion.div>
    </div>
  );
};

export default MoveInOutStep;
