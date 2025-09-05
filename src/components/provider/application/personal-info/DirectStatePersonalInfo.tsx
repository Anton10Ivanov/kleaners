
import { User, Mail, Phone } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { TooltipIndicator } from '../components/FormSelectionButtons';

interface DirectStatePersonalInfoProps {
  name: string;
  email: string;
  phone: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
}

export const DirectStatePersonalInfo = ({
  name,
  email,
  phone,
  setName,
  setEmail,
  setPhone
}: DirectStatePersonalInfoProps) => {
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
        <Label htmlFor="name" className="flex items-center gap-1">
          <User className="h-4 w-4" />
          <span>Full Name</span>
          <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          required
          className={`${name?.trim() === '' ? 'border-red-300 focus:ring-red-500' : 'border-input'}`}
        />
        {name?.trim() === '' && (
          <p className="text-xs text-red-500 mt-1">Full name is required</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            <span>Email</span>
            <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            className={`${email?.trim() === '' || !email?.includes('@') ? 'border-red-300 focus:ring-red-500' : 'border-input'}`}
          />
          {email?.trim() === '' && (
            <p className="text-xs text-red-500 mt-1">Email is required</p>
          )}
          {email?.trim() !== '' && !email?.includes('@') && (
            <p className="text-xs text-red-500 mt-1">Please enter a valid email</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-1">
            <Phone className="h-4 w-4" />
            <span>Phone Number</span>
            <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Your phone number"
            required
            className={`${phone?.trim() === '' ? 'border-red-300 focus:ring-red-500' : 'border-input'}`}
          />
          {phone?.trim() === '' && (
            <p className="text-xs text-red-500 mt-1">Phone number is required</p>
          )}
        </div>
      </div>
    </div>
  );
};
