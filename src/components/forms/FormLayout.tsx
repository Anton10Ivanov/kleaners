
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { FormSubmissionState } from '@/utils/formValidation';
import { cn } from '@/lib/utils';

interface FormLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  submissionState: FormSubmissionState;
  submitButtonText?: string;
  showCard?: boolean;
  className?: string;
  footerContent?: React.ReactNode;
}

const FormLayout = ({
  title,
  description,
  children,
  onSubmit,
  submissionState,
  submitButtonText = 'Submit',
  showCard = true,
  className,
  footerContent
}: FormLayoutProps) => {
  const formContent = (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        {children}
      </div>

      {submissionState.submitError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
        >
          {submissionState.submitError}
        </motion.div>
      )}

      <div className="flex flex-col gap-4">
        <Button
          type="submit"
          disabled={submissionState.isSubmitting}
          className="w-full h-12 text-base font-medium"
        >
          {submissionState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            submitButtonText
          )}
        </Button>

        {footerContent}
      </div>
    </form>
  );

  if (!showCard) {
    return (
      <div className={cn("w-full max-w-md mx-auto", className)}>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
          {description && (
            <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
          )}
        </div>
        {formContent}
      </div>
    );
  }

  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        {description && (
          <p className="text-gray-600 dark:text-gray-400">{description}</p>
        )}
      </CardHeader>
      <CardContent>
        {formContent}
      </CardContent>
    </Card>
  );
};

export default FormLayout;
