
import { toast } from 'sonner';
import { FieldValues, FieldErrors } from 'react-hook-form';

/**
 * Display form errors as toast notifications
 * @param errors - Form errors object from react-hook-form
 */
export const displayFormErrors = <T extends FieldValues>(errors: FieldErrors<T>) => {
  // Get all error messages
  const errorMessages = Object.values(errors)
    .map(error => error?.message)
    .filter(Boolean);
  
  // Display unique error messages
  [...new Set(errorMessages)].forEach(message => {
    if (typeof message === 'string') {
      toast.error(message);
    }
  });
};

/**
 * Handles API errors in a standardized way
 * @param error - The error object
 * @param fallbackMessage - Optional fallback message if error doesn't have one
 */
export const handleApiError = (error: unknown, fallbackMessage = 'An error occurred. Please try again.') => {
  console.error('API Error:', error);
  
  let errorMessage = fallbackMessage;
  
  if (typeof error === 'object' && error !== null) {
    // Try to extract error message from various common formats
    const anyError = error as any;
    
    if (anyError.message) {
      errorMessage = anyError.message;
    } else if (anyError.error?.message) {
      errorMessage = anyError.error.message;
    } else if (anyError.data?.message) {
      errorMessage = anyError.data.message;
    }
  }
  
  toast.error(errorMessage);
};
