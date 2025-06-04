
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormData } from '@/schemas/booking';

interface CleaningPaceToggleProps {
  form: UseFormReturn<BookingFormData>;
}

export const CleaningPaceToggle = ({ form }: CleaningPaceToggleProps) => {
  const cleaningPace = form.watch('cleaningPace') || 'standard';

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Preferred cleaning pace
        </Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-gray-400 cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">
                Quick cleans are ideal for homes that are already tidy and only need a light refresh. 
                Not suitable for first-time or deep cleaning. Used to calculate your recommended duration.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="flex items-center justify-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className={`text-sm font-medium transition-colors ${cleaningPace === 'quick' ? 'text-red-600' : 'text-gray-500'}`}>
          Quick
        </div>
        <Switch 
          checked={cleaningPace === 'standard'} 
          onCheckedChange={checked => form.setValue('cleaningPace', checked ? 'standard' : 'quick')} 
          className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-red-500 h-6 w-16"
        />
        <div className={`text-sm font-medium transition-colors ${cleaningPace === 'standard' ? 'text-green-600' : 'text-gray-500'}`}>
          Standard
        </div>
      </div>
      <p className="text-xs text-gray-500 text-center">
        {cleaningPace === 'quick' ? 'Faster and lighter – reduces estimated duration by 20%' : 'Thorough and well-paced cleaning'}
      </p>
    </div>
  );
};
