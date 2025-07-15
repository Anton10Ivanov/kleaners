
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Clock, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TimeSliderProps {
  value: string;
  onChange: (time: string) => void;
  className?: string;
}

export const TimeSlider = ({ value, onChange, className }: TimeSliderProps) => {
  // Convert time string to slider value (0-24 representing 30-min intervals from 08:00-20:00)
  const timeToSliderValue = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    const startMinutes = 8 * 60; // 08:00
    const intervalMinutes = 30;
    return Math.round((totalMinutes - startMinutes) / intervalMinutes);
  };

  // Convert slider value back to time string
  const sliderValueToTime = (sliderValue: number): string => {
    const startMinutes = 8 * 60; // 08:00
    const totalMinutes = startMinutes + (sliderValue * 30);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const [sliderValue, setSliderValue] = useState([timeToSliderValue(value || '08:00')]);

  useEffect(() => {
    if (value) {
      setSliderValue([timeToSliderValue(value)]);
    }
  }, [value]);

  const handleSliderChange = (newValue: number[]) => {
    const timeStr = sliderValueToTime(newValue[0]);
    setSliderValue(newValue);
    onChange(timeStr);
  };

  const currentTime = sliderValueToTime(sliderValue[0]);
  const endTime = sliderValueToTime(sliderValue[0] + 4); // +2 hours

  // Provider availability simulation
  const getAvailabilityStatus = (timeSlot: number) => {
    // Simulate availability based on time slots
    if (timeSlot >= 8 && timeSlot <= 16) return 'high'; // Peak availability
    if (timeSlot >= 6 && timeSlot <= 20) return 'medium';
    return 'low';
  };

  const availabilityStatus = getAvailabilityStatus(sliderValue[0]);
  const availabilityColors = {
    high: 'text-green-600 bg-green-50 border-green-200',
    medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    low: 'text-red-600 bg-red-50 border-red-200'
  };

  const availabilityText = {
    high: 'High availability',
    medium: 'Medium availability', 
    low: 'Limited availability'
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Clock className="h-5 w-5 text-primary" />
        </div>
        <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
          Select Start Time
        </h4>
      </div>
      
      <div className="px-4">
        <Slider
          value={sliderValue}
          onValueChange={handleSliderChange}
          max={24} // 24 intervals (08:00 to 20:00 in 30-min steps)
          min={0}
          step={1}
          className="w-full"
        />
        
        <div className="flex justify-between text-xs text-gray-500 mt-3">
          <span className="font-medium">08:00</span>
          <span className="font-medium">14:00</span>
          <span className="font-medium">20:00</span>
        </div>
      </div>
      
      <motion.div 
        className="bg-primary/10 rounded-xl p-6 border border-primary/20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Start Time</p>
            <p className="text-2xl font-bold text-primary">{currentTime}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Estimated End</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{endTime}</p>
          </div>
        </div>
        
        {/* Provider Availability Indicator */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Provider availability:</span>
            <span className={`
              text-xs px-2 py-1 rounded-full border font-medium
              ${availabilityColors[availabilityStatus]}
            `}>
              {availabilityText[availabilityStatus]}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
