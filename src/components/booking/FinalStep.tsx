import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/bookingSchemas";
import CleaningAddress from "./final/CleaningAddress";
import PersonalInformation from "./final/PersonalInformation";
import EnhancedBookingSummary from "./EnhancedBookingSummary";
import BookingConfirmation from "./BookingConfirmation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { useBookingSubmission } from "@/hooks/useBookingSubmission";
import { BookingSubmissionLoader } from "@/components/ui/loading-states";
import FormErrorBoundary from "@/components/forms/FormErrorBoundary";
import { displayFormErrors } from "@/utils/errors/formErrors";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { useMediaQuery } from "@/hooks/use-media-query";
import { logger } from "@/utils/logging";

interface FinalStepProps {
  form: UseFormReturn<any>;
  postalCode: string;
  onSubmit: (data: any) => void;
  onBack?: () => void;
}

const FinalStep = ({ form, postalCode, onSubmit, onBack }: FinalStepProps) => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const { isSubmitting, submitBooking, confirmationData, clearConfirmation } = useBookingSubmission();
  
  const providerOptions = form.watch('providerOptions') || [];
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
      logger.info('Booking submission initiated', { serviceType: data.serviceType, postalCode: data.postalCode }, 'FinalStep');
      
      const result = await submitBooking(data);
      logger.info('Booking submitted successfully', { referenceNumber: result.referenceNumber }, 'FinalStep');
    } catch (error) {
      logger.error('Booking submission failed', { error: error instanceof Error ? error.message : 'Unknown error' }, 'FinalStep');
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  // Unified responsive layout for all screen sizes
  return (
    <FormErrorBoundary>
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,_2fr)_minmax(0,_1fr)] gap-8">
        {/* Left Column - Form Fields */}
        <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact & Address</CardTitle>
                <CardDescription>
                  Please provide your contact information and service address.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <PersonalInformation form={form} />
                <Separator />
                <CleaningAddress form={form} postalCode={postalCode} />
              </CardContent>
            </Card>
            
            {hasProviderOptions && (
              <ProviderSelection 
                providers={providerOptions} 
                selectedProvider={selectedProvider}
                onSelectProvider={setSelectedProvider}
              />
            )}
        </div>

        {/* Right Column - Booking Summary */}
        <div className="sticky top-24 self-start">
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
    </FormErrorBoundary>
  );
};

// Extracted into a separate component for better organization
interface ProviderSelectionProps {
  providers: any[];
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
            i < Math.floor(rating) ? 'text-muted-gold fill-muted-gold' : 'text-neutral-icon'
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
