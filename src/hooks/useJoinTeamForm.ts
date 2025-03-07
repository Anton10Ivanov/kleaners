
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { handleApiError, ErrorSeverity } from '@/utils/errorHandling';
import { toast } from 'sonner';

// Define the form schema with Zod
const joinTeamSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  experience: z.enum(['less-than-1', '1-3', '3-5', 'more-than-5']),
  availability: z.enum(['part-time', 'full-time', 'weekends-only']),
  resume: z.any().optional(),
  hasOwnTransportation: z.boolean(),
  hasOwnEquipment: z.boolean(),
  hasCleaningCertificates: z.boolean(),
  message: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

// Infer the type from the schema
type JoinTeamFormData = z.infer<typeof joinTeamSchema>;

export const useJoinTeamForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  
  // Initialize the form
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
      message: '',
      agreeToTerms: false,
    },
  });
  
  // Form submission handler
  const onSubmit = async (data: JoinTeamFormData) => {
    setIsSubmitting(true);
    try {
      console.log('Form data submitted:', data);
      
      // Convert booleans to strings for the log
      const formattedData = {
        ...data,
        hasOwnTransportation: data.hasOwnTransportation ? 'Yes' : 'No',
        hasOwnEquipment: data.hasOwnEquipment ? 'Yes' : 'No',
        hasCleaningCertificates: data.hasCleaningCertificates ? 'Yes' : 'No',
      };
      
      console.log('Formatted form data:', formattedData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      toast.success('Your application has been submitted successfully!');
      setIsSubmitSuccessful(true);
      form.reset();
    } catch (error) {
      handleApiError(error, 'Failed to submit your application. Please try again.', 'JoinTeamForm', ErrorSeverity.ERROR);
      setIsSubmitSuccessful(false);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    form,
    isSubmitting,
    isSubmitSuccessful,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
