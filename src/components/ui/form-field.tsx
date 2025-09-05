
import React from 'react';
import { UseFormReturn, FieldPath, FieldValues } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';

interface BaseFieldProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  description?: string;
  className?: string;
  required?: boolean;
}

interface TextFieldProps<TFieldValues extends FieldValues> extends BaseFieldProps<TFieldValues> {
  type?: 'text' | 'email' | 'tel' | 'password' | 'number';
}

interface TextareaFieldProps<TFieldValues extends FieldValues> extends BaseFieldProps<TFieldValues> {
  rows?: number;
}

interface SelectFieldProps<TFieldValues extends FieldValues> extends BaseFieldProps<TFieldValues> {
  options: { value: string; label: string }[];
}

interface CheckboxFieldProps<TFieldValues extends FieldValues> extends BaseFieldProps<TFieldValues> {
  description?: string;
}

export function TextField<TFieldValues extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  type = 'text',
  className,
  required = false
}: TextFieldProps<TFieldValues>) {
  const { isMobile } = useMobileOptimizations();
  const fieldState = form.getFieldState(name);
  const hasError = !!fieldState.error;
  const isValid = fieldState.isDirty && !hasError;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className={cn(
            "form-label text-sm font-medium text-foreground",
            isMobile && "text-base"
          )}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type={type}
                placeholder={placeholder}
                error={hasError}
                success={isValid}
                {...field}
                className={cn(
                  isMobile ? "pr-12" : "pr-10"
                )}
              />
              {fieldState.isDirty && (
                <div className={cn(
                  "absolute top-1/2 transform -translate-y-1/2",
                  isMobile ? "right-4" : "right-3"
                )}>
                  {isValid ? (
                    <CheckCircle className={cn(
                      "text-green-500",
                      isMobile ? "h-5 w-5" : "h-4 w-4"
                    )} />
                  ) : hasError ? (
                    <AlertCircle className={cn(
                      "text-destructive",
                      isMobile ? "h-5 w-5" : "h-4 w-4"
                    )} />
                  ) : null}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function TextareaField<TFieldValues extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  rows = 4,
  className,
  required = false
}: TextareaFieldProps<TFieldValues>) {
  const { isMobile } = useMobileOptimizations();
  const fieldState = form.getFieldState(name);
  const hasError = !!fieldState.error;
  const isValid = fieldState.isDirty && !hasError;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className={cn(
            "form-label text-sm font-medium text-foreground",
            isMobile && "text-base"
          )}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              rows={isMobile ? Math.max(rows, 3) : rows}
              {...field}
              className={cn(
                "resize-none transition-colors duration-200",
                hasError && "border-destructive focus-visible:ring-destructive/20",
                isValid && "border-green-500 focus-visible:ring-green-500/20",
                isMobile && "px-4 py-3 text-base"
              )}
            />
          </FormControl>
          <FormMessage />
          {field.value && (
            <div className={cn(
              "flex justify-between text-muted-foreground",
              isMobile ? "text-sm" : "text-xs"
            )}>
              <span>{field.value.length}/500 characters</span>
              {isValid && (
                <span className="text-green-600 flex items-center gap-1">
                  <CheckCircle className={cn(isMobile ? "h-4 w-4" : "h-3 w-3")} />
                  Valid
                </span>
              )}
            </div>
          )}
        </FormItem>
      )}
    />
  );
}

export function SelectField<TFieldValues extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  options,
  className,
  required = false
}: SelectFieldProps<TFieldValues>) {
  const { isMobile } = useMobileOptimizations();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className={cn(
            "form-label text-sm font-medium text-foreground",
            isMobile && "text-base"
          )}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className={cn(
                "transition-colors duration-200",
                isMobile ? "h-12 text-base" : "h-10 text-sm"
              )}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function CheckboxField<TFieldValues extends FieldValues>({
  form,
  name,
  label,
  description,
  className
}: CheckboxFieldProps<TFieldValues>) {
  const { isMobile } = useMobileOptimizations();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(
          "flex flex-row items-start space-y-0",
          isMobile ? "space-x-4" : "space-x-3",
          className
        )}>
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              className={cn(
                "touch-manipulation",
                isMobile && "h-5 w-5"
              )}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel className={cn(
              "form-label text-sm font-medium text-foreground",
              isMobile && "text-base"
            )}>
              {label}
            </FormLabel>
            {description && (
              <p className={cn(
                "text-muted-foreground",
                isMobile ? "text-sm" : "text-xs"
              )}>{description}</p>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
