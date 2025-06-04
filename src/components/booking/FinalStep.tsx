
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { BookingFormData, ProviderOption } from "@/schemas/booking";
import CleaningAddress from "./final/CleaningAddress";
import PersonalInformation from "./final/PersonalInformation";
import SpecialInstructions from "./final/SpecialInstructions";
import EnhancedBookingSummary from "./EnhancedBookingSummary";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { useBookingSubmission } from "@/hooks/useBookingSubmission";

interface FinalStepProps {
  form: UseFormReturn<BookingFormData>;
  postalCode: string;
  onSubmit: (data: BookingFormData) => void;
}

const FinalStep = ({ form, postalCode, onSubmit }: FinalStepProps) => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const { isSubmitting } = useBookingSubmission();
  
  const providerOptions = form.watch('providerOptions') as ProviderOption[] || [];
  const hasProviderOptions = providerOptions && providerOptions.length > 0;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Set the selected provider if one was chosen
    if (selectedProvider) {
      form.setValue('selectedProviderId', selectedProvider);
    }
    
    try {
      const data = form.getValues();
      await onSubmit(data);
    } catch (error) {
      console.error("Error submitting booking:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Form Fields */}
      <div className="lg:col-span-2">
        <form onSubmit={handleSubmit} className="space-y-6">
          <CleaningAddress form={form} postalCode={postalCode} />
          <PersonalInformation form={form} />
          
          {hasProviderOptions && (
            <ProviderSelection 
              providers={providerOptions} 
              selectedProvider={selectedProvider}
              onSelectProvider={setSelectedProvider}
            />
          )}
          
          <SpecialInstructions form={form} />
          
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? "Submitting..." : "Complete Booking"}
            </Button>
          </div>
        </form>
      </div>

      {/* Right Column - Booking Summary */}
      <div className="lg:col-span-1">
        <div className="sticky top-6">
          <EnhancedBookingSummary form={form} />
        </div>
      </div>
    </div>
  );
};

// Extracted into a separate component for better organization
interface ProviderSelectionProps {
  providers: ProviderOption[];
  selectedProvider: string | null;
  onSelectProvider: (id: string | null) => void;
}

const ProviderSelection = ({ providers, selectedProvider, onSelectProvider }: ProviderSelectionProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Choose a Service Provider (Optional)</h3>
        <RadioGroup
          value={selectedProvider || ""}
          onValueChange={onSelectProvider}
          className="space-y-3"
        >
          {providers.map((provider) => (
            <div key={provider.id} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800">
              <RadioGroupItem value={provider.id} id={`provider-${provider.id}`} />
              <Label htmlFor={`provider-${provider.id}`} className="flex flex-1 items-center cursor-pointer">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10 bg-primary/10">
                    <AvatarFallback className="text-primary">
                      {provider.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{provider.name}</p>
                    {provider.rating && <ProviderRating rating={provider.rating} />}
                  </div>
                </div>
              </Label>
            </div>
          ))}
          <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800">
            <RadioGroupItem value="" id="provider-any" />
            <Label htmlFor="provider-any" className="cursor-pointer">
              <div>
                <p className="font-medium">Any Available Provider</p>
                <p className="text-xs text-gray-500">Let us match you with the best available provider</p>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

// Extracted into a separate component for better organization
interface ProviderRatingProps {
  rating: number;
}

const ProviderRating = ({ rating }: ProviderRatingProps) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${
            i < Math.floor(rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
          }`}
        />
      ))}
      <span className="text-xs ml-1 text-gray-600 dark:text-gray-400">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

export default FinalStep;
