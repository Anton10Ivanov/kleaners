
import { UseFormReturn } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

interface PersonalInfoFormValues {
  name: string;
  email: string;
  phone: string;
}

interface PersonalInfoStepProps {
  form: UseFormReturn<PersonalInfoFormValues>;
}

export const PersonalInfoStep = ({ form }: PersonalInfoStepProps) => {
  const { control } = form;

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Full Name <span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Your full name"
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="Your email"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Phone Number <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="tel"
                  placeholder="Your phone number"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
