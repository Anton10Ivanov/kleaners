
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Info } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormData } from '@/schemas/booking';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface CleaningPaceToggleProps {
  form: UseFormReturn<BookingFormData>;
}

export const CleaningPaceToggle = ({ form }: CleaningPaceToggleProps) => {
  const cleaningPace = form.watch('cleaningPace') || 'standard';
  const [showPopup, setShowPopup] = useState(false);

  const handleInfoClick = () => {
    setShowPopup(true);
  };

  return (
    <div className="form-spacing-relaxed">
      <div className="flex items-center gap-2">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Preferred cleaning pace
        </Label>
        <button
          type="button"
          onClick={handleInfoClick}
          className="card-spacing-none border-none bg-transparent cursor-pointer"
        >
          <Info className="h-4 w-4 text-gray-400 cursor-help" />
        </button>
      </div>
      
      <div className="flex items-center justify-center gap-4 card-spacing-xs bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className={`text-sm font-medium transition-colors ${cleaningPace === 'quick' ? 'text-red-600' : 'text-gray-500'}`}>
          Quick
        </div>
        <Switch 
          checked={cleaningPace === 'standard'} 
          onCheckedChange={checked => form.setValue('cleaningPace', checked ? 'standard' : 'quick')} 
          className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-red-500"
        />
        <div className={`text-sm font-medium transition-colors ${cleaningPace === 'standard' ? 'text-green-600' : 'text-gray-500'}`}>
          Standard
        </div>
      </div>
      <p className="text-xs text-gray-500 text-center">
        {cleaningPace === 'quick' ? 'Faster and lighter – reduces estimated duration by 20%' : 'Thorough and well-paced cleaning'}
      </p>

      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cleaning Pace Information</DialogTitle>
            <DialogDescription className="text-sm">
              Quick cleans are ideal for homes that are already tidy and only need a light refresh. 
              Not suitable for first-time or deep cleaning. Used to calculate your recommended duration.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
