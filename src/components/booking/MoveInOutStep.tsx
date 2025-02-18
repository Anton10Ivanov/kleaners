
import { useState } from 'react';
import { motion } from 'framer-motion';
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
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-dark-background p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800"
      >
        <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Move In/Out Cleaning Service</h3>
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
        className="bg-white dark:bg-dark-background p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800"
      >
        <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Select a Date</h3>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={(date) => date < new Date() || date.getDay() === 0}
          className="rounded-md border border-gray-100 dark:border-gray-800"
          classNames={{
            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            caption: "flex justify-center pt-1 relative items-center",
            caption_label: "text-sm font-medium text-gray-900 dark:text-white",
            nav: "space-x-1 flex items-center",
            nav_button: "h-7 w-7 bg-transparent p-0 hover:bg-primary/10 dark:hover:bg-dark-primary/10 rounded-md transition-colors duration-200",
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell: "text-gray-500 dark:text-gray-400 rounded-md w-9 font-normal text-[0.8rem]",
            row: "flex w-full mt-2",
            cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-primary/10 dark:[&:has([aria-selected])]:bg-dark-primary/10 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
            day: "h-9 w-9 p-0 font-normal rounded-md transition-colors duration-200 hover:bg-primary/15 dark:hover:bg-dark-primary/15 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:ring-offset-2",
            day_selected: "bg-primary dark:bg-dark-primary text-primary-foreground dark:text-white hover:bg-primary hover:text-primary-foreground dark:hover:bg-dark-primary",
            day_today: "bg-accent/20 dark:bg-dark-surface text-accent-foreground dark:text-white font-semibold",
            day_outside: "text-gray-400 dark:text-gray-600 opacity-50",
            day_disabled: "text-gray-400 dark:text-gray-600 opacity-50 hover:bg-transparent cursor-not-allowed",
            day_range_middle: "aria-selected:bg-accent dark:aria-selected:bg-dark-surface aria-selected:text-accent-foreground",
            day_hidden: "invisible",
          }}
        />
        <p className="text-sm text-muted-foreground dark:text-gray-400 mt-4 italic">
          Note: We don't work on Sundays
        </p>
      </motion.div>
    </div>
  );
};

export default MoveInOutStep;
