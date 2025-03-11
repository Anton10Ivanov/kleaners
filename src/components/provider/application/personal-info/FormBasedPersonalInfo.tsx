
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { TooltipIndicator } from '../components/FormSelectionButtons';

interface PersonalInfoFormValues {
  name: string;
  email: string;
  phone: string;
}

interface FormBasedPersonalInfoProps {
  form: UseFormReturn<PersonalInfoFormValues>;
}

export const FormBasedPersonalInfo = ({ form }: FormBasedPersonalInfoProps) => {
  const { control } = form;
  
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-1">
        <FormLabel className="text-base font-semibold">Contact Information</FormLabel>
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <TooltipIndicator />
              </span>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-primary text-primary-foreground border border-primary/60 p-2 text-sm max-w-xs">
              <p>Please provide your contact details so we can reach you</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Full Name</FormLabel>
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
              <FormLabel>Email</FormLabel>
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
              <FormLabel>Phone Number</FormLabel>
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
