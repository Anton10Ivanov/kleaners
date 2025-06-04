
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormData } from '@/schemas/booking';

interface RoomSelectorsProps {
  form: UseFormReturn<BookingFormData>;
}

export const RoomSelectors = ({ form }: RoomSelectorsProps) => {
  const bedrooms = form.watch('bedrooms');
  const bathrooms = form.watch('bathrooms');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Bedrooms */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Number of bedrooms
        </Label>
        <Select 
          value={bedrooms !== undefined ? bedrooms.toString() : ""} 
          onValueChange={value => form.setValue('bedrooms', Number(value))}
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select bedrooms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Studio</SelectItem>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bathrooms */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Number of bathrooms
        </Label>
        <Select 
          value={bathrooms !== undefined ? bathrooms.toString() : ""} 
          onValueChange={value => form.setValue('bathrooms', Number(value))}
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select bathrooms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="1.5">1.5</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3+</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
