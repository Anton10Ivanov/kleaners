
import { useState } from "react";
import { useForm, FieldValues, UseFormProps, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

/**
 * Form submission result
 */
interface FormSubmissionResult<T> {
  success: boolean;
  data?: T;
  error?: Error;
}

/**
 * Form management hook configuration
 */
interface UseFormWithValidationConfig<T extends FieldValues> {
  /**
   * Zod schema for form validation
   */
  schema: z.Schema<T>;
  
  /**
   * Default form values
   */
  defaultValues?: UseFormProps<T>['defaultValues'];
  
  /**
   * Function to submit form data
   */
  onSubmit?: (data: T) => Promise<FormSubmissionResult<any>>;
  
  /**
   * Message to display on successful submission
   */
  successMessage?: string;
  
  /**
   * Message to display on submission error
   */
  errorMessage?: string;
}

/**
 * useFormWithValidation hook
 * 
 * A reusable hook for form management with validation and submission handling
 * 
 * @template T - The type of form values
 * @param {UseFormWithValidationConfig<T>} config - Configuration for form management
 * @returns Form management object with methods and state
 */
export function useFormWithValidation<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  successMessage = "Form submitted successfully",
  errorMessage = "There was an error submitting the form"
}: UseFormWithValidationConfig<T>) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Initialize form with react-hook-form and zod validation
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onBlur"
  });

  /**
   * Handles form submission with validation and error handling
   * @param values - Form values to submit
   * @returns Promise resolving after submission is complete
   */
  const handleSubmit = async (values: T) => {
    if (!onSubmit) return;
    
    setFormError(null);
    setIsSubmitting(true);
    
    try {
      const result = await onSubmit(values);
      
      if (result.success) {
        toast({
          title: "Success",
          description: successMessage
        });
        return result.data;
      } else {
        const errorMsg = result.error?.message || errorMessage;
        setFormError(errorMsg);
        toast({
          variant: "destructive",
          title: "Error",
          description: errorMsg
        });
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : errorMessage;
      setFormError(errorMsg);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMsg
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form: form as UseFormReturn<T>,
    isSubmitting,
    formError,
    handleSubmit: form.handleSubmit(handleSubmit),
    reset: form.reset,
    getValues: form.getValues
  };
}
