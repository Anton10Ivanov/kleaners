
import { z } from 'zod';

// Common validation patterns
export const validationPatterns = {
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number'),
  postalCode: z.string().regex(/^\d{4,6}$/, 'Please enter a valid postal code'),
  required: (fieldName: string) => z.string().min(1, `${fieldName} is required`),
  minLength: (length: number, fieldName: string) => 
    z.string().min(length, `${fieldName} must be at least ${length} characters`),
  maxLength: (length: number, fieldName: string) => 
    z.string().max(length, `${fieldName} must be no more than ${length} characters`),
  number: (min?: number, max?: number) => {
    let schema = z.number();
    if (min !== undefined) schema = schema.min(min);
    if (max !== undefined) schema = schema.max(max);
    return schema;
  }
};

// Common field schemas
export const commonFieldSchemas = {
  firstName: validationPatterns.required('First name').pipe(
    validationPatterns.minLength(2, 'First name')
  ),
  lastName: validationPatterns.required('Last name').pipe(
    validationPatterns.minLength(2, 'Last name')
  ),
  email: validationPatterns.required('Email').pipe(validationPatterns.email),
  phone: validationPatterns.required('Phone number').pipe(validationPatterns.phone),
  postalCode: validationPatterns.required('Postal code').pipe(validationPatterns.postalCode),
  address: validationPatterns.required('Address').pipe(
    validationPatterns.minLength(5, 'Address')
  ),
  city: validationPatterns.required('City').pipe(
    validationPatterns.minLength(2, 'City')
  ),
  specialInstructions: z.string().optional()
};

// Form submission states
export interface FormSubmissionState {
  isSubmitting: boolean;
  hasSubmitted: boolean;
  submitError: string | null;
  submitSuccess: boolean;
}

export const initialSubmissionState: FormSubmissionState = {
  isSubmitting: false,
  hasSubmitted: false,
  submitError: null,
  submitSuccess: false
};

// Form validation utilities
export const createFormSchema = <T extends Record<string, z.ZodTypeAny>>(fields: T) => {
  return z.object(fields);
};

export const validateField = (schema: z.ZodTypeAny, value: any): { isValid: boolean; error?: string } => {
  try {
    schema.parse(value);
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0]?.message };
    }
    return { isValid: false, error: 'Validation failed' };
  }
};
