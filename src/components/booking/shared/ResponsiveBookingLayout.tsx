import React from 'react';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import { MobileContainer, MobileStack } from '@/components/layout/mobile-container';
import { MobileCard, MobileCardHeader, MobileCardTitle, MobileCardContent } from '@/components/ui/mobile-card';
import { MobileButton } from '@/components/ui/mobile-button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResponsiveBookingLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  currentStep?: number;
  totalSteps?: number;
  onBack?: () => void;
  onNext?: () => void;
  canProceed?: boolean;
  showBackButton?: boolean;
  showNavigation?: boolean;
  nextButtonText?: string;
  className?: string;
}

export const ResponsiveBookingLayout: React.FC<ResponsiveBookingLayoutProps> = ({
  children,
  title,
  subtitle,
  currentStep = 1,
  totalSteps = 1,
  onBack,
  onNext,
  canProceed = true,
  showBackButton = true,
  showNavigation = true,
  nextButtonText,
  className
}) => {
  const { isMobile } = useMobileOptimizations();

  const handleNext = () => {
    if (onNext && canProceed) {
      onNext();
    }
  };

  const getNextButtonText = () => {
    if (nextButtonText) return nextButtonText;
    if (currentStep === totalSteps) return 'Complete';
    return 'Continue';
  };

  return (
    <div className={cn(
      "min-h-screen bg-background",
      isMobile ? "pt-4 pb-24" : "pt-20 pb-24",
      className
    )}>
      <MobileContainer size={isMobile ? 'full' : 'xl'} padding={isMobile}>
        <MobileStack spacing={isMobile ? 'md' : 'lg'}>
          {/* Header */}
          <div className={cn(
            "text-center",
            isMobile ? "px-4 py-2" : "px-6 py-4"
          )}>
            <h1 className={cn(
              "font-bold text-foreground mb-2",
              isMobile ? "text-2xl" : "text-3xl lg:text-4xl"
            )}>
              {title}
            </h1>
            {subtitle && (
              <p className={cn(
                "text-muted-foreground",
                isMobile ? "text-sm" : "text-lg"
              )}>
                {subtitle}
              </p>
            )}
            
            {/* Progress indicator */}
            {totalSteps > 1 && (
              <div className={cn(
                "flex items-center justify-center gap-2 mt-4",
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
                          ? "bg-primary" 
                          : "bg-muted-foreground/30"
                      )}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <MobileCard className={cn(
            "shadow-sm",
            isMobile ? "mx-2" : "mx-0"
          )}>
            <MobileCardContent className={cn(
              isMobile ? "p-4" : "p-6 lg:p-8"
            )}>
              {children}
            </MobileCardContent>
          </MobileCard>

          {/* Navigation */}
          {showNavigation && (
            <div className={cn(
              "flex items-center gap-3",
              isMobile ? "px-4 pb-2" : "px-0 pb-0",
              showBackButton ? "justify-between" : "justify-end"
            )}>
              {showBackButton && onBack && (
                <MobileButton
                  variant="outline"
                  size={isMobile ? "default" : "lg"}
                  onClick={onBack}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </MobileButton>
              )}

              {onNext && (
                <MobileButton
                  size={isMobile ? "default" : "lg"}
                  onClick={handleNext}
                  disabled={!canProceed}
                  className="flex items-center gap-2"
                >
                  {getNextButtonText()}
                  <ArrowRight className="h-4 w-4" />
                </MobileButton>
              )}
            </div>
          )}
        </MobileStack>
      </MobileContainer>
    </div>
  );
};