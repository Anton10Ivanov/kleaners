
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface SuggestedDurationDialogProps {
  isOpen: boolean;
  onChoice: (useSuggested: boolean) => void;
  suggestedDuration: number;
  propertySize: number;
  bedrooms: number;
  bathrooms: number;
  cleaningPace: string;
}

export const SuggestedDurationDialog = ({
  isOpen,
  onChoice,
  suggestedDuration,
  propertySize,
  bedrooms,
  bathrooms,
  cleaningPace
}: SuggestedDurationDialogProps) => {
  const [isChoosing, setIsChoosing] = useState(false);

  const handleChoice = (useSuggested: boolean) => {
    setIsChoosing(true);
    setTimeout(() => {
      onChoice(useSuggested);
      setIsChoosing(false);
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Suggested Duration
          </DialogTitle>
          <DialogDescription>
            Based on your home details, we've calculated an estimated cleaning time.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span className="font-semibold text-primary">Recommended: {suggestedDuration} hours</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Based on {propertySize} m², {bedrooms === 0 ? 'Studio' : `${bedrooms} bedroom${bedrooms !== 1 ? 's' : ''}`}, 
              {' '}{bathrooms} bathroom{bathrooms !== 1 ? 's' : ''}{cleaningPace === 'quick' ? ', quick pace' : ''}.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => handleChoice(true)}
              disabled={isChoosing}
              className="h-12 bg-primary hover:bg-primary/90"
            >
              {isChoosing ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                "Use Suggested Duration"
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => handleChoice(false)}
              disabled={isChoosing}
              className="h-12"
            >
              Choose Myself
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
