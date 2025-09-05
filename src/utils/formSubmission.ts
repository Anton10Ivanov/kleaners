
import { toast } from 'sonner';
import { logError, logInfo } from './console-cleanup';

/**
 * Handles form submission errors and displays appropriate messages
 * @param error - The error object
 * @param fallbackMessage - Optional fallback message if error doesn't have one
 * @param showToast - Whether to show a toast notification
 */
export const handleFormSubmissionError = (
  error: unknown, 
  fallbackMessage = 'An error occurred while submitting the form. Please try again.',
  showToast = true
) => {
  logError('Form submission error', error, 'formSubmission');
  
  let errorMessage = fallbackMessage;
  
  if (typeof error === 'object' && error !== null) {
    const anyError = error as any;
    
    if (anyError.message) {
      errorMessage = anyError.message;
    } else if (anyError.error?.message) {
      errorMessage = anyError.error.message;
    }
  }
  
  if (showToast) {
    toast.error(errorMessage);
  }
  
  return errorMessage;
};

/**
 * Validates form data before submission
 * @param data - The form data to validate
 * @param requiredFields - Array of field names that are required
 * @returns Object with isValid flag and any error messages
 */
export const validateFormData = (data: Record<string, any>, requiredFields: string[]) => {
  const errors: Record<string, string> = {};
  
  for (const field of requiredFields) {
    const value = data[field];
    
    if (value === undefined || value === null || value === '') {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Formats form data for API submission
 * @param data - The raw form data
 * @param fieldMappings - Optional mappings from form field names to API field names
 * @returns Formatted data ready for API submission
 */
export const formatFormDataForSubmission = (
  data: Record<string, any>,
  fieldMappings?: Record<string, string>
) => {
  const formattedData: Record<string, any> = {};
  
  // Apply field mappings if provided
  if (fieldMappings) {
    Object.entries(data).forEach(([key, value]) => {
      const apiFieldName = fieldMappings[key] || key;
      formattedData[apiFieldName] = value;
    });
  } else {
    // Convert camelCase to snake_case for API
    Object.entries(data).forEach(([key, value]) => {
      const snakeCaseKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      formattedData[snakeCaseKey] = value;
    });
  }
  
  return formattedData;
};

/**
 * Handles successful form submission
 * @param response - The API response data
 * @param successMessage - Optional success message to display
 * @param showToast - Whether to show a toast notification
 */
export const handleFormSubmissionSuccess = (
  response: any,
  successMessage = 'Form submitted successfully!',
  showToast: string | boolean = true
) => {
  // Convert boolean to string if needed
  const shouldShowToast = ensureStringParameter(showToast);
  
  if (shouldShowToast === 'true') {
    toast.success(successMessage);
  }
  
  return {
    success: true,
    data: response
  };
};

// Helper function to ensure the showToast parameter is a string
export const ensureStringParameter = (value: boolean | string): string => {
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }
  return value;
};

/**
 * Utility to track form submission analytics
 * @param formName - Name of the form being submitted
 * @param success - Whether submission was successful
 * @param metadata - Additional metadata about the submission
 */
export const trackFormSubmission = (
  formName: string,
  success: boolean,
  metadata?: Record<string, any>
) => {
  // In a real app, this would send data to an analytics service
  if (import.meta.env.DEV) {
    logInfo('Form submission analytics', { 
      formName, 
      success,
      timestamp: new Date().toISOString(),
      ...metadata
    }, 'formSubmission');
  }
  
  // Placeholder for actual analytics implementation
  // analytics.track('form_submission', { formName, success, ...metadata });
};
