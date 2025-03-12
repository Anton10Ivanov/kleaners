
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ServiceAreaFormValues } from '@/types/serviceAreas';

const formSchema = z.object({
  postal_code: z.string().min(3, {
    message: "Postal code must be at least 3 characters",
  }),
  travel_distance: z.coerce.number().min(1, {
    message: "Travel distance must be at least 1 km/mile",
  }),
});

interface ServiceAreaFormProps {
  onSubmit: (values: ServiceAreaFormValues) => void;
  loading: boolean;
}

export const ServiceAreaForm: React.FC<ServiceAreaFormProps> = ({ onSubmit, loading }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postal_code: '',
      travel_distance: 10,
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values);
    form.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Add Service Area</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="postal_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code / ZIP</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter postal code" {...field} />
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
                    <FormLabel>Travel Distance (km/miles)</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Adding...' : 'Add Service Area'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
