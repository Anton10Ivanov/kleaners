
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
 * Display field-specific validation error
 */
export const displayFieldError = (fieldName: string, message: string) => {
  toast.error(`${fieldName}: ${message}`);
};

/**
 * Display success message
 */
export const displaySuccessMessage = (message: string) => {
  toast.success(message);
};

/**
 * Display warning message
 */
export const displayWarningMessage = (message: string) => {
  toast.warning(message);
};
