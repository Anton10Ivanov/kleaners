
import { Button } from '@/components/ui/button';

interface ActionButtonsProps {
  onSubmit?: () => void;
  isSubmitting?: boolean;
  onBack?: () => void;
  backButtonText?: string;
  showBackButton?: boolean;
}

const ActionButtons = ({ 
  onSubmit, 
  isSubmitting, 
  onBack, 
  backButtonText = 'Back', 
  showBackButton = false 
}: ActionButtonsProps) => {
  if (!onSubmit) return null;

  return (
    <div className="pt-4 mt-2 border-t">
      <div className="flex flex-col sm:flex-row gap-2">
        {showBackButton && onBack && (
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="w-full"
          >
            {backButtonText}
          </Button>
        )}
        <Button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full"
          size="lg"
        >
          {isSubmitting ? "Processing Booking..." : "Complete Booking"}
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;
