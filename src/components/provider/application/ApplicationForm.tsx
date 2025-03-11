
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Steps, Step } from '@/components/ui/steps';
import { UserPlus, FileText, CheckCheck, CheckCircle } from 'lucide-react';
import { PersonalInfoStep } from '@/components/provider/application/PersonalInfoStep';
import { ExperienceStep } from '@/components/provider/application/ExperienceStep';
import { DocumentsStep } from '@/components/provider/application/DocumentsStep';
import { ConfirmationStep } from '@/components/provider/application/ConfirmationStep';
import { ApplicationStep } from '@/hooks/useJoinTeamForm';

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
  
  const renderStepContent = () => {
    switch (currentStep) {
      case ApplicationStep.PERSONAL_INFO:
        return (
          <PersonalInfoStep
            name={name}
            email={email}
            phone={phone}
            setName={setName}
            setEmail={setEmail}
            setPhone={setPhone}
          />
        );
        
      case ApplicationStep.EXPERIENCE:
        return (
          <ExperienceStep
            position={position}
            experience={experience}
            availability={availability}
            skills={skills}
            setPosition={setPosition}
            setExperience={setExperience}
            toggleAvailability={toggleAvailability}
            toggleSkill={toggleSkill}
          />
        );
        
      case ApplicationStep.DOCUMENTS:
        return (
          <DocumentsStep
            handleFileChange={handleFileChange}
            resume={resume}
            backgroundCheckConsent={backgroundCheckConsent}
            setResume={setResume}
            setBackgroundCheckConsent={setBackgroundCheckConsent}
            message={message}
            agreeToTerms={agreeToTerms}
            agreeToBackgroundCheck={agreeToBackgroundCheck}
            agreeToTraining={agreeToTraining}
            setMessage={setMessage}
            setAgreeToTerms={setAgreeToTerms}
            setAgreeToBackgroundCheck={setAgreeToBackgroundCheck}
            setAgreeToTraining={setAgreeToTraining}
          />
        );
        
      case ApplicationStep.CONFIRMATION:
        return (
          <ConfirmationStep
            name={name}
            email={email}
            phone={phone}
            position={position}
            experience={experience}
            skills={skills}
            availability={availability}
            resume={resume}
            backgroundCheckConsent={backgroundCheckConsent}
            hasCriminalRecord={!agreeToBackgroundCheck}
          />
        );
    }
  };

  // Check if all required options in Documents step are selected
  const isDocumentsStepComplete = 
    agreeToTerms && 
    agreeToBackgroundCheck && 
    agreeToTraining && 
    resume !== null;

  const isNextButtonDisabled = () => {
    if (isLoading) return true;
    
    // For Documents step, all three checkboxes and resume must be selected/uploaded
    if (currentStep === ApplicationStep.DOCUMENTS) {
      return !isDocumentsStepComplete;
    }
    
    return false;
  };

  return (
    <Card className="border-0 shadow-md w-full">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle>Provider Application</CardTitle>
        <CardDescription>Step {currentStep + 1} of 4</CardDescription>
      </CardHeader>
      
      <div className="px-4 sm:px-6 pt-2 pb-4 overflow-x-auto">
        <Steps currentStep={currentStep} className="mb-6 min-w-[400px]">
          <Step icon={<UserPlus className="h-4 w-4" />} title="Personal Info" />
          <Step icon={<CheckCircle className="h-4 w-4" />} title="Experience" />
          <Step icon={<FileText className="h-4 w-4" />} title="Documents" />
          <Step icon={<CheckCheck className="h-4 w-4" />} title="Review" />
        </Steps>
      </div>
      
      <CardContent className="px-4 sm:px-6">
        {renderStepContent()}
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2 pb-4 px-4 sm:px-6">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === ApplicationStep.PERSONAL_INFO || isLoading}
        >
          Previous
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isNextButtonDisabled()}
        >
          {isLoading ? "Submitting..." : 
            currentStep === ApplicationStep.CONFIRMATION ? "Submit Application" : "Next Step"}
        </Button>
      </CardFooter>
    </Card>
  );
};
