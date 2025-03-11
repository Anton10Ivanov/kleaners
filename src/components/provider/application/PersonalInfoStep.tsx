
import { FormBasedPersonalInfo } from './personal-info/FormBasedPersonalInfo';
import { DirectStatePersonalInfo } from './personal-info/DirectStatePersonalInfo';
import { PersonalInfoStepProps } from './personal-info/types';

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
    return <FormBasedPersonalInfo form={form} />;
  }
  
  // If using direct state management
  return (
    <DirectStatePersonalInfo
      name={name || ''}
      email={email || ''}
      phone={phone || ''}
      setName={setName!}
      setEmail={setEmail!}
      setPhone={setPhone!}
    />
  );
};
