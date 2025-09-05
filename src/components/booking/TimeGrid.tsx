
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface TimeGridProps {
  selectedTime: string;
  onTimeSelect: (time: string) => void;
}

const TimeGrid = ({ selectedTime, onTimeSelect }: TimeGridProps) => {
  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'
  ];

  const getAvailabilityColor = (time: string) => {
    const hour = parseInt(time.split(':')[0]);
    if (hour >= 9 && hour <= 15) return 'bg-green-50 border-green-200 text-green-700'; // High availability
    if (hour >= 8 && hour <= 17) return 'bg-secondary/10 border-secondary/20 text-secondary'; // Medium
    return 'bg-red-50 border-red-200 text-red-700'; // Low availability
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-primary" />
        <h4 className="font-medium text-gray-900 dark:text-white">
          Select Start Time
        </h4>
      </div>
      
      <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
        {timeSlots.map((time) => (
          <motion.div key={time} whileTap={{ scale: 0.95 }}>
            <Button
              variant={selectedTime === time ? "default" : "outline"}
              onClick={() => onTimeSelect(time)}
              className={`
                w-full h-12 text-sm transition-all
                ${selectedTime === time 
                  ? 'bg-primary text-white shadow-md' 
                  : `${getAvailabilityColor(time)} hover:shadow-sm`
                }
              `}
            >
              {time}
            </Button>
          </motion.div>
        ))}
      </div>
      
      <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-green-200"></div>
          <span>High availability</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-secondary/30"></div>
          <span>Medium availability</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-red-200"></div>
          <span>Limited availability</span>
        </div>
      </div>
    </div>
  );
};

export default TimeGrid;
