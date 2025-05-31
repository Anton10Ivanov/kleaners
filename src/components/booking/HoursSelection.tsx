
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

interface HoursSelectionProps {
  form: UseFormReturn<BookingFormData>;
}

const HoursSelection = ({ form }: HoursSelectionProps) => {
  const selectedHours = form.watch('hours') || 2;

  const handleHoursChange = (hours: number) => {
    form.setValue('hours', hours);
  };

  const hourOptions = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-2"
    >
      <div className="flex items-center gap-2 mb-2">
        <h4 className="text-base font-medium text-gray-900 dark:text-white">
          Duration
        </h4>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
            </TooltipTrigger>
            <TooltipContent className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
              <p className="font-medium">Select cleaning duration</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Typical home cleaning takes 2-4 hours depending on size and condition
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
        {hourOptions.map((hours) => (
          <Button
            key={hours}
            variant={selectedHours === hours ? "default" : "outline"}
            onClick={() => handleHoursChange(hours)}
            className="py-2 px-3 text-sm"
          >
            {hours}h
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

export default HoursSelection;
