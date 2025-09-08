
import React from 'react';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const { isMobile } = useMobileOptimizations();

  const handleNext = () => {
    if (canProceed) {
      onNext();
    }
  };

  const getNextButtonText = () => {
    if (currentStep === totalSteps) return 'Get Quote';
    return 'Continue';
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className={cn(
          "font-bold text-foreground mb-3",
          isMobile ? "text-2xl" : "text-3xl lg:text-4xl"
        )}>
          Get Your Office Cleaning Quote
        </h2>
        <p className={cn(
          "text-muted-foreground mb-6",
          isMobile ? "text-sm" : "text-lg"
        )}>
          Quick 3-step process to get personalized pricing
        </p>
        
        {/* Progress indicator */}
        <div className={cn(
          "flex items-center justify-center gap-2",
          isMobile ? "text-sm" : "text-base"
        )}>
          <span className="text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </span>
          <div className="flex gap-1 ml-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  "rounded-full transition-colors",
                  isMobile ? "w-2 h-2" : "w-3 h-3",
                  index < currentStep 
                    ? "bg-orange-500" 
                    : "bg-gray-300 dark:bg-gray-600"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto">
        <Card className="shadow-lg border-0 bg-white dark:bg-gray-800">
          <CardContent className={cn(
            "p-6 lg:p-8",
            isMobile ? "p-4" : "p-6 lg:p-8"
          )}>
            {children}
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className={cn(
        "flex items-center gap-4 mt-8",
        isMobile ? "px-4" : "px-0",
        showBackButton ? "justify-between" : "justify-end"
      )}>
        {showBackButton && (
          <Button
            variant="outline"
            size={isMobile ? "default" : "lg"}
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        )}

        <Button
          size={isMobile ? "default" : "lg"}
          onClick={handleNext}
          disabled={!canProceed}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white"
        >
          {getNextButtonText()}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
