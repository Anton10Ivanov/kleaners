
import React from 'react';
import { ExclamationTriangleIcon, CheckCircledIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

interface ValidationMessageProps {
  /**
   * Whether the field is in an error state
   */
  isError?: boolean;
  
  /**
   * Whether the field is in a success state
   */
  isSuccess?: boolean;
  
  /**
   * The message to display
   */
  message?: string;
  
  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * ValidationMessage component to display form validation messages
 * Supports both error and success states
 */
export const ValidationMessage: React.FC<ValidationMessageProps> = ({
  isError,
  isSuccess,
  message,
  className,
}) => {
  if (!message) return null;
  
  const isActive = isError || isSuccess;
  if (!isActive) return null;
  
  return (
    <div 
      className={cn(
        "flex items-center text-sm mt-1",
        isError ? "text-destructive" : "",
        isSuccess ? "text-green-600" : "",
        className
      )}
    >
      {isError && (
        <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
      )}
      {isSuccess && (
        <CheckCircledIcon className="h-4 w-4 mr-1" />
      )}
      <span>{message}</span>
    </div>
  );
};

interface FormValidationWrapperProps {
  /**
   * Whether the field is in an error state
   */
  isError?: boolean;
  
  /**
   * Whether the field is in a success state
   */
  isSuccess?: boolean;
  
  /**
   * The validation message
   */
  message?: string;
  
  /**
   * The form field to wrap
   */
  children: React.ReactNode;
  
  /**
   * Additional CSS class names for the wrapper
   */
  className?: string;
  
  /**
   * Additional CSS class names for the message
   */
  messageClassName?: string;
}

/**
 * FormValidationWrapper component for wrapping form fields with validation
 * Handles both error and success states and provides visual feedback
 */
export const FormValidationWrapper: React.FC<FormValidationWrapperProps> = ({
  isError,
  isSuccess,
  message,
  children,
  className,
  messageClassName,
}) => {
  return (
    <div className={cn("relative", className)}>
      {children}
      <ValidationMessage 
        isError={isError} 
        isSuccess={isSuccess} 
        message={message}
        className={messageClassName}
      />
    </div>
  );
};

/**
 * Form validation hook that can be used for field-level validation
 * @param initialValue The initial value of the field
 * @param validator A function that validates the value and returns an error message or undefined
 * @returns An object containing the field value, error message, and handlers
 */
export function useFieldValidation<T>(
  initialValue: T,
  validator?: (value: T) => string | undefined
) {
  const [value, setValue] = React.useState<T>(initialValue);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [touched, setTouched] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  
  const validate = React.useCallback((valueToValidate: T) => {
    if (!validator) return undefined;
    const result = validator(valueToValidate);
    setError(result);
    setSuccess(!result);
    return result;
  }, [validator]);
  
  const handleChange = React.useCallback((newValue: T) => {
    setValue(newValue);
    if (touched) {
      validate(newValue);
    }
  }, [touched, validate]);
  
  const handleBlur = React.useCallback(() => {
    setTouched(true);
    validate(value);
  }, [validate, value]);
  
  return {
    value,
    error,
    success,
    touched,
    setValue: handleChange,
    setError,
    setTouched,
    handleBlur,
    validate: () => validate(value),
    reset: () => {
      setValue(initialValue);
      setError(undefined);
      setTouched(false);
      setSuccess(false);
    }
  };
}

/**
 * A hook for validating form data
 * @param initialValues The initial values for the form
 * @param validators An object with validators for each field
 * @returns An object with form state and validation methods
 */
export function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  validators?: Partial<Record<keyof T, (value: any) => string | undefined>>
) {
  const [values, setValues] = React.useState<T>(initialValues);
  const [errors, setErrors] = React.useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = React.useState<Partial<Record<keyof T, boolean>>>({});
  const [success, setSuccess] = React.useState<Partial<Record<keyof T, boolean>>>({});
  
  const validateField = React.useCallback(
    (name: keyof T, value: any) => {
      if (!validators || !validators[name]) return undefined;
      
      const fieldError = validators[name]!(value);
      
      setErrors(prev => ({
        ...prev,
        [name]: fieldError
      }));
      
      setSuccess(prev => ({
        ...prev,
        [name]: !fieldError
      }));
      
      return fieldError;
    },
    [validators]
  );
  
  const handleChange = React.useCallback(
    (name: keyof T, value: any) => {
      setValues(prev => ({
        ...prev,
        [name]: value
      }));
      
      if (touched[name]) {
        validateField(name, value);
      }
    },
    [touched, validateField]
  );
  
  const handleBlur = React.useCallback(
    (name: keyof T) => {
      setTouched(prev => ({
        ...prev,
        [name]: true
      }));
      
      validateField(name, values[name]);
    },
    [validateField, values]
  );
  
  const validateForm = React.useCallback(() => {
    if (!validators) return true;
    
    const newErrors: Partial<Record<keyof T, string>> = {};
    const newSuccess: Partial<Record<keyof T, boolean>> = {};
    let isValid = true;
    
    Object.keys(validators).forEach((key) => {
      const name = key as keyof T;
      const error = validators[name]!(values[name]);
      
      if (error) {
        newErrors[name] = error;
        newSuccess[name] = false;
        isValid = false;
      } else {
        newSuccess[name] = true;
      }
    });
    
    setErrors(newErrors);
    setSuccess(newSuccess);
    setTouched(
      Object.keys(validators).reduce((acc, key) => {
        acc[key as keyof T] = true;
        return acc;
      }, {} as Partial<Record<keyof T, boolean>>)
    );
    
    return isValid;
  }, [validators, values]);
  
  return {
    values,
    errors,
    touched,
    success,
    setValues,
    setValue: handleChange,
    setError: (name: keyof T, error: string) => 
      setErrors(prev => ({ ...prev, [name]: error })),
    handleBlur,
    validate: validateForm,
    reset: () => {
      setValues(initialValues);
      setErrors({});
      setTouched({});
      setSuccess({});
    },
    isValid: Object.keys(errors).length === 0
  };
}

/**
 * Common validators for form fields
 */
export const validators = {
  /**
   * Validates that a field is not empty
   */
  required: (message = 'This field is required') => 
    (value: any) => {
      if (value === undefined || value === null || value === '') {
        return message;
      }
      return undefined;
    },
  
  /**
   * Validates that a field has a minimum length
   */
  minLength: (length: number, message = `Must be at least ${length} characters`) => 
    (value: string) => {
      if (!value || value.length < length) {
        return message;
      }
      return undefined;
    },
  
  /**
   * Validates that a field has a maximum length
   */
  maxLength: (length: number, message = `Must be at most ${length} characters`) => 
    (value: string) => {
      if (value && value.length > length) {
        return message;
      }
      return undefined;
    },
  
  /**
   * Validates that a field is a valid email address
   */
  email: (message = 'Please enter a valid email address') => 
    (value: string) => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!value || !emailRegex.test(value)) {
        return message;
      }
      return undefined;
    },
  
  /**
   * Validates that a field matches a pattern
   */
  pattern: (regex: RegExp, message = 'Please enter a valid value') => 
    (value: string) => {
      if (!value || !regex.test(value)) {
        return message;
      }
      return undefined;
    },
    
  /**
   * Combines multiple validators
   */
  compose: (...validators: ((value: any) => string | undefined)[]) => 
    (value: any) => {
      for (const validator of validators) {
        const error = validator(value);
        if (error) {
          return error;
        }
      }
      return undefined;
    }
};
