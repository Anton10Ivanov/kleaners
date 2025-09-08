
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ApplicationStep } from '@/hooks/provider/types';

interface ApplicationNavigationProps {
  currentStep: ApplicationStep;
  isLoading: boolean;
  isStepComplete: boolean;
  prevStep: () => void;
  handleSubmit: () => void;
}

export const ApplicationNavigation = ({ 
  currentStep, 
  isLoading, 
  isStepComplete, 
  prevStep,
  handleSubmit 
}: ApplicationNavigationProps) => {
  const isNextButtonDisabled = isLoading || !isStepComplete;

  return (
    <div className="flex justify-between pt-2 pb-4 px-4 sm:px-6">
      <Button
        variant="outline"
        onClick={prevStep}
        disabled={currentStep === ApplicationStep.PersonalInfo || isLoading}
        className="flex items-center gap-1"
      >
        <ArrowLeft className="h-4 w-4" />
        Previous
      </Button>
      <Button
        onClick={handleSubmit}
        disabled={isNextButtonDisabled}
        className="flex items-center gap-1"
      >
        {isLoading ? "Submitting..." : 
          currentStep === ApplicationStep.Confirmation ? (
            <>Submit Application</>
          ) : (
            <>Next Step<ArrowRight className="h-4 w-4" /></>
          )
        }
      </Button>
    </div>
  );
};
