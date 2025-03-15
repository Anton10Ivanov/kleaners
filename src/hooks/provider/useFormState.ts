
import { useState } from 'react';
import { ApplicationStep } from './types';

export const useFormState = () => {
  const [currentStep, setCurrentStep] = useState<ApplicationStep>(ApplicationStep.PersonalInfo);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('cleaner');
  const [experience, setExperience] = useState('0-1');
  const [availability, setAvailability] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [resume, setResume] = useState<File | null>(null);
  const [backgroundCheckConsent, setBackgroundCheckConsent] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToBackgroundCheck, setAgreeToBackgroundCheck] = useState(false);
  const [agreeToTraining, setAgreeToTraining] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  
  // Calculate progress based on step number
  const formProgress = (getStepNumber(currentStep) / 4) * 100;
  
  const nextStep = () => {
    if (currentStep < ApplicationStep.Confirmation) {
      setCurrentStep(getNextStep(currentStep));
    }
  };
  
  const prevStep = () => {
    if (currentStep > ApplicationStep.PersonalInfo) {
      setCurrentStep(getPrevStep(currentStep));
    }
  };
  
  // Helper function to get step number
  function getStepNumber(step: ApplicationStep): number {
    switch(step) {
      case ApplicationStep.PersonalInfo: return 1;
      case ApplicationStep.Experience: return 2;
      case ApplicationStep.Documents: return 3;
      case ApplicationStep.Confirmation: return 4;
      default: return 1;
    }
  }
  
  // Helper function to get next step
  function getNextStep(step: ApplicationStep): ApplicationStep {
    switch(step) {
      case ApplicationStep.PersonalInfo: return ApplicationStep.Experience;
      case ApplicationStep.Experience: return ApplicationStep.Documents;
      case ApplicationStep.Documents: return ApplicationStep.Confirmation;
      default: return step;
    }
  }
  
  // Helper function to get previous step
  function getPrevStep(step: ApplicationStep): ApplicationStep {
    switch(step) {
      case ApplicationStep.Experience: return ApplicationStep.PersonalInfo;
      case ApplicationStep.Documents: return ApplicationStep.Experience;
      case ApplicationStep.Confirmation: return ApplicationStep.Documents;
      default: return step;
    }
  }

  return {
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
    applicationSubmitted,
    applicationId,
    setName,
    setEmail,
    setPhone,
    setPosition,
    setExperience,
    setAvailability,
    setSkills,
    setResume,
    setBackgroundCheckConsent,
    setMessage,
    setAgreeToTerms,
    setAgreeToBackgroundCheck,
    setAgreeToTraining,
    setApplicationSubmitted,
    setApplicationId,
    nextStep,
    prevStep,
  };
};
