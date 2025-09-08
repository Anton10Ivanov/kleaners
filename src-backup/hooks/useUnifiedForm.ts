
import { useState, useCallback } from 'react';
import { useForm, UseFormProps, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormSubmissionState, initialSubmissionState } from '@/utils/formValidation';
import { toast } from 'sonner';

interface UseUnifiedFormProps<TSchema extends z.ZodType> extends Omit<UseFormProps<z.infer<TSchema>>, 'resolver'> {
  schema: TSchema;
  onSubmit: (data: z.infer<TSchema>) => Promise<void> | void;
  successMessage?: string;
  errorMessage?: string;
}

interface UseUnifiedFormReturn<TSchema extends z.ZodType> {
  form: UseFormReturn<z.infer<TSchema>>;
  submissionState: FormSubmissionState;
  handleSubmit: () => void;
  resetForm: () => void;
  setFieldError: (field: keyof z.infer<TSchema>, message: string) => void;
}

export function useUnifiedForm<TSchema extends z.ZodType>({
  schema,
  onSubmit,
  successMessage = 'Form submitted successfully!',
  errorMessage = 'An error occurred. Please try again.',
  ...formOptions
}: UseUnifiedFormProps<TSchema>): UseUnifiedFormReturn<TSchema> {
  const [submissionState, setSubmissionState] = useState<FormSubmissionState>(initialSubmissionState);

  const form = useForm<z.infer<TSchema>>({
    ...formOptions,
    resolver: zodResolver(schema),
  });

  const handleSubmit = useCallback(async () => {
    setSubmissionState(prev => ({ ...prev, isSubmitting: true, submitError: null }));

    try {
      const isValid = await form.trigger();
      if (!isValid) {
        setSubmissionState(prev => ({ ...prev, isSubmitting: false }));
        return;
      }

      const data = form.getValues();
      await onSubmit(data);

      setSubmissionState({
        isSubmitting: false,
        hasSubmitted: true,
        submitError: null,
        submitSuccess: true
      });

      toast.success(successMessage);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : errorMessage;
      
      setSubmissionState({
        isSubmitting: false,
        hasSubmitted: true,
        submitError: errorMsg,
        submitSuccess: false
      });

      toast.error(errorMsg);
    }
  }, [form, onSubmit, successMessage, errorMessage]);

  const resetForm = useCallback(() => {
    form.reset();
    setSubmissionState(initialSubmissionState);
  }, [form]);

  const setFieldError = useCallback((field: keyof z.infer<TSchema>, message: string) => {
    form.setError(field as any, { message });
  }, [form]);

  return {
    form,
    submissionState,
    handleSubmit,
    resetForm,
    setFieldError
  };
}
