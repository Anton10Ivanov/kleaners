
import React from 'react';
import { ResponsiveBookingLayout } from '@/components/booking/shared/ResponsiveBookingLayout';
import { ProgressBar } from './ProgressBar';

interface WizardLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  canProceed: boolean;
  showBackButton: boolean;
}

export const WizardLayout: React.FC<WizardLayoutProps> = ({
  children,
  currentStep,
  totalSteps,
  onBack,
  onNext,
  canProceed,
  showBackButton
}) => {
  return (
    <ResponsiveBookingLayout
      title="Get Your Office Cleaning Quote"
      subtitle="Quick 3-step process to get personalized pricing"
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      onNext={onNext}
      canProceed={canProceed}
      showBackButton={showBackButton}
      nextButtonText={currentStep === totalSteps ? 'Get Quote' : 'Continue'}
    >
      {children}
    </ResponsiveBookingLayout>
  );
};
