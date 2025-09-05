
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ApplicationStep } from '@/hooks/provider/types';
import { useStepValidation } from '@/hooks/provider/useStepValidation';
import { ApplicationSteps } from './components/ApplicationSteps';
import { StepContent } from './components/StepContent';
import { ApplicationNavigation } from './components/ApplicationNavigation';

interface ApplicationFormProps {
  currentStep: ApplicationStep;
  formProgress: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  availability: string[];
  skills: string[];
  resume: File | null;
  backgroundCheckConsent: File | null;
  message: string;
  agreeToTerms: boolean;
  agreeToBackgroundCheck: boolean;
  agreeToTraining: boolean;
  isLoading: boolean;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setPhone: (value: string) => void;
  setPosition: (value: string) => void;
  setExperience: (value: string) => void;
  setMessage: (value: string) => void;
  setAgreeToTerms: (value: boolean) => void;
  setAgreeToBackgroundCheck: (value: boolean) => void;
  setAgreeToTraining: (value: boolean) => void;
  setResume: React.Dispatch<React.SetStateAction<File | null>>;
  setBackgroundCheckConsent: React.Dispatch<React.SetStateAction<File | null>>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>) => void;
  toggleAvailability: (value: string) => void;
  toggleSkill: (value: string) => void;
  prevStep: () => void;
  handleSubmit: () => void;
}

export const ApplicationForm = ({
  currentStep,
  formProgress,
  name,
  email,
  phone,
  position,
  experience,
  availability,
  skills,
  resume,
  backgroundCheckConsent,
  message,
  agreeToTerms,
  agreeToBackgroundCheck,
  agreeToTraining,
  isLoading,
  setName,
  setEmail,
  setPhone,
  setPosition,
  setExperience,
  setMessage,
  setAgreeToTerms,
  setAgreeToBackgroundCheck,
  setAgreeToTraining,
  setResume,
  setBackgroundCheckConsent,
  handleFileChange,
  toggleAvailability,
  toggleSkill,
  prevStep,
  handleSubmit
}: ApplicationFormProps) => {
  // Use the custom hook for step validation
  const { stepValidations, isStepComplete } = useStepValidation(
    name,
    email,
    phone,
    position,
    experience,
    availability,
    skills,
    agreeToTerms,
    agreeToBackgroundCheck,
    agreeToTraining
  );

  return (
    <Card className="border-0 shadow-md w-full">
      <CardHeader className="px-4 sm:px-6 pb-0">
        <CardTitle>Provider Application</CardTitle>
        <CardDescription>Step {getStepNumber(currentStep)} of 4</CardDescription>
      </CardHeader>
      
      <div className="px-4 sm:px-6 pt-4 pb-2 overflow-x-auto">
        <ApplicationSteps 
          currentStep={currentStep} 
          stepValidations={stepValidations} 
        />
      </div>
      
      <CardContent className="px-4 sm:px-6 pt-2 pb-4">
        <StepContent
          currentStep={currentStep}
          name={name}
          email={email}
          phone={phone}
          position={position}
          experience={experience}
          availability={availability}
          skills={skills}
          resume={resume}
          backgroundCheckConsent={backgroundCheckConsent}
          message={message}
          agreeToTerms={agreeToTerms}
          agreeToBackgroundCheck={agreeToBackgroundCheck}
          agreeToTraining={agreeToTraining}
          setName={setName}
          setEmail={setEmail}
          setPhone={setPhone}
          setPosition={setPosition}
          setExperience={setExperience}
          setMessage={setMessage}
          setAgreeToTerms={setAgreeToTerms}
          setAgreeToBackgroundCheck={setAgreeToBackgroundCheck}
          setAgreeToTraining={setAgreeToTraining}
          setResume={setResume}
          setBackgroundCheckConsent={setBackgroundCheckConsent}
          handleFileChange={handleFileChange}
          toggleAvailability={toggleAvailability}
          toggleSkill={toggleSkill}
        />
      </CardContent>
      
      <CardFooter>
        <ApplicationNavigation
          currentStep={currentStep}
          isLoading={isLoading}
          isStepComplete={isStepComplete(currentStep)}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      </CardFooter>
    </Card>
  );
};

// Helper function to convert ApplicationStep enum to number
function getStepNumber(step: ApplicationStep): number {
  switch(step) {
    case ApplicationStep.PersonalInfo: return 1;
    case ApplicationStep.Experience: return 2;
    case ApplicationStep.Documents: return 3;
    case ApplicationStep.Confirmation: return 4;
    default: return 1;
  }
}
