
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
    [ApplicationStep.PERSONAL_INFO]: false,
    [ApplicationStep.EXPERIENCE]: false,
    [ApplicationStep.DOCUMENTS]: false,
    [ApplicationStep.CONFIRMATION]: true
  });

  // Validate Personal Info step
  useEffect(() => {
    const isPersonalInfoValid = name.trim() !== '' && 
                              email.trim() !== '' && 
                              email.includes('@') && 
                              phone.trim() !== '';
    
    setStepValidations(prev => ({...prev, [ApplicationStep.PERSONAL_INFO]: isPersonalInfoValid}));
  }, [name, email, phone]);

  // Validate Experience step
  useEffect(() => {
    const isExperienceValid = position !== '' && 
                             experience !== '' && 
                             availability.length > 0 && 
                             skills.length > 0;
    
    setStepValidations(prev => ({...prev, [ApplicationStep.EXPERIENCE]: isExperienceValid}));
  }, [position, experience, availability, skills]);

  // Validate Documents step
  useEffect(() => {
    const isDocumentsValid = agreeToTerms && agreeToBackgroundCheck && agreeToTraining;
    
    setStepValidations(prev => ({...prev, [ApplicationStep.DOCUMENTS]: isDocumentsValid}));
  }, [agreeToTerms, agreeToBackgroundCheck, agreeToTraining]);

  const isStepComplete = (step: ApplicationStep) => {
    return stepValidations[step];
  };

  return {
    stepValidations,
    isStepComplete
  };
};
