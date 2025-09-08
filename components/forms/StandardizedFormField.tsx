'use client'

import React from 'react';
import { UseFormReturn, FieldPath, FieldValues } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { FormCalendar } from '@/components/calendar/FormCalendar';
import { useScheduleData } from '@/hooks/useScheduleData';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

// Form field types
export type FormFieldType = 
  | 'text' 
  | 'email' 
  | 'tel' 
  | 'password' 
  | 'number' 
  | 'textarea' 
  | 'select' 
  | 'checkbox' 
  | 'radio' 
  | 'switch' 
  | 'date' 
  | 'datetime' 
  | 'calendar';

export interface FormFieldOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface StandardizedFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  form: UseFormReturn<TFieldValues>;
  name: TName;
  type: FormFieldType;
  label: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  options?: FormFieldOption[];
  className?: string;
  showTimeSlots?: boolean;
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  };
}

export function StandardizedFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  form,
  name,
  type,
  label,
  placeholder,
  description,
  required = false,
  disabled = false,
  options = [],
  className,
  showTimeSlots = true,
  validation = {}
}: StandardizedFormFieldProps<TFieldValues, TName>) {
  const { cleaners, bookingRules } = useScheduleData();

  const renderField = () => {
    switch (type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'password':
      case 'number':
        return (
          <Input
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className={cn("form-field", className)}
            {...validation}
          />
        );

      case 'textarea':
        return (
          <Textarea
            placeholder={placeholder}
            disabled={disabled}
            className={cn("form-field min-h-[100px]", className)}
            {...validation}
          />
        );

      case 'select':
        return (
          <Select disabled={disabled}>
            <SelectTrigger className={cn("form-field", className)}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={name}
              disabled={disabled}
              className={cn("form-field", className)}
            />
            <label
              htmlFor={name}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
          </div>
        );

      case 'radio':
        return (
          <RadioGroup disabled={disabled} className={cn("form-field", className)}>
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem 
                  value={option.value} 
                  id={`${name}-${option.value}`}
                  disabled={option.disabled}
                />
                <label
                  htmlFor={`${name}-${option.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'switch':
        return (
          <div className="flex items-center space-x-2">
            <Switch
              id={name}
              disabled={disabled}
              className={cn("form-field", className)}
            />
            <label
              htmlFor={name}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
          </div>
        );

      case 'date':
      case 'datetime':
      case 'calendar':
        return (
          <FormCalendar
            value={form.watch(name) as Date}
            onChange={(date) => form.setValue(name, date as any)}
            timeSlot={form.watch('timeSlot' as any) as string}
            onTimeSlotChange={(slot) => form.setValue('timeSlot' as any, slot as any)}
            cleaners={cleaners}
            bookingRules={bookingRules}
            placeholder={placeholder}
            disabled={disabled}
            showTimeSlots={showTimeSlots && (type === 'datetime' || type === 'calendar')}
            required={required}
            className={cn("form-field", className)}
          />
        );

      default:
        return (
          <Input
            type="text"
            placeholder={placeholder}
            disabled={disabled}
            className={cn("form-field", className)}
          />
        );
    }
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={cn("form-group", className)}>
          {type !== 'checkbox' && type !== 'switch' && (
            <FormLabel className="form-label">
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          )}
          
          <FormControl>
            {renderField()}
          </FormControl>
          
          {description && (
            <FormDescription className="form-help">
              {description}
            </FormDescription>
          )}
          
          <FormMessage className="form-error" />
        </FormItem>
      )}
    />
  );
}

// Form section component for grouping related fields
export interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

export function FormSection({ 
  title, 
  description, 
  children, 
  className,
  collapsible = false,
  defaultExpanded = true
}: FormSectionProps) {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

  return (
    <div className={cn("form-spacing-loose", className)}>
      <div className="border-b border-border pb-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-heading">{title}</h3>
            {description && (
              <p className="text-caption mt-1">{description}</p>
            )}
          </div>
          {collapsible && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {isExpanded ? '−' : '+'}
            </button>
          )}
        </div>
      </div>
      
      {isExpanded && (
        <div className="form-spacing-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}

// Form validation status component
export interface FormValidationStatusProps {
  isValid: boolean;
  message?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
}

export function FormValidationStatus({ 
  isValid, 
  message, 
  type = 'success' 
}: FormValidationStatusProps) {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const getClassName = () => {
    switch (type) {
      case 'success':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'error':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'warning':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'info':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  if (!message) return null;

  return (
    <div className={cn(
      "flex items-center gap-2 p-3 rounded-lg border text-sm font-medium",
      getClassName()
    )}>
      {getIcon()}
      {message}
    </div>
  );
}

export default StandardizedFormField;
