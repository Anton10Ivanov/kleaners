
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import { useState, useEffect } from "react";

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

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-primary" />
        <h4 className="font-medium text-gray-900 dark:text-white">Select Start Time</h4>
      </div>
      
      <div className="px-3">
        <Slider
          value={sliderValue}
          onValueChange={handleSliderChange}
          max={24} // 24 intervals (08:00 to 20:00 in 30-min steps)
          min={0}
          step={1}
          className="w-full"
        />
        
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>08:00</span>
          <span>14:00</span>
          <span>20:00</span>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/20">
        <div className="flex items-center justify-between">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Start Time</p>
            <p className="text-lg font-semibold text-primary">{currentTime}</p>
          </div>
          <div className="text-center opacity-60">
            <p className="text-xs text-gray-500">→</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">End Time</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{endTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
