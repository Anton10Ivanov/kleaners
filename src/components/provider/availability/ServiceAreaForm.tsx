
import React from 'react';
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { type ServiceAreaFormValues } from '@/hooks/useServiceAreas';

// Define the schema with required fields matching ServiceAreaFormValues
const serviceAreaSchema = z.object({
  postal_code: z.string().min(1, "Postal code is required"),
  travel_distance: z.coerce.number().min(1, "Travel distance is required"),
});

interface ServiceAreaFormProps {
  onSubmit: (values: ServiceAreaFormValues) => Promise<boolean>;
  loading?: boolean;
}

export const ServiceAreaForm: React.FC<ServiceAreaFormProps> = ({
  onSubmit,
  loading = false
}) => {
  const form = useForm<z.infer<typeof serviceAreaSchema>>({
    resolver: zodResolver(serviceAreaSchema),
    defaultValues: {
      postal_code: "",
      travel_distance: 5,
    }
  });

  const handleSubmit = async (values: z.infer<typeof serviceAreaSchema>) => {
    const success = await onSubmit(values as ServiceAreaFormValues);
    if (success) {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Plus className="h-4 w-4 text-primary" />
          <h3 className="text-lg font-medium">Add Service Area</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="postal_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="e.g., 10115" 
                    className="bg-background focus:ring-primary focus:border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="travel_distance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Travel Distance (km)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="bg-background focus:ring-primary focus:border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button 
          type="submit" 
          className="mt-4 bg-gradient-to-r from-primary to-primary-hover text-white hover:opacity-90 transition-all font-medium shadow-md" 
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Service Area"}
        </Button>
      </form>
    </Form>
  );
};
