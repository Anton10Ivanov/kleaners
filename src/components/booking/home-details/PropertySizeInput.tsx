
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormData } from '@/schemas/booking';

interface PropertySizeInputProps {
  form: UseFormReturn<BookingFormData>;
}

export const PropertySizeInput = ({ form }: PropertySizeInputProps) => {
  const propertySize = form.watch('propertySize') || 70;

  const handleSizeIncrement = (increment: number) => {
    const currentSize = propertySize || 70;
    const newSize = Math.max(0, currentSize + increment);
    form.setValue('propertySize', newSize);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="property-size" className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Home size (m²)
      </Label>
      <div className="flex items-center gap-2">
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => handleSizeIncrement(-5)} 
          className="h-12 w-12 p-0"
        >
          -
        </Button>
        <Input 
          id="property-size" 
          type="number" 
          placeholder="70" 
          value={propertySize || 70} 
          onChange={e => form.setValue('propertySize', Number(e.target.value))} 
          className="h-12 text-center" 
          min="20" 
          max="500" 
          step="5" 
        />
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => handleSizeIncrement(5)} 
          className="h-12 w-12 p-0"
        >
          +
        </Button>
      </div>
      <p className="text-xs text-gray-500">
        A rough estimate is fine. Please include all living areas.
      </p>
    </div>
  );
};
