
import { UseFormReturn } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { TooltipIndicator } from './components/FormSelectionButtons';

interface PersonalInfoFormValues {
  name: string;
  email: string;
  phone: string;
}

// Updated interface to support both form-based and direct state-based usage
interface PersonalInfoStepProps {
  form?: UseFormReturn<PersonalInfoFormValues>;
  // Direct state props for JoinTeam.tsx
  name?: string;
  email?: string;
  phone?: string;
  setName?: React.Dispatch<React.SetStateAction<string>>;
  setEmail?: React.Dispatch<React.SetStateAction<string>>;
  setPhone?: React.Dispatch<React.SetStateAction<string>>;
}

export const PersonalInfoStep = ({ 
  form, 
  name, 
  email, 
  phone, 
  setName, 
  setEmail, 
  setPhone 
}: PersonalInfoStepProps) => {
  // If using react-hook-form
  if (form) {
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
  }
  
  // If using direct state management (for JoinTeam.tsx)
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-1">
        <Label className="text-base font-semibold text-gray-800 dark:text-gray-100">
          Contact Information
        </Label>
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
      
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName?.(e.target.value)}
          placeholder="Your full name"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail?.(e.target.value)}
            placeholder="Your email"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone?.(e.target.value)}
            placeholder="Your phone number"
            required
          />
        </div>
      </div>
    </div>
  );
};
