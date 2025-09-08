
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form";
import { Input } from '@/components/ui/input";
import { CheckCircle } from "lucide-react";

interface ValidatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export const ValidatedInput = ({ name, label, required, ...props }: ValidatedInputProps) => {
  const { control, getFieldState } = useFormContext();
  const fieldState = getFieldState(name);
  const isValid = (fieldState.isTouched || fieldState.isDirty) && !fieldState.invalid;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} {required && <span className="text-destructive">*</span>}
          </FormLabel>
          <div className="relative">
            <FormControl>
              <Input {...props} {...field} value={field.value ?? ''} />
            </FormControl>
            {isValid && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
