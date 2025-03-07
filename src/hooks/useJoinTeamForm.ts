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
  hasCriminalRecord: z.boolean().default(false),
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
  const [backgroundCheckConsent, setBackgroundCheckConsent] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToBackgroundCheck, setAgreeToBackgroundCheck] = useState(false);
  const [agreeToTraining, setAgreeToTraining] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  
  const formProgress = ((currentStep + 1) / 5) * 100;
  
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
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };
  
  const toggleAvailability = (day: string) => {
    setAvailability(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day) 
        : [...prev, day]
    );
  };
  
  const toggleSkill = (skill: string) => {
    setSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill) 
        : [...prev, skill]
    );
  };

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
      form.reset();
    } catch (error) {
      handleApiError(error, 'Failed to submit your application. Please try again.', 'JoinTeamForm', ErrorSeverity.ERROR);
      setIsSubmitSuccessful(false);
    } finally {
      setIsSubmitting(false);
    }
  };
  
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
    nextStep,
    prevStep,
    handleSubmit,
    handleFileChange,
    toggleAvailability,
    toggleSkill
  };
};
