'use client'

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Loader2, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Form } from '@/components/ui/form';
import { FormValidationStatus } from './StandardizedFormField';

export interface FormStep {
  id: string;
  title: string;
  description?: string;
  isCompleted?: boolean;
  isOptional?: boolean;
}

export interface StandardizedFormLayoutProps<T extends Record<string, any>> {
  form: UseFormReturn<T>;
  title: string;
  description?: string;
  steps?: FormStep[];
  currentStep?: number;
  totalSteps?: number;
  children: React.ReactNode;
  onSubmit: (data: T) => void | Promise<void>;
  onBack?: () => void;
  onNext?: () => void;
  submitButtonText?: string;
  backButtonText?: string;
  nextButtonText?: string;
  showProgress?: boolean;
  showCard?: boolean;
  className?: string;
  isLoading?: boolean;
  isValid?: boolean;
  validationMessage?: string;
  validationType?: 'success' | 'error' | 'warning' | 'info';
  footerContent?: React.ReactNode;
  headerContent?: React.ReactNode;
}

export function StandardizedFormLayout<T extends Record<string, any>>({
  form,
  title,
  description,
  steps = [],
  currentStep = 1,
  totalSteps = 1,
  children,
  onSubmit,
  onBack,
  onNext,
  submitButtonText = 'Submit',
  backButtonText = 'Back',
  nextButtonText = 'Next',
  showProgress = true,
  showCard = true,
  className,
  isLoading = false,
  isValid = true,
  validationMessage,
  validationType = 'success',
  footerContent,
  headerContent
}: StandardizedFormLayoutProps<T>) {
  const progress = totalSteps > 1 ? (currentStep / totalSteps) * 100 : 100;
  const isLastStep = currentStep >= totalSteps;
  const canGoBack = onBack && currentStep > 1;
  const canGoNext = onNext && !isLastStep;

  const formContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header Content */}
      {headerContent}

      {/* Progress Indicator */}
      {showProgress && totalSteps > 1 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          
          {/* Step Indicators */}
          {steps.length > 0 && (
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors",
                    index + 1 < currentStep && "bg-green-500 text-white",
                    index + 1 === currentStep && "bg-primary text-primary-foreground",
                    index + 1 > currentStep && "bg-muted text-muted-foreground"
                  )}>
                    {index + 1 < currentStep ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="ml-2 hidden sm:block">
                    <div className={cn(
                      "text-sm font-medium",
                      index + 1 <= currentStep ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {step.title}
                    </div>
                    {step.description && (
                      <div className="text-xs text-muted-foreground">
                        {step.description}
                      </div>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden sm:block w-8 h-px bg-border mx-4" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Form Content */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="form-spacing-relaxed">
            {children}
          </div>

        {/* Validation Status */}
        {validationMessage && (
          <FormValidationStatus
            isValid={isValid}
            message={validationMessage}
            type={validationType}
          />
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
          {canGoBack && (
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {backButtonText}
            </Button>
          )}

          <div className="flex-1" />

          {canGoNext ? (
            <Button
              type="button"
              onClick={onNext}
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {nextButtonText}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isLoading || !isValid}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                submitButtonText
              )}
            </Button>
          )}
        </div>

        {/* Footer Content */}
        {footerContent}
        </form>
      </Form>
    </motion.div>
  );

  if (!showCard) {
    return (
      <div className={cn("w-full max-w-4xl mx-auto", className)}>
        <div className="text-center mb-8">
          <h1 className="text-display">{title}</h1>
          {description && (
            <p className="text-body mt-4 max-w-2xl mx-auto">{description}</p>
          )}
        </div>
        {formContent}
      </div>
    );
  }

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-display">{title}</CardTitle>
          {description && (
            <p className="text-body mt-4">{description}</p>
          )}
        </CardHeader>
        <CardContent className="card-spacing-lg">
          {formContent}
        </CardContent>
      </Card>
    </div>
  );
}

// Form field group component for organizing related fields
export interface FormFieldGroupProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
}

export function FormFieldGroup({ 
  title, 
  description, 
  children, 
  className,
  columns = 1
}: FormFieldGroupProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className={cn("form-spacing-loose", className)}>
      <div className="mb-6">
        <h3 className="text-heading">{title}</h3>
        {description && (
          <p className="text-caption mt-1">{description}</p>
        )}
      </div>
      
      <div className={cn("grid gap-6", gridCols[columns])}>
        {children}
      </div>
    </div>
  );
}

// Form section divider
export function FormSectionDivider({ 
  title, 
  className 
}: { 
  title?: string; 
  className?: string; 
}) {
  return (
    <div className={cn("relative my-8", className)}>
      {title && (
        <>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-4 text-muted-foreground font-medium">
              {title}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default StandardizedFormLayout;
