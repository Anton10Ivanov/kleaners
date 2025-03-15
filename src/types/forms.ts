
import { z } from 'zod';
import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

/**
 * Generic props for form components
 */
export type FormComponentProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
> = {
  form: UseFormReturn<TFieldValues, TContext>;
  onSubmit?: (values: TFieldValues) => void | Promise<void>;
  disabled?: boolean;
};

/**
 * Generic field error component props
 */
export type FieldErrorProps<
  TFieldValues extends FieldValues = FieldValues,
> = {
  form: UseFormReturn<TFieldValues>;
  name: FieldPath<TFieldValues>;
};

/**
 * Generic form step component props
 */
export type FormStepProps<
  TFieldValues extends FieldValues = FieldValues,
> = {
  form: UseFormReturn<TFieldValues>;
  onNext?: () => void;
  onPrevious?: () => void;
  isSubmitting?: boolean;
  isLastStep?: boolean;
  isFirstStep?: boolean;
};

/**
 * Type to extract the inferred type from a Zod schema
 */
export type InferredFormValues<T extends z.ZodTypeAny> = z.infer<T>;
