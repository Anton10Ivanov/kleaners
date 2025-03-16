
import { Frequency } from "@/types/enums";
import { useEffect, useRef } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

interface ServiceOptionsProps {
  frequency?: string | Frequency;
  setFrequency: (frequency: Frequency) => void;
}

const ServiceOptions = ({ frequency, setFrequency }: ServiceOptionsProps) => {
  const hasInitialized = useRef(false);

  // Set default frequency to Weekly if not already set
  useEffect(() => {
    if (!hasInitialized.current && !frequency) {
      setFrequency(Frequency.Weekly);
      hasInitialized.current = true;
    }
  }, [frequency, setFrequency]);

  const options = [
    { 
      value: Frequency.Weekly, 
      label: "Weekly", 
      price: "$27/hour",
      tooltip: "Best value & consistent clean home"
    },
    { 
      value: Frequency.BiWeekly, 
      label: "Bi-Weekly", 
      price: "$30/hour",
      tooltip: "Popular option for most homes"
    },
    { 
      value: Frequency.Monthly, 
      label: "Monthly", 
      price: "$35/hour",
      tooltip: "Deep refresh for your space"
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">How often would you like cleaning?</h3>
      </div>
      
      <RadioGroup 
        value={frequency || Frequency.Weekly} 
        onValueChange={(value) => setFrequency(value as Frequency)}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {options.map((option) => (
          <div
            key={option.value}
            className={`relative rounded-xl p-4 border-2 transition-all duration-200 cursor-pointer ${
              frequency === option.value
                ? "border-primary shadow-sm bg-primary/5"
                : "border-gray-200 dark:border-gray-700 hover:border-primary/50"
            }`}
          >
            <RadioGroupItem 
              value={option.value} 
              id={option.value} 
              className="sr-only"
            />
            
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-2">
                <Label 
                  htmlFor={option.value} 
                  className="font-medium text-gray-900 dark:text-white cursor-pointer"
                >
                  {option.label}
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-4 w-4 text-subtext dark:text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="top" align="center" className="bg-white dark:bg-gray-800 p-2 shadow-lg rounded-md max-w-xs">
                    <p className="text-xs">{option.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="text-theme-cta font-semibold">{option.price}</div>
              
              {frequency === option.value && (
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default ServiceOptions;
