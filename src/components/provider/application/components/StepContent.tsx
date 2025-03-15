
import { ApplicationStep } from '@/hooks/provider/types';
import { PersonalInfoStep } from '@/components/provider/application/PersonalInfoStep';
import { ExperienceStep } from '@/components/provider/application/ExperienceStep';
import { DocumentsStep } from '@/components/provider/application/DocumentsStep';
import { ConfirmationStep } from '@/components/provider/application/ConfirmationStep';

interface StepContentProps {
  currentStep: ApplicationStep;
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
}

export const StepContent = ({ 
  currentStep,
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
  toggleSkill
}: StepContentProps) => {
  switch (currentStep) {
    case ApplicationStep.PersonalInfo:
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
      
    case ApplicationStep.Experience:
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
      
    case ApplicationStep.Documents:
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
      
    case ApplicationStep.Confirmation:
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
    default:
      return null;
  }
};
