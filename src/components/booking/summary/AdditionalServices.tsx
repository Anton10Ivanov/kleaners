
import { UseFormReturn } from 'react-hook-form';
import { BookingFormData } from '@/schemas/booking';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface AdditionalServicesProps {
  form: UseFormReturn<BookingFormData>;
}

const AdditionalServices = ({ form }: AdditionalServicesProps) => {
  const { extras = [] } = form.watch();

  const removeExtra = (extraToRemove: string) => {
    const updatedExtras = extras.filter(extra => extra !== extraToRemove);
    form.setValue('extras', updatedExtras);
  };

  if (extras.length === 0) return null;

  return (
    <div className="border-t pt-3">
      <h4 className="font-medium mb-2">Additional Services</h4>
      <ul className="space-y-2">
        {extras.map((extra, index) => (
          <li key={index} className="flex items-center justify-between text-gray-600 dark:text-gray-400">
            <span className="capitalize">{extra}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeExtra(extra)}
              className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
            >
              <X className="h-3 w-3" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdditionalServices;
