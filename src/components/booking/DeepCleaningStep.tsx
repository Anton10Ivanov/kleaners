
import { motion } from 'framer-motion';
import Calendar from './Calendar';
import DeepCleaningFields from './deepCleaning/DeepCleaningFields';
import { UseFormReturn } from "react-hook-form";
import { DeepCleaningFormData } from "@/schemas/booking";

interface DeepCleaningStepProps {
  form: UseFormReturn<DeepCleaningFormData>;
}

const DeepCleaningStep = ({ form }: DeepCleaningStepProps) => {
  return (
    <div className="space-y-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Deep Cleaning Service</h3>
        <DeepCleaningFields form={form} />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <Calendar form={form} />
      </motion.div>
    </div>
  );
};

export default DeepCleaningStep;
