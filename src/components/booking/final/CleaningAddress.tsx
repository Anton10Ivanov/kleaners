
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";
import { Card, CardContent } from "@/components/ui/card";
import { AddressAutocomplete } from "@/components/forms/AddressAutocomplete";
import FormErrorBoundary from "@/components/forms/FormErrorBoundary";

interface CleaningAddressProps {
  form: UseFormReturn<BookingFormData>;
  postalCode: string;
}

const CleaningAddress = ({ form, postalCode }: CleaningAddressProps) => {
  return (
    <FormErrorBoundary>
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Service Address</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Address Autocomplete */}
            <div className="md:col-span-2">
              <AddressAutocomplete 
                form={form}
                onAddressSelect={(address) => {
                  // Address details are automatically populated by the component
                  console.log('Address selected:', address);
                }}
              />
            </div>

            {/* City */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="City" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Postal Code */}
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="12345"
                      value={field.value || postalCode}
                      readOnly={!!postalCode}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Floor */}
            <FormField
              control={form.control}
              name="floor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Floor (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., 3rd floor, Ground floor" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Entry Code */}
            <FormField
              control={form.control}
              name="entryCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entry Code (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Building or door code" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Access Method */}
            <FormField
              control={form.control}
              name="accessMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How should we access your property?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select access method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="key_hidden">Key hidden on property</SelectItem>
                      <SelectItem value="key_pickup">I'll provide key beforehand</SelectItem>
                      <SelectItem value="present">I'll be present</SelectItem>
                      <SelectItem value="concierge">Building concierge/management</SelectItem>
                      <SelectItem value="other">Other (please specify in instructions)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Access Instructions */}
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="accessInstructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Access Instructions (optional)</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Any specific instructions for accessing your property"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </FormErrorBoundary>
  );
};

export default CleaningAddress;
