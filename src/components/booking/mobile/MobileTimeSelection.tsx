
import { useState } from 'react';
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface MobileTimeSelectionProps {
  form: UseFormReturn<BookingFormData>;
  onComplete?: () => void;
}

const MobileTimeSelection = ({ form, onComplete }: MobileTimeSelectionProps) => {
  const selectedTime = form.watch('preferredTime');
  const hours = form.watch('hours') || 2;

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00'
  ];

  const handleTimeSelect = (startTime: string) => {
    // Calculate end time based on selected hours
    const [hour, minute] = startTime.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(hour, minute);
    const endDate = new Date(startDate.getTime() + hours * 60 * 60 * 1000);
    const endTime = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
    
    const timeSlot = `${startTime}-${endTime}`;
    form.setValue('preferredTime', timeSlot);
    
    // Auto-advance when selection is made
    setTimeout(() => {
      onComplete?.();
    }, 300);
  };

  const getAvailabilityStatus = (time: string) => {
    const hour = parseInt(time.split(':')[0]);
    if (hour >= 9 && hour <= 15) return { status: 'high', color: 'bg-green-50 border-green-200 text-green-700' };
    if (hour >= 8 && hour <= 17) return { status: 'medium', color: 'bg-yellow-50 border-yellow-200 text-yellow-700' };
    return { status: 'low', color: 'bg-red-50 border-red-200 text-red-700' };
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Choose start time</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {timeSlots.map((time) => {
          const isSelected = selectedTime?.startsWith(time);
          const { color } = getAvailabilityStatus(time);
          
          return (
            <motion.div key={time} whileTap={{ scale: 0.95 }}>
              <Button
                variant={isSelected ? "default" : "outline"}
                onClick={() => handleTimeSelect(time)}
                className={`
                  w-full h-12 text-sm transition-all
                  ${isSelected 
                    ? 'bg-primary text-white shadow-md ring-2 ring-primary/20' 
                    : `${color} hover:shadow-sm active:scale-95`
                  }
                `}
              >
                {time}
              </Button>
            </motion.div>
          );
        })}
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded bg-green-200"></div>
          <span>High</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded bg-yellow-200"></div>
          <span>Medium</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded bg-red-200"></div>
          <span>Limited</span>
        </div>
      </div>

      {selectedTime && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg"
        >
          Selected: <strong>{selectedTime}</strong> ({hours} hours)
        </motion.div>
      )}
    </motion.div>
  );
};

export default MobileTimeSelection;
