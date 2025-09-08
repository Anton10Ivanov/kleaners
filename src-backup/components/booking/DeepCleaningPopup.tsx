
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

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
            <div className="card-spacing-xs bg-warning/10 rounded-full">
              <Sparkles className="h-8 w-8 text-secondary" />
            </div>
          </div>
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
            ✨ Deep Cleaning Recommended
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400 form-spacing-normal mt-4">
            <p>
              Your home may need a Deep Cleaning for best results, especially due to its size or number of bathrooms.
            </p>
            <p>
              This includes extra attention to bathrooms, kitchen, and details.
            </p>
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-6">
          <Button 
            onClick={onSwitchToDeepCleaning}
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-semibold"
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
