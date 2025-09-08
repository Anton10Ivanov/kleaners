
import { useState, useEffect } from 'react';
import { ApplicationStep } from './types';

export const useStepValidation = (
  name: string,
  email: string,
  phone: string,
  position: string,
  experience: string,
  availability: string[],
  skills: string[],
  agreeToTerms: boolean,
  agreeToBackgroundCheck: boolean,
  agreeToTraining: boolean
) => {
  const [stepValidations, setStepValidations] = useState({
    [ApplicationStep.PersonalInfo]: false,
    [ApplicationStep.Experience]: false,
    [ApplicationStep.Documents]: false,
    [ApplicationStep.Confirmation]: true
  });

  // Validate Personal Info step
  useEffect(() => {
    const isPersonalInfoValid = name.trim() !== '' && 
                              email.trim() !== '' && 
                              email.includes('@') && 
                              phone.trim() !== '';
    
    setStepValidations(prev => ({...prev, [ApplicationStep.PersonalInfo]: isPersonalInfoValid}));
  }, [name, email, phone]);

  // Validate Experience step
  useEffect(() => {
    const isExperienceValid = position !== '' && 
                             experience !== '' && 
                             availability.length > 0 && 
                             skills.length > 0;
    
    setStepValidations(prev => ({...prev, [ApplicationStep.Experience]: isExperienceValid}));
  }, [position, experience, availability, skills]);

  // Validate Documents step
  useEffect(() => {
    const isDocumentsValid = agreeToTerms && agreeToBackgroundCheck && agreeToTraining;
    
    setStepValidations(prev => ({...prev, [ApplicationStep.Documents]: isDocumentsValid}));
  }, [agreeToTerms, agreeToBackgroundCheck, agreeToTraining]);

  const isStepComplete = (step: ApplicationStep) => {
    return stepValidations[step];
  };

  return {
    stepValidations,
    isStepComplete
  };
};
