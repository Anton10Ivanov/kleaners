
import { useState } from 'react';
import { toast } from 'sonner';
import { handleApiError, ErrorSeverity } from '@/utils/errorHandling';
import { JoinTeamFormData } from './types';

export const useFormSubmission = (
  agreeToBackgroundCheck: boolean,
  availability: string[],
  setApplicationSubmitted: React.Dispatch<React.SetStateAction<boolean>>,
  setApplicationId: React.Dispatch<React.SetStateAction<string>>,
  resetForm: () => void
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  
  const onSubmit = async (data: JoinTeamFormData) => {
    setIsSubmitting(true);
    try {
      console.log('Form data submitted:', data);
      
      const formattedData = {
        ...data,
        hasOwnTransportation: data.hasOwnTransportation ? 'Yes' : 'No',
        hasOwnEquipment: data.hasOwnEquipment ? 'Yes' : 'No',
        hasCleaningCertificates: data.hasCleaningCertificates ? 'Yes' : 'No',
        hasCriminalRecord: !agreeToBackgroundCheck ? 'Yes' : 'No',
        employmentType: availability.filter(item => ['vollzeit', 'midijob', 'minijob'].includes(item)).join(', '),
        workDays: availability.filter(item => !['vollzeit', 'midijob', 'minijob'].includes(item)).join(', ')
      };
      
      console.log('Formatted form data:', formattedData);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setApplicationSubmitted(true);
      setApplicationId(Math.random().toString(36).substring(2, 10));
      
      toast.success('Your application has been submitted successfully!');
      setIsSubmitSuccessful(true);
      resetForm();
    } catch (error) {
      handleApiError(error, 'Failed to submit your application. Please try again.', 'JoinTeamForm', ErrorSeverity.ERROR);
      setIsSubmitSuccessful(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    isSubmitSuccessful,
    onSubmit
  };
};
