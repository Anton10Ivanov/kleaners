
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { BookingFormData } from "@/schemas/booking";
import CleaningAddress from "./final/CleaningAddress";
import PersonalInformation from "./final/PersonalInformation";
import SpecialInstructions from "./final/SpecialInstructions";
import PromoCode from "./final/PromoCode";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface FinalStepProps {
  form: UseFormReturn<BookingFormData>;
  postalCode: string;
  onSubmit: (data: BookingFormData) => void;
}

interface ProviderOption {
  id: string;
  name: string;
  rating?: number;
}

const FinalStep = ({ form, postalCode, onSubmit }: FinalStepProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  
  const providerOptions = form.watch('providerOptions') as ProviderOption[] || [];
  const hasProviderOptions = providerOptions && providerOptions.length > 0;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Set the selected provider if one was chosen
    if (selectedProvider) {
      form.setValue('selectedProviderId', selectedProvider);
    }
    
    setSubmitting(true);
    try {
      const data = form.getValues();
      await onSubmit(data);
      toast.success("Booking submitted successfully!");
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast.error("There was an error submitting your booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CleaningAddress form={form} postalCode={postalCode} />
      <PersonalInformation form={form} />
      
      {hasProviderOptions && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Choose a Service Provider (Optional)</h3>
            <RadioGroup
              value={selectedProvider || ""}
              onValueChange={setSelectedProvider}
              className="space-y-3"
            >
              {providerOptions.map((provider) => (
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
                        {provider.rating && (
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(provider.rating || 0) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-xs ml-1 text-gray-600 dark:text-gray-400">
                              {provider.rating.toFixed(1)}
                            </span>
                          </div>
                        )}
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
      )}
      
      <SpecialInstructions form={form} />
      <PromoCode form={form} />
      
      <div className="flex justify-end">
        <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? "Submitting..." : "Complete Booking"}
        </Button>
      </div>
    </form>
  );
};

export default FinalStep;
