
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Steps, Step } from '@/components/ui/steps';
import { UserPlus, FileText, CheckCheck, CheckCircle } from 'lucide-react';
import { PersonalInfoStep } from '@/components/provider/application/PersonalInfoStep';
import { ExperienceStep } from '@/components/provider/application/ExperienceStep';
import { DocumentsStep } from '@/components/provider/application/DocumentsStep';
import { AgreementStep } from '@/components/provider/application/AgreementStep';
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
  identificationDoc: File | null;
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
  identificationDoc,
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
            identificationDoc={identificationDoc}
            backgroundCheckConsent={backgroundCheckConsent}
          />
        );
        
      case ApplicationStep.AGREEMENT:
        return (
          <AgreementStep
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
            identificationDoc={identificationDoc}
            backgroundCheckConsent={backgroundCheckConsent}
          />
        );
    }
  };

  return (
    <Card className="border-0 shadow-md md:col-span-3">
      <CardHeader>
        <CardTitle>Provider Application</CardTitle>
        <CardDescription>Step {currentStep + 1} of 5</CardDescription>
        <Progress value={formProgress} className="h-2 mt-2" />
      </CardHeader>
      
      <div className="px-6 pt-2 pb-4">
        <Steps currentStep={currentStep} className="mb-6">
          <Step icon={<UserPlus className="h-4 w-4" />} title="Personal Info" />
          <Step icon={<CheckCircle className="h-4 w-4" />} title="Experience" />
          <Step icon={<FileText className="h-4 w-4" />} title="Documents" />
          <Step icon={<CheckCheck className="h-4 w-4" />} title="Agreement" />
          <Step icon={<CheckCircle className="h-4 w-4" />} title="Review" />
        </Steps>
      </div>
      
      <CardContent>
        {renderStepContent()}
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2 pb-4">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === ApplicationStep.PERSONAL_INFO || isLoading}
        >
          Previous
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : 
            currentStep === ApplicationStep.CONFIRMATION ? "Submit Application" : "Next Step"}
        </Button>
      </CardFooter>
    </Card>
  );
};
