
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { boolToString } from '@/utils/errorHandling';

// Define verification process steps
export enum ApplicationStep {
  PERSONAL_INFO = 0,
  EXPERIENCE = 1,
  DOCUMENTS = 2,
  AGREEMENT = 3,
  CONFIRMATION = 4
}

export const useJoinTeamForm = () => {
  const [currentStep, setCurrentStep] = useState<ApplicationStep>(ApplicationStep.PERSONAL_INFO);
  const [formProgress, setFormProgress] = useState(20);
  
  // Personal info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // Experience
  const [position, setPosition] = useState('');
  const [experience, setExperience] = useState('');
  const [availability, setAvailability] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  
  // Documents
  const [resume, setResume] = useState<File | null>(null);
  const [identificationDoc, setIdentificationDoc] = useState<File | null>(null);
  const [backgroundCheckConsent, setBackgroundCheckConsent] = useState<File | null>(null);
  
  // Agreement
  const [message, setMessage] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToBackgroundCheck, setAgreeToBackgroundCheck] = useState(false);
  const [agreeToTraining, setAgreeToTraining] = useState(false);
  
  // Processing state
  const [isLoading, setIsLoading] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const nextStep = () => {
    if (currentStep < ApplicationStep.CONFIRMATION) {
      setCurrentStep(prev => prev + 1);
      setFormProgress((prev) => Math.min(prev + 20, 100));
    }
  };

  const prevStep = () => {
    if (currentStep > ApplicationStep.PERSONAL_INFO) {
      setCurrentStep(prev => prev - 1);
      setFormProgress((prev) => Math.max(prev - 20, 20));
    }
  };

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case ApplicationStep.PERSONAL_INFO:
        if (!name || !email || !phone) {
          toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please fill all the required personal information fields.",
          });
          return false;
        }
        return true;
        
      case ApplicationStep.EXPERIENCE:
        if (!position || !experience || availability.length === 0) {
          toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please provide information about your experience and availability.",
          });
          return false;
        }
        return true;
        
      case ApplicationStep.DOCUMENTS:
        if (!resume) {
          toast({
            variant: "destructive",
            title: "Document Required",
            description: "A resume/CV is required to proceed.",
          });
          return false;
        }
        return true;
        
      case ApplicationStep.AGREEMENT:
        if (!agreeToTerms || !agreeToBackgroundCheck) {
          toast({
            variant: "destructive",
            title: "Agreement Required",
            description: "You must agree to the terms and background check to proceed.",
          });
          return false;
        }
        return true;
        
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;
    
    if (currentStep < ApplicationStep.CONFIRMATION) {
      nextStep();
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Create provider application record
      const { data, error } = await supabase
        .from('provider_applications')
        .insert({
          full_name: name,
          email: email,
          phone: phone,
          position: position,
          experience_level: experience,
          availability: availability,
          skills: skills,
          message: message,
          background_check_consent: boolToString(agreeToBackgroundCheck),
          terms_agreement: boolToString(agreeToTerms),
          training_agreement: boolToString(agreeToTraining),
          application_status: 'pending_review',
          verification_status: 'not_started'
        })
        .select('id')
        .single();
      
      if (error) throw error;
      
      const applicationId = data?.id;
      setApplicationId(applicationId);

      // Handle document uploads if provided
      const uploadPromises = [];
      
      if (resume && applicationId) {
        const fileExt = resume.name.split('.').pop();
        const resumePath = `provider_applications/${applicationId}/resume_${Date.now()}.${fileExt}`;
        
        uploadPromises.push(
          supabase.storage
            .from('applications')
            .upload(resumePath, resume)
            .then(async (result) => {
              if (result.error) throw result.error;
              
              // Update the record with the resume path
              return supabase
                .from('provider_applications')
                .update({ resume_path: resumePath })
                .eq('id', applicationId);
            })
        );
      }
      
      if (identificationDoc && applicationId) {
        const fileExt = identificationDoc.name.split('.').pop();
        const idPath = `provider_applications/${applicationId}/id_${Date.now()}.${fileExt}`;
        
        uploadPromises.push(
          supabase.storage
            .from('applications')
            .upload(idPath, identificationDoc)
            .then(async (result) => {
              if (result.error) throw result.error;
              
              // Update the record with the ID path
              return supabase
                .from('provider_applications')
                .update({ identification_path: idPath })
                .eq('id', applicationId);
            })
        );
      }
      
      if (backgroundCheckConsent && applicationId) {
        const fileExt = backgroundCheckConsent.name.split('.').pop();
        const consentPath = `provider_applications/${applicationId}/consent_${Date.now()}.${fileExt}`;
        
        uploadPromises.push(
          supabase.storage
            .from('applications')
            .upload(consentPath, backgroundCheckConsent)
            .then(async (result) => {
              if (result.error) throw result.error;
              
              // Update the record with the consent path
              return supabase
                .from('provider_applications')
                .update({ consent_form_path: consentPath })
                .eq('id', applicationId);
            })
        );
      }
      
      // Wait for all uploads to complete
      await Promise.all(uploadPromises);
      
      // Application successfully submitted
      setApplicationSubmitted(true);
      
      toast({
        title: "Application Submitted",
        description: "We'll review your application and get back to you soon!",
      });
      
      // Set up temporary provider account
      setTimeout(() => {
        // Redirect to provider signup page with email prefilled
        navigate(`/auth/signup?type=provider&email=${encodeURIComponent(email)}&applicationId=${applicationId}`);
      }, 3000);
    } catch (error) {
      console.error('Application submission error:', error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "There was a problem submitting your application. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const toggleAvailability = (value: string) => {
    setAvailability(current => 
      current.includes(value)
        ? current.filter(day => day !== value)
        : [...current, value]
    );
  };

  const toggleSkill = (value: string) => {
    setSkills(current => 
      current.includes(value)
        ? current.filter(skillItem => skillItem !== value)
        : [...current, value]
    );
  };

  return {
    // States
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
    isLoading,
    applicationSubmitted,
    applicationId,
    
    // State setters
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
    setIdentificationDoc,
    setBackgroundCheckConsent,
    
    // Methods
    nextStep,
    prevStep,
    handleSubmit,
    handleFileChange,
    toggleAvailability,
    toggleSkill,
  };
};
