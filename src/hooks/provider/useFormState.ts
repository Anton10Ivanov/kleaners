
import { useState } from 'react';
import { ApplicationStep } from './types';

export const useFormState = () => {
  const [currentStep, setCurrentStep] = useState<ApplicationStep>(ApplicationStep.PERSONAL_INFO);
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
  
  const formProgress = ((currentStep + 1) / 5) * 100;
  
  const nextStep = () => {
    if (currentStep < ApplicationStep.CONFIRMATION) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > ApplicationStep.PERSONAL_INFO) {
      setCurrentStep(prev => prev - 1);
    }
  };

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
