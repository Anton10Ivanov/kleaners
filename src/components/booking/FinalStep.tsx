import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { BookingFormData, ProviderOption } from "@/schemas/booking";
import CleaningAddress from "./final/CleaningAddress";
import PersonalInformation from "./final/PersonalInformation";
import EnhancedBookingSummary from "./EnhancedBookingSummary";
import BookingConfirmation from "./BookingConfirmation";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { useBookingSubmission } from "@/hooks/useBookingSubmission";
import { BookingSubmissionLoader } from "@/components/ui/loading-states";
import FormErrorBoundary from "@/components/forms/FormErrorBoundary";
import { displayFormErrors } from "@/utils/errors/formErrors";
import { toast } from "sonner";
import { useMediaQuery } from "@/hooks/use-media-query";

interface FinalStepProps {
  form: UseFormReturn<BookingFormData>;
  postalCode: string;
  onSubmit: (data: BookingFormData) => void;
  onBack?: () => void;
}

const FinalStep = ({ form, postalCode, onSubmit, onBack }: FinalStepProps) => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const { isSubmitting, submitBooking, confirmationData, clearConfirmation } = useBookingSubmission();
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const providerOptions = form.watch('providerOptions') as ProviderOption[] || [];
  const hasProviderOptions = providerOptions && providerOptions.length > 0;
  
  // Show confirmation page if booking was successful
  if (confirmationData) {
    return (
      <BookingConfirmation
        bookingData={confirmationData.bookingData}
        referenceNumber={confirmationData.referenceNumber}
        onNewBooking={clearConfirmation}
      />
    );
  }
  
  // Show loading state during submission
  if (isSubmitting) {
    return <BookingSubmissionLoader />;
  }

  const handleSubmit = async () => {
    const formData = form.getValues();
    const errors: string[] = [];
    
    if (!formData.firstName) errors.push("First name is required");
    if (!formData.lastName) errors.push("Last name is required");
    if (!formData.email) errors.push("Email address is required");
    if (!formData.phone) errors.push("Phone number is required");
    if (!formData.address) errors.push("Street address is required");
    if (!formData.city) errors.push("City is required");
    if (!formData.postalCode) errors.push("Postal code is required");
    if (!formData.accessMethod) errors.push("Access method is required");
    
    // Validate form with react-hook-form
    const isValid = await form.trigger();
    
    if (!isValid || errors.length > 0) {
      errors.forEach(error => toast.error(error));
      displayFormErrors(form.formState.errors);
      return;
    }
    
    if (selectedProvider) {
      form.setValue('selectedProviderId', selectedProvider);
    }
    
    try {
      const data = form.getValues();
      console.log('Submitting booking data:', data);
      
      const result = await submitBooking(data);
      
      if (result.success) {
        console.log('Booking submitted successfully:', result.referenceNumber);
        toast.success('Booking confirmed! Check your email for details.');
      } else {
        toast.error(result.error || 'Failed to submit booking');
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  // Mobile layout - single column
  if (isMobile) {
    return (
      <FormErrorBoundary>
        <div className="space-y-6">
          <form className="space-y-6">
            <CleaningAddress form={form} postalCode={postalCode} />
            <PersonalInformation form={form} />
            
            {hasProviderOptions && (
              <ProviderSelection 
                providers={providerOptions} 
                selectedProvider={selectedProvider}
                onSelectProvider={setSelectedProvider}
              />
            )}
          </form>
          
          {/* Summary shown separately on mobile */}
          <EnhancedBookingSummary 
            form={form} 
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting}
            onBack={onBack}
            showBackButton={!!onBack}
            backButtonText="Previous"
          />
        </div>
      </FormErrorBoundary>
    );
  }

  // Desktop layout - two columns
  return (
    <FormErrorBoundary>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Form Fields */}
        <div className="lg:col-span-2">
          <form className="space-y-6">
            <CleaningAddress form={form} postalCode={postalCode} />
            <PersonalInformation form={form} />
            
            {hasProviderOptions && (
              <ProviderSelection 
                providers={providerOptions} 
                selectedProvider={selectedProvider}
                onSelectProvider={setSelectedProvider}
              />
            )}
          </form>
        </div>

        {/* Right Column - Booking Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <EnhancedBookingSummary 
              form={form} 
              onSubmit={handleSubmit} 
              isSubmitting={isSubmitting}
              onBack={onBack}
              showBackButton={!!onBack}
              backButtonText="Previous"
            />
          </div>
        </div>
      </div>
    </FormErrorBoundary>
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
