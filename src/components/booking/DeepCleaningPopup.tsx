
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles, X } from 'lucide-react';

interface DeepCleaningPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToDeepCleaning: () => void;
  onContinueStandard: () => void;
}

export const DeepCleaningPopup = ({ 
  isOpen, 
  onClose, 
  onSwitchToDeepCleaning, 
  onContinueStandard 
}: DeepCleaningPopupProps) => {
  const handleContinueStandard = () => {
    onContinueStandard();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full">
              <Sparkles className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
            ✨ Deep Cleaning Recommended
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400 space-y-3 mt-4">
            <p>
              Based on the size and number of bathrooms in your home, we suggest a Deep Cleaning for the best results.
            </p>
            <p>
              This includes extra attention to kitchens, bathrooms, and hard-to-reach areas.
            </p>
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-6">
          <Button 
            onClick={onSwitchToDeepCleaning}
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold"
          >
            👉 Switch to Deep Cleaning Booking
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleContinueStandard}
            className="w-full"
          >
            ❌ Continue with Standard Cleaning
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
