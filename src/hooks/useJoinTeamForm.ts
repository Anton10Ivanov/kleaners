
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { handleApiError, ErrorSeverity } from '@/utils/errorHandling';
import { toast } from 'sonner';

// Define application steps enum
export enum ApplicationStep {
  PERSONAL_INFO = 0,
  EXPERIENCE = 1,
  DOCUMENTS = 2,
  AGREEMENT = 3,
  CONFIRMATION = 4
}

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
  const [currentStep, setCurrentStep] = useState<ApplicationStep>(ApplicationStep.PERSONAL_INFO);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('cleaner');
  const [experience, setExperience] = useState('0-1');
  const [availability, setAvailability] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [resume, setResume] = useState<File | null>(null);
  const [identificationDoc, setIdentificationDoc] = useState<File | null>(null);
  const [backgroundCheckConsent, setBackgroundCheckConsent] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToBackgroundCheck, setAgreeToBackgroundCheck] = useState(false);
  const [agreeToTraining, setAgreeToTraining] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  
  // Calculate form progress percentage
  const formProgress = ((currentStep + 1) / 5) * 100;
  
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
  
  // Move to next step
  const nextStep = () => {
    if (currentStep < ApplicationStep.CONFIRMATION) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  // Move to previous step
  const prevStep = () => {
    if (currentStep > ApplicationStep.PERSONAL_INFO) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };
  
  // Toggle availability days
  const toggleAvailability = (day: string) => {
    setAvailability(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day) 
        : [...prev, day]
    );
  };
  
  // Toggle skills
  const toggleSkill = (skill: string) => {
    setSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill) 
        : [...prev, skill]
    );
  };

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
      
      // Set application submitted state
      setApplicationSubmitted(true);
      setApplicationId(Math.random().toString(36).substring(2, 10));
      
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
  
  // Handle form submission based on current step
  const handleSubmit = () => {
    if (currentStep === ApplicationStep.CONFIRMATION) {
      // Submit the form on the final step
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
        message,
        agreeToTerms,
      });
    } else {
      // Move to next step
      nextStep();
    }
  };
  
  return {
    form,
    isSubmitting,
    isSubmitSuccessful,
    onSubmit: form.handleSubmit(onSubmit),
    // Add all the new properties
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
    nextStep,
    prevStep,
    handleSubmit,
    handleFileChange,
    toggleAvailability,
    toggleSkill
  };
};
