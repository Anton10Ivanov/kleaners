
import { UseFormReturn } from 'react-hook-form';

export interface PersonalInfoFormValues {
  name: string;
  email: string;
  phone: string;
}

export interface PersonalInfoStepProps {
  form?: UseFormReturn<PersonalInfoFormValues>;
  // Direct state props
  name?: string;
  email?: string;
  phone?: string;
  setName?: React.Dispatch<React.SetStateAction<string>>;
  setEmail?: React.Dispatch<React.SetStateAction<string>>;
  setPhone?: React.Dispatch<React.SetStateAction<string>>;
}
