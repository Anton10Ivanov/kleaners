'use client'


import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { logError } from '@/utils/console-cleanup';
import { 
  PersonalInfoFormValues, 
  DocumentsFormValues,
  ExperienceFormValues,
  AgreementFormValues,
  ProviderApplicationFormValues,
  personalInfoSchema,
  documentsSchema,
  experienceSchema,
  agreementSchema,
  providerApplicationSchema
} from '@/schemas/providerApplication';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type ApplicationStep = 'personal' | 'documents' | 'experience' | 'agreement' | 'confirmation';

export const useProviderApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState<ApplicationStep>('personal');
  const [applicationId, setApplicationId] = useState<string | null>(null);
  
  // Form for the whole application
  const mainForm = useForm<ProviderApplicationFormValues>({
    resolver: zodResolver(providerApplicationSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      idDocument: '',
      proofOfAddress: '',
      backgroundCheck: false,
      yearsOfExperience: 0,
      specializations: [],
      certifications: [],
      availability: [],
      termsAccepted: false,
      privacyPolicyAccepted: false
    }
  });
  
  // Step-specific forms for better step validation
  const personalInfoForm = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: ''
    }
  });
  
  const documentsForm = useForm<DocumentsFormValues>({
    resolver: zodResolver(documentsSchema),
    defaultValues: {
      idDocument: '',
      proofOfAddress: '',
      backgroundCheck: false
    }
  });
  
  const experienceForm = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      yearsOfExperience: 0,
      specializations: [],
      certifications: [],
      availability: []
    }
  });
  
  const agreementForm = useForm<AgreementFormValues>({
    resolver: zodResolver(agreementSchema),
    defaultValues: {
      termsAccepted: false,
      privacyPolicyAccepted: false
    }
  });
  
  const nextStep = async () => {
    let isValid = false;
    
    // Validate current step
    switch (currentStep) {
      case 'personal':
        isValid = await personalInfoForm.trigger();
        if (isValid) {
          const { name, email, phone } = personalInfoForm.getValues();
          mainForm.setValue('name', name);
          mainForm.setValue('email', email);
          mainForm.setValue('phone', phone);
          setCurrentStep('documents');
        }
        break;
        
      case 'documents':
        isValid = await documentsForm.trigger();
        if (isValid) {
          const { idDocument, proofOfAddress, backgroundCheck } = documentsForm.getValues();
          mainForm.setValue('idDocument', idDocument);
          mainForm.setValue('proofOfAddress', proofOfAddress);
          mainForm.setValue('backgroundCheck', backgroundCheck);
          setCurrentStep('experience');
        }
        break;
        
      case 'experience':
        isValid = await experienceForm.trigger();
        if (isValid) {
          const { yearsOfExperience, specializations, certifications, availability } = experienceForm.getValues();
          mainForm.setValue('yearsOfExperience', yearsOfExperience);
          mainForm.setValue('specializations', specializations);
          mainForm.setValue('certifications', certifications);
          mainForm.setValue('availability', availability);
          setCurrentStep('agreement');
        }
        break;
        
      case 'agreement':
        isValid = await agreementForm.trigger();
        if (isValid) {
          const { termsAccepted, privacyPolicyAccepted } = agreementForm.getValues();
          mainForm.setValue('termsAccepted', termsAccepted);
          mainForm.setValue('privacyPolicyAccepted', privacyPolicyAccepted);
          await submitApplication();
          setCurrentStep('confirmation');
        }
        break;
        
      default:
        break;
    }
  };
  
  const prevStep = () => {
    switch (currentStep) {
      case 'documents':
        setCurrentStep('personal');
        break;
      case 'experience':
        setCurrentStep('documents');
        break;
      case 'agreement':
        setCurrentStep('experience');
        break;
      case 'confirmation':
        // Usually don't go back from confirmation
        break;
      default:
        break;
    }
  };
  
  const submitApplication = async () => {
    try {
      const formData = mainForm.getValues();
      
      // Submit to database
      const { data, error } = await supabase
        .from('provider_applications')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          documents: {
            idDocument: formData.idDocument,
            proofOfAddress: formData.proofOfAddress,
            backgroundCheck: formData.backgroundCheck
          },
          experience: {
            years: formData.yearsOfExperience,
            specializations: formData.specializations,
            certifications: formData.certifications
          },
          availability: formData.availability,
          status: 'pending',
          agreements: {
            termsAccepted: formData.termsAccepted,
            privacyPolicyAccepted: formData.privacyPolicyAccepted,
            acceptedAt: new Date().toISOString()
          }
        })
        .select()
        .single();
      
      if (error) throw error;
      
      setApplicationId(data.id);
      toast.success('Application submitted successfully!');
      return data.id;
    } catch (error) {
      logError('Error submitting application', error, 'useProviderApplicationForm');
      toast.error('Failed to submit application. Please try again.');
      return null;
    }
  };
  
  return {
    currentStep,
    setCurrentStep,
    nextStep,
    prevStep,
    personalInfoForm,
    documentsForm,
    experienceForm,
    agreementForm,
    mainForm,
    applicationId,
  };
};
