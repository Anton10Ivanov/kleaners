
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApplicationStep, joinTeamSchema, JoinTeamFormData } from './provider/types';
import { useFormState } from './provider/useFormState';
import { useFormHandlers } from './provider/useFormHandlers';
import { useFormSubmission } from './provider/useFormSubmission';

export { ApplicationStep } from './provider/types';

export const useJoinTeamForm = () => {
  const {
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
  } = useFormState();
  
  const { handleFileChange, toggleAvailability, toggleSkill } = useFormHandlers(
    availability,
    skills,
    setAvailability, 
    setSkills
  );
  
  const form = useForm<JoinTeamFormData>({
    resolver: zodResolver(joinTeamSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      experience: 'less-than-1' as const,
      availability: 'part-time' as const,
      hasOwnTransportation: false,
      hasOwnEquipment: false,
      hasCleaningCertificates: false,
      hasCriminalRecord: false,
      message: '',
      agreeToTerms: false,
    },
  });
  
  const resetForm = () => {
    form.reset();
  };
  
  const { isSubmitting, isSubmitSuccessful, onSubmit } = useFormSubmission(
    agreeToBackgroundCheck,
    availability,
    setApplicationSubmitted,
    setApplicationId,
    resetForm
  );
  
  const handleSubmit = () => {
    if (currentStep === ApplicationStep.CONFIRMATION) {
      onSubmit({
        firstName: name.split(' ')[0] || '',
        lastName: name.split(' ').slice(1).join(' ') || '',
        email,
        phone,
        experience: 'less-than-1',
        availability: 'part-time',
        hasOwnTransportation: true,
        hasOwnEquipment: true,
        hasCleaningCertificates: false,
        hasCriminalRecord: !agreeToBackgroundCheck,
        message,
        agreeToTerms,
      });
    } else {
      nextStep();
    }
  };
  
  return {
    form,
    isSubmitting,
    isSubmitSuccessful,
    onSubmit: form.handleSubmit(onSubmit),
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
    isLoading: isSubmitting,
    applicationSubmitted,
    applicationId,
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
    nextStep,
    prevStep,
    handleSubmit,
    handleFileChange,
    toggleAvailability,
    toggleSkill
  };
};
