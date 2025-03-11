
import { Steps, Step } from '@/components/ui/steps';
import { UserPlus, CheckCircle, FileText, CheckCheck } from 'lucide-react';
import { ApplicationStep } from '@/hooks/provider/types';

interface ApplicationStepsProps {
  currentStep: ApplicationStep;
  stepValidations: {
    [key in ApplicationStep]: boolean;
  };
}

export const ApplicationSteps = ({ currentStep, stepValidations }: ApplicationStepsProps) => {
  return (
    <Steps currentStep={currentStep} className="mb-6 min-w-[400px]">
      <Step 
        icon={<UserPlus className="h-4 w-4" />} 
        title="Personal Info" 
        status={stepValidations[ApplicationStep.PERSONAL_INFO] ? "complete" : "incomplete"}
      />
      <Step 
        icon={<CheckCircle className="h-4 w-4" />} 
        title="Experience" 
        status={stepValidations[ApplicationStep.EXPERIENCE] ? "complete" : "incomplete"}
      />
      <Step 
        icon={<FileText className="h-4 w-4" />} 
        title="Documents" 
        status={stepValidations[ApplicationStep.DOCUMENTS] ? "complete" : "incomplete"}
      />
      <Step 
        icon={<CheckCheck className="h-4 w-4" />} 
        title="Review" 
        status="waiting"
      />
    </Steps>
  );
};
