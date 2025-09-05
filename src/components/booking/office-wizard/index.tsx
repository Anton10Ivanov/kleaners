import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WizardLayout } from './shared/WizardLayout';
import { needsConsultation, getAvailablePackages } from './utils/questionnaire-logic';
import { OfficeTypeStep } from './steps/OfficeTypeStep';
import { TrafficStep } from './steps/TrafficStep';
import { FrequencyStep } from './steps/FrequencyStep';
import { QuoteDisplay } from './quote/QuoteDisplay';
import { ConsultationCTA } from './quote/ConsultationCTA';

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

  const updateAnswers = (key: keyof WizardAnswers, value: any) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    
    // Auto-transition for steps 1 and 2
    if ((key === 'officeType' && currentStep === 1) || 
        (key === 'traffic' && currentStep === 2)) {
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