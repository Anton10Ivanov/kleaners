
import { Steps, Step } from '@/components/ui/steps';
import { UserPlus, CheckCircle, FileText, CheckCheck } from 'lucide-react';
import { ApplicationStep } from '@/hooks/provider/types';

interface ApplicationStepsProps {
  currentStep: ApplicationStep;
  stepValidations: {
    [key in ApplicationStep]?: boolean;
  };
}

export const ApplicationSteps = ({ currentStep, stepValidations }: ApplicationStepsProps) => {
  return (
    <Steps currentStep={getStepIndex(currentStep)} className="mb-6 min-w-[400px]">
      <Step 
        icon={<UserPlus className="h-4 w-4" />} 
        title="Personal Info" 
        status={stepValidations[ApplicationStep.PersonalInfo] ? "complete" : "incomplete"}
      />
      <Step 
        icon={<CheckCircle className="h-4 w-4" />} 
        title="Experience" 
        status={stepValidations[ApplicationStep.Experience] ? "complete" : "incomplete"}
      />
      <Step 
        icon={<FileText className="h-4 w-4" />} 
        title="Documents" 
        status={stepValidations[ApplicationStep.Documents] ? "complete" : "incomplete"}
      />
      <Step 
        icon={<CheckCheck className="h-4 w-4" />} 
        title="Review" 
        status="waiting"
      />
    </Steps>
  );
};

// Helper function to convert ApplicationStep enum to index
function getStepIndex(step: ApplicationStep): number {
  switch(step) {
    case ApplicationStep.PersonalInfo: return 0;
    case ApplicationStep.Experience: return 1;
    case ApplicationStep.Documents: return 2;
    case ApplicationStep.Confirmation: return 3;
    default: return 0;
  }
}
