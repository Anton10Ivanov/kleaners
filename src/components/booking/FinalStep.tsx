
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { BookingFormData, bookingSchema } from "@/schemas/booking";

interface FinalStepProps {
  postalCode: string;
  onSubmit: (data: BookingFormData) => void;
}

const FinalStep = ({ postalCode, onSubmit }: FinalStepProps) => {
  const [isAdditionalInfoOpen, setIsAdditionalInfoOpen] = useState(false);
  
  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      postalCode,
    }
  });

  const handleSubmit = (data: BookingFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {/* Personal Information Section */}
        <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold">Your personal information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose a password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirm your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <p className="text-sm text-primary">* Login as returning client</p>
        </div>

        {/* Cleaning Address Section */}
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

        {/* Special Instructions Section */}
        <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold">Special instructions</h3>
          <FormField
            control={form.control}
            name="specialInstructions"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Any special instructions for our cleaning team?"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Promo Code Section */}
        <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold">Promo code</h3>
          <FormField
            control={form.control}
            name="promoCode"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2">
                  <FormControl>
                    <Input placeholder="Enter promo code" {...field} />
                  </FormControl>
                  <Button type="button" variant="outline" onClick={() => {
                    if (field.value) {
                      toast.success("Promo code applied!");
                    }
                  }}>
                    Apply
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Payment section will be implemented with Stripe integration */}
        <div className="flex justify-end">
          <Button type="submit">Continue to payment</Button>
        </div>
      </form>
    </Form>
  );
};

export default FinalStep;
