
import { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/schemas/booking";

interface CleaningAddressProps {
  form: UseFormReturn<BookingFormData>;
  postalCode: string;
}

const CleaningAddress = ({ form, postalCode }: CleaningAddressProps) => {
  const [isAdditionalInfoOpen, setIsAdditionalInfoOpen] = useState(false);

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold">Cleaning address</h3>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address & House number</FormLabel>
              <FormControl>
                <Input placeholder="Enter your address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="floor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Floor & Door (optional)</FormLabel>
              <FormControl>
                <Input placeholder="E.g., 3rd floor, Door 12" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="entryCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entry code (optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter entry code if any" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field} disabled className="bg-gray-100" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accessMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How will we get in?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select access method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="home">Someone will be at home</SelectItem>
                  <SelectItem value="concierge">Concierge or Portier</SelectItem>
                  <SelectItem value="key">I will hide a key</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Collapsible open={isAdditionalInfoOpen} onOpenChange={setIsAdditionalInfoOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" type="button" className="p-0 h-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add additional info
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <FormField
              control={form.control}
              name="accessInstructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional access information</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Here you can give us more information on how to access your place. Should we follow some specific guidelines?"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default CleaningAddress;
