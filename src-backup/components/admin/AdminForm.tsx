import React, { useState } from 'react';
import { useForm, UseFormReturn, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Save, X, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FormFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 'switch' | 'date' | 'url';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: { value: string; label: string }[];
  validation?: any;
  description?: string;
  width?: 'full' | 'half' | 'third' | 'quarter';
}

export interface AdminFormProps<T extends FieldValues = FieldValues> {
  title?: string;
  description?: string;
  fields: FormFieldConfig[];
  schema: z.ZodSchema<T>;
  defaultValues?: Partial<T>;
  onSubmit: (data: T) => void | Promise<void>;
  onCancel?: () => void;
  onReset?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  resetLabel?: string;
  loading?: boolean;
  disabled?: boolean;
  showActions?: boolean;
  className?: string;
  mode?: 'create' | 'edit' | 'view';
}

export function AdminForm<T extends FieldValues = FieldValues>({
  title,
  description,
  fields,
  schema,
  defaultValues = {},
  onSubmit,
  onCancel,
  onReset,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  resetLabel = 'Reset',
  loading = false,
  disabled = false,
  showActions = true,
  className,
  mode = 'create'
}: AdminFormProps<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as T,
    mode: 'onChange'
  });

  const handleSubmit = async (data: T) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    form.reset();
    onReset?.();
  };

  const renderField = (field: FormFieldConfig) => {
    const fieldWidth = {
      full: 'col-span-1',
      half: 'col-span-1 sm:col-span-2',
      third: 'col-span-1 sm:col-span-2 lg:col-span-3',
      quarter: 'col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4'
    }[field.width || 'full'];

    const commonProps = {
      disabled: disabled || field.disabled,
      placeholder: field.placeholder
    };

    switch (field.type) {
      case 'textarea':
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name as any}
            render={({ field: formField }) => (
              <FormItem className={fieldWidth}>
                <FormLabel>
                  {field.label}
                  {field.required && <span className="text-destructive ml-1">*</span>}
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...formField}
                    {...commonProps}
                    rows={4}
                    className="resize-none"
                  />
                </FormControl>
                {field.description && (
                  <p className="text-sm text-muted-foreground">{field.description}</p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'select':
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name as any}
            render={({ field: formField }) => (
              <FormItem className={fieldWidth}>
                <FormLabel>
                  {field.label}
                  {field.required && <span className="text-destructive ml-1">*</span>}
                </FormLabel>
                <Select
                  onValueChange={formField.onChange}
                  defaultValue={formField.value}
                  disabled={disabled || field.disabled}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={field.placeholder || `Select ${field.label.toLowerCase()}`} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {field.description && (
                  <p className="text-sm text-muted-foreground">{field.description}</p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'checkbox':
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name as any}
            render={({ field: formField }) => (
              <FormItem className={cn(fieldWidth, 'flex flex-row items-start space-x-3 space-y-0')}>
                <FormControl>
                  <Checkbox
                    checked={formField.value}
                    onCheckedChange={formField.onChange}
                    disabled={disabled || field.disabled}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    {field.label}
                    {field.required && <span className="text-destructive ml-1">*</span>}
                  </FormLabel>
                  {field.description && (
                    <p className="text-sm text-muted-foreground">{field.description}</p>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'switch':
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name as any}
            render={({ field: formField }) => (
              <FormItem className={cn(fieldWidth, 'flex flex-row items-center justify-between space-x-3 space-y-0')}>
                <div className="space-y-1">
                  <FormLabel>
                    {field.label}
                    {field.required && <span className="text-destructive ml-1">*</span>}
                  </FormLabel>
                  {field.description && (
                    <p className="text-sm text-muted-foreground">{field.description}</p>
                  )}
                </div>
                <FormControl>
                  <Switch
                    checked={formField.value}
                    onCheckedChange={formField.onChange}
                    disabled={disabled || field.disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      default:
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name as any}
            render={({ field: formField }) => (
              <FormItem className={fieldWidth}>
                <FormLabel>
                  {field.label}
                  {field.required && <span className="text-destructive ml-1">*</span>}
                </FormLabel>
                <FormControl>
                  <Input
                    {...formField}
                    {...commonProps}
                    type={field.type}
                  />
                </FormControl>
                {field.description && (
                  <p className="text-sm text-muted-foreground">{field.description}</p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        );
    }
  };

  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';

  return (
    <Card className={className}>
      {(title || description) && (
        <CardHeader>
          {title && (
            <CardTitle className="flex items-center gap-2">
              {title}
              {isViewMode && <Badge variant="secondary">View Only</Badge>}
              {isEditMode && <Badge variant="outline">Edit Mode</Badge>}
            </CardTitle>
          )}
          {description && <p className="text-muted-foreground">{description}</p>}
        </CardHeader>
      )}

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {fields.map(renderField)}
            </div>

            {showActions && (
              <>
                <Separator />
                <div className="flex items-center justify-end gap-3">
                  {onReset && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleReset}
                      disabled={loading || isSubmitting}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      {resetLabel}
                    </Button>
                  )}

                  {onCancel && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onCancel}
                      disabled={loading || isSubmitting}
                    >
                      <X className="h-4 w-4 mr-2" />
                      {cancelLabel}
                    </Button>
                  )}

                  {!isViewMode && (
                    <Button
                      type="submit"
                      disabled={loading || isSubmitting || disabled}
                    >
                      {isSubmitting ? (
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      {submitLabel}
                    </Button>
                  )}
                </div>
              </>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default AdminForm;
