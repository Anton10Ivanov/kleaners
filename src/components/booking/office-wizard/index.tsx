
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WizardLayout } from './shared/WizardLayout';
import { OfficeTypeStep } from './steps/OfficeTypeStep';
import { TrafficStep } from './steps/TrafficStep';
import { FrequencyStep } from './steps/FrequencyStep';
import { ContractStep } from './steps/ContractStep';
import { QuoteDisplay } from './quote/QuoteDisplay';
import { ConsultationCTA } from './quote/ConsultationCTA';
import { generateQuote, needsConsultation } from './utils/questionnaire-logic';

export interface WizardAnswers {
  officeType?: {
    id: string;
    label: string;
    sqft: number;
    employees: number;
  };
  traffic?: {
    id: string;
    label: string;
    multiplier: number;
  };
  frequency?: number;
  contract?: 'monthly' | 'sixMonth' | 'annual';
}

export const PricingWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<WizardAnswers>({});
  const [showResults, setShowResults] = useState(false);

  const updateAnswers = useCallback((key: keyof WizardAnswers, value: any) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  }, [currentStep]);

  const handleBack = useCallback(() => {
    if (showResults) {
      setShowResults(false);
    } else if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep, showResults]);

  const canProceed = useCallback(() => {
    switch (currentStep) {
      case 1: return !!answers.officeType;
      case 2: return !!answers.traffic;
      case 3: return typeof answers.frequency === 'number';
      case 4: return !!answers.contract;
      default: return false;
    }
  }, [currentStep, answers]);

  // Check if consultation is needed
  const requiresConsultation = needsConsultation(answers);
  const quote = !requiresConsultation ? generateQuote(answers) : null;

  const stepVariants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <OfficeTypeStep
            selected={answers.officeType}
            onSelect={(value) => updateAnswers('officeType', value)}
          />
        );
      case 2:
        return (
          <TrafficStep
            selected={answers.traffic}
            onSelect={(value) => updateAnswers('traffic', value)}
          />
        );
      case 3:
        return (
          <FrequencyStep
            selected={answers.frequency}
            onSelect={(value) => updateAnswers('frequency', value)}
            officeSize={answers.officeType?.id}
          />
        );
      case 4:
        return (
          <ContractStep
            selected={answers.contract}
            onSelect={(value) => updateAnswers('contract', value)}
            previewQuote={quote}
          />
        );
      default:
        return null;
    }
  };

  if (showResults) {
    return requiresConsultation ? (
      <ConsultationCTA answers={answers} onBack={handleBack} />
    ) : (
      <QuoteDisplay quote={quote!} answers={answers} onBack={handleBack} />
    );
  }

  return (
    <WizardLayout
      currentStep={currentStep}
      totalSteps={4}
      onBack={handleBack}
      onNext={handleNext}
      canProceed={canProceed()}
      showBackButton={currentStep > 1}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          variants={stepVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </WizardLayout>
  );
};
