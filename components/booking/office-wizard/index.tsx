'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WizardLayout } from './shared/WizardLayout';
import { needsConsultation, getAvailablePackages } from './utils/questionnaire-logic';
import { OfficeTypeStep } from './steps/OfficeTypeStep';
import { TrafficStep } from './steps/TrafficStep';
import { FrequencyStep } from './steps/FrequencyStep';
import { QuoteDisplay } from './quote/QuoteDisplay';
import { ConsultationCTA } from './quote/ConsultationCTA';
import { enhancedFormPersistence, FormAutoSave } from '@/utils/enhancedFormPersistence';
import { useToast } from '@/hooks/use-toast';

export interface WizardAnswers {
  officeType?: {
    id: string;
    label: string;
    sqft: number;
    employees: number;
    description: string;
    icon: React.ReactNode;
  };
  traffic?: {
    id: string;
    label: string;
    multiplier: number;
    description: string;
    visitors: string;
    icon: React.ReactNode;
  };
  frequency?: number;
}

export const PricingWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<WizardAnswers>({});
  const [autoSave, setAutoSave] = useState<{
    saveData: (data: any) => void;
    loadData: () => any;
    clearData: () => void;
    cleanup: () => void;
  } | null>(null);
  const { toast } = useToast();

  // Initialize form persistence
  useEffect(() => {
    const formType = 'office-booking-wizard';
    
    // Load saved data
    const savedData = enhancedFormPersistence.load(formType);
    if (savedData && Object.keys(savedData).length > 0) {
      setAnswers(savedData);
      toast({
        title: "Progress Restored",
        description: "We found your previous progress and restored it.",
      });
    }
    
    // Set up auto-save
    const autoSaveInstance = {
      saveData: (data: any) => {
        const success = enhancedFormPersistence.save(data, formType);
        if (!success) {
          toast({
            variant: "destructive",
            title: "Auto-save failed",
            description: "Your progress couldn't be saved automatically. Please complete the form soon.",
          });
        }
      },
      loadData: () => enhancedFormPersistence.load(formType),
      clearData: () => enhancedFormPersistence.clear(formType),
      cleanup: () => {} // No cleanup needed for this simple implementation
    };
    
    setAutoSave(autoSaveInstance);
  }, [toast]);

  const updateAnswers = (key: keyof WizardAnswers, value: any) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);
    
    // Auto-save progress
    if (autoSave) {
      autoSave.saveData(newAnswers);
    }
    
    // Auto-transition for steps 1, 2, and 3
    if ((key === 'officeType' && currentStep === 1) || 
        (key === 'traffic' && currentStep === 2) ||
        (key === 'frequency' && currentStep === 3)) {
      setTimeout(() => {
        handleNext();
      }, 300); // Small delay for visual feedback
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (showResults) {
      setShowResults(false);
    } else if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const clearProgress = () => {
    setAnswers({});
    setCurrentStep(1);
    setShowResults(false);
    if (autoSave) {
      autoSave.clearData();
    }
    toast({
      title: "Progress Cleared",
      description: "Your form has been reset to start fresh.",
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return !!answers.officeType;
      case 2: return !!answers.traffic;
      case 3: return !!answers.frequency;
      default: return false;
    }
  };

  const requiresConsultation = needsConsultation(answers);
  const availablePackages = getAvailablePackages(answers);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <OfficeTypeStep
            selected={answers.officeType}
            onSelect={(officeType) => updateAnswers('officeType', officeType)}
          />
        );
      case 2:
        return (
          <TrafficStep
            selected={answers.traffic}
            onSelect={(traffic) => updateAnswers('traffic', traffic)}
            officeType={answers.officeType?.id}
          />
        );
      case 3:
        return (
          <FrequencyStep
            selected={answers.frequency}
            onSelect={(frequency) => updateAnswers('frequency', frequency)}
            officeSize={answers.officeType?.id}
            traffic={answers.traffic?.id}
          />
        );
      default:
        return null;
    }
  };

  if (showResults) {
    if (requiresConsultation) {
      return <ConsultationCTA answers={answers} onBack={handleBack} />;
    }
    
    return <QuoteDisplay answers={answers} onBack={handleBack} availablePackages={availablePackages} />;
  }

  return (
    <WizardLayout
      currentStep={currentStep}
      totalSteps={3}
      onNext={handleNext}
      onBack={handleBack}
      canProceed={canProceed()}
      showBackButton={currentStep > 1}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </WizardLayout>
  );
};