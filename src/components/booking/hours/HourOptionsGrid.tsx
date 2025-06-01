
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface HourOptionsGridProps {
  selectedHours: number;
  onHoursChange: (hours: number) => void;
  getHourRecommendation: (hours: number) => { text: string; color: string };
}

const HourOptionsGrid = ({ selectedHours, onHoursChange, getHourRecommendation }: HourOptionsGridProps) => {
  const hourOptions = [2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
      {hourOptions.map((hours) => {
        const isSelected = selectedHours === hours;
        const recommendation = getHourRecommendation(hours);
        
        return (
          <TooltipProvider key={hours}>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => onHoursChange(hours)}
                    className={`
                      relative h-16 flex flex-col items-center justify-center transition-all duration-200
                      ${isSelected 
                        ? "bg-primary text-white shadow-lg border-primary" 
                        : "hover:border-primary/50 hover:bg-primary/5 hover:shadow-md"
                      }
                    `}
                  >
                    <span className="text-lg font-bold">{hours}h</span>
                    <span className={`text-xs ${isSelected ? "text-white/80" : recommendation.color}`}>
                      {recommendation.text.split(' ')[0]}
                    </span>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                      />
                    )}
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-medium">{hours} hour{hours > 1 ? 's' : ''}</p>
                <p className="text-sm text-gray-500">{recommendation.text}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
};

export default HourOptionsGrid;
