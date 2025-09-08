
import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { MapPin, Loader2 } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { BookingFormData } from '@/schemas/booking';

interface AddressResult {
  display_name: string;
  address: {
    house_number?: string;
    road?: string;
    city?: string;
    postcode?: string;
    state?: string;
  };
}

interface AddressAutocompleteProps {
  form: UseFormReturn<BookingFormData>;
  onAddressSelect?: (address: AddressResult) => void;
}

export const AddressAutocomplete = ({ form, onAddressSelect }: AddressAutocompleteProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<AddressResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout>();
  const inputRef = useRef<HTMLInputElement>(null);

  const searchAddresses = async (searchQuery: string) => {
    if (searchQuery.length < 3) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&countrycodes=de&q=${encodeURIComponent(searchQuery)}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setResults(data.filter((item: any) => item.address));
      }
    } catch (error) {
      console.error('Address search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (query) {
        searchAddresses(query);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  const handleInputChange = (value: string) => {
    setQuery(value);
    setShowResults(true);
    form.setValue('address', value);
  };

  const handleAddressSelect = (address: AddressResult) => {
    const { house_number, road, city, postcode } = address.address;
    const fullAddress = `${house_number || ''} ${road || ''}`.trim();
    
    setQuery(fullAddress);
    setShowResults(false);
    
    // Update form fields
    form.setValue('address', fullAddress);
    if (city) form.setValue('city', city);
    if (postcode) form.setValue('postalCode', postcode);
    
    onAddressSelect?.(address);
  };

  const handleBlur = () => {
    // Delay hiding results to allow for click selection
    setTimeout(() => setShowResults(false), 200);
  };

  return (
    <div className="relative">
      <Label htmlFor="address-autocomplete" className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Street Address and Number *
      </Label>
      <div className="relative">
        <Input
          ref={inputRef}
          id="address-autocomplete"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={handleBlur}
          placeholder="Start typing your street address and number..."
          className="pr-10"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
          ) : (
            <MapPin className="h-4 w-4 text-gray-400" />
          )}
        </div>
      </div>

      {showResults && results.length > 0 && (
        <Card className="absolute z-50 w-full mt-1 max-h-60 overflow-y-auto border shadow-lg">
          <div className="p-2">
            {results.map((result, index) => {
              const { house_number, road, city, postcode } = result.address;
              const addressLine = `${house_number || ''} ${road || ''}`.trim();
              const locationLine = `${postcode || ''} ${city || ''}`.trim();

              return (
                <div
                  key={index}
                  className="flex flex-col card-spacing-xs hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer rounded-md"
                  onClick={() => handleAddressSelect(result)}
                >
                  <div className="font-medium text-sm">{addressLine}</div>
                  <div className="text-xs text-gray-500">{locationLine}</div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
};
