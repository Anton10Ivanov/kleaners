
import { useState, useCallback } from 'react';
import { handleError } from './errorHandling';
import { logger } from './logging';

interface FormSubmissionOptions<T> {
  /**
   * The function to call when the form is submitted
   */
  onSubmit: (data: T) => Promise<any>;
  
  /**
   * A callback to run before submitting the form
   */
  onBeforeSubmit?: (data: T) => T | Promise<T>;
  
  /**
   * A callback to run after the form is submitted successfully
   */
  onSuccess?: (result: any, data: T) => void;
  
  /**
   * A callback to run when the form submission fails
   */
  onError?: (error: unknown, data: T) => void;
  
  /**
   * The component name for logging purposes
   */
  component?: string;
  
  /**
   * Whether to show a toast notification on success
   */
  showSuccessToast?: boolean;
  
  /**
   * Whether to show a toast notification on error
   */
  showErrorToast?: boolean;
  
  /**
   * The success message to show in the toast
   */
  successMessage?: string;
  
  /**
   * The error message to show in the toast
   */
  errorMessage?: string;
}

/**
 * A hook for handling form submissions with loading state and error handling
 */
export function useFormSubmission<T>({
  onSubmit,
  onBeforeSubmit,
  onSuccess,
  onError,
  component,
  showSuccessToast = true,
  showErrorToast = true,
  successMessage = 'Form submitted successfully',
  errorMessage = 'There was an error submitting the form'
}: FormSubmissionOptions<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<unknown>(null);
  
  const handleSubmit = useCallback(
    async (data: T) => {
      try {
        setIsSubmitting(true);
        setError(null);
        
        // Process data before submission if needed
        let processedData = data;
        if (onBeforeSubmit) {
          processedData = await onBeforeSubmit(data);
        }
        
        // Log the submission attempt
        logger.info('Form submission started', { component });
        
        // Submit the form
        const result = await onSubmit(processedData);
        
        // Handle success
        setIsSuccess(true);
        
        // Log the successful submission
        logger.info('Form submission successful', { component });
        
        // Call the success callback
        if (onSuccess) {
          onSuccess(result, processedData);
        }
        
        return result;
      } catch (err) {
        // Handle error
        setError(err);
        
        // Log the error
        handleError(
          err,
          errorMessage,
          showErrorToast,
          { component }
        );
        
        // Call the error callback
        if (onError) {
          onError(err, data);
        }
        
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      onBeforeSubmit,
      onSubmit,
      onSuccess,
      onError,
      component,
      showErrorToast,
      errorMessage
    ]
  );
  
  const reset = useCallback(() => {
    setIsSubmitting(false);
    setIsSuccess(false);
    setError(null);
  }, []);
  
  return {
    handleSubmit,
    isSubmitting,
    isSuccess,
    error,
    reset
  };
}

/**
 * Creates a debounced function that delays invoking the provided function
 * until after the specified wait time has elapsed since the last time it was invoked.
 * @param func The function to debounce
 * @param wait The number of milliseconds to delay
 * @returns A debounced version of the provided function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return function(this: any, ...args: Parameters<T>) {
    const context = this;
    
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      func.apply(context, args);
      timeoutId = null;
    }, wait);
  };
}

/**
 * Creates a throttled function that only invokes the provided function
 * at most once per every wait milliseconds.
 * @param func The function to throttle
 * @param wait The number of milliseconds to throttle invocations to
 * @returns A throttled version of the provided function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return function(this: any, ...args: Parameters<T>) {
    const context = this;
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;
    
    if (timeSinceLastCall >= wait) {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      
      lastCall = now;
      func.apply(context, args);
    } else if (timeoutId === null) {
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        timeoutId = null;
        func.apply(context, args);
      }, wait - timeSinceLastCall);
    }
  };
}
