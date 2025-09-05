
import { z } from 'zod';
import { UseFormReturn, Path, PathValue } from 'react-hook-form';

/**
 * Validates and updates a form field
 * @param form - The form instance from react-hook-form
 * @param fieldName - The name of the field to update
 * @param schema - The Zod schema to validate against
 * @param value - The new value to set
 * @returns A boolean indicating if validation passed
 */
export const validateAndUpdateField = async <T extends Record<string, any>>(
  form: UseFormReturn<T>,
  fieldName: Path<T>,
  schema: z.ZodType<any>,
  value: any
): Promise<boolean> => {
  try {
    // Parse the value against the schema
    await schema.parseAsync(value);
    
    // If valid, update the form value
    form.setValue(fieldName, value as PathValue<T, Path<T>>, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    
    return true;
  } catch (error) {
    // If validation fails, set the error
    if (error instanceof z.ZodError) {
      const fieldError = error.errors[0]?.message || 'Invalid value';
      form.setError(fieldName, {
        type: 'manual',
        message: fieldError,
      });
    }
    
    return false;
  }
};

/**
 * Formats a phone number to a consistent format
 * @param phone - The phone number to format
 * @returns The formatted phone number
 */
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if the input is of correct length
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  
  return phone;
};

/**
 * Validates an email address
 * @param email - The email to validate
 * @returns Boolean indicating if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Formats an amount as currency
 * @param amount - The amount to format
 * @param currency - The currency code
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, currency = 'EUR'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount);
};
