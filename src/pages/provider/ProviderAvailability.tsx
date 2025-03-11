import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTitle } from '@/hooks/useTitle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { WeeklySchedule } from '@/components/provider/availability/WeeklySchedule';
import { useProviderAvailability } from '@/hooks/useProviderAvailability';
import { VacationRequestDialog } from '@/components/provider/availability/VacationRequestDialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

// Service Areas schema
const serviceAreaSchema = z.object({
  postal_code: z.string().min(1, "Postal code is required"),
  travel_distance: z.number().min(1, "Travel distance is required"),
});

type ServiceAreaFormValues = z.infer<typeof serviceAreaSchema>;

const ProviderAvailability = () => {
  useTitle('Availability Management');
  
  const [serviceAreas, setServiceAreas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const {
    availableDays,
    timeRanges,
    addTimeRange,
    removeTimeRange,
    updateTimeRange,
    toggleDayAvailability,
    saveAvailability,
    vacationDialogOpen,
    setVacationDialogOpen,
    handleVacationRequest
  } = useProviderAvailability();
  
  const scheduleForm = useForm({
    defaultValues: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
    }
  });
  
  const serviceAreaForm = useForm<ServiceAreaFormValues>({
    resolver: zodResolver(serviceAreaSchema),
    defaultValues: {
      postal_code: "",
      travel_distance: 5,
    }
  });

  useEffect(() => {
    fetchServiceAreas();
  }, []);

  const fetchServiceAreas = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("User not found, please login again");
        return;
      }
      
      const { data: areasData, error: areasError } = await supabase
        .from('provider_service_areas')
        .select('*')
        .eq('provider_id', user.id);
        
      if (!areasError && areasData) {
        setServiceAreas(areasData);
      } else if (areasError) {
        console.error("Error fetching service areas:", areasError);
      }
    } catch (error) {
      console.error("Error fetching service areas:", error);
      toast.error("Failed to load service areas");
    } finally {
      setLoading(false);
    }
  };

  const addServiceArea = async (values: ServiceAreaFormValues) => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("User not found, please login again");
        return;
      }
      
      const { error } = await supabase
        .from('provider_service_areas')
        .insert({
          provider_id: user.id,
          postal_code: values.postal_code,
          travel_distance: values.travel_distance,
        });
        
      if (error) {
        throw error;
      }
      
      toast.success("Service area added");
      serviceAreaForm.reset();
      fetchServiceAreas();
    } catch (error) {
      console.error("Error adding service area:", error);
      toast.error("Failed to add service area");
    } finally {
      setLoading(false);
    }
  };

  const removeServiceArea = async (id: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('provider_service_areas')
        .delete()
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      toast.success("Service area removed");
      fetchServiceAreas();
    } catch (error) {
      console.error("Error removing service area:", error);
      toast.error("Failed to remove service area");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-2">Availability Management</h1>
          <p className="text-muted-foreground">Manage when and where you're available for cleaning jobs</p>
        </div>
      </div>
      
      <Tabs defaultValue="schedule" className="space-y-6">
        <TabsList>
          <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
          <TabsTrigger value="service-areas">Service Areas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>Set your regular working hours for each day of the week</CardDescription>
            </CardHeader>
            <CardContent>
              <WeeklySchedule
                form={scheduleForm}
                availableDays={availableDays}
                timeRanges={timeRanges}
                toggleDayAvailability={toggleDayAvailability}
                addTimeRange={addTimeRange}
                removeTimeRange={removeTimeRange}
                updateTimeRange={updateTimeRange}
                saveAvailability={saveAvailability}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="service-areas">
          <Card>
            <CardHeader>
              <CardTitle>Service Areas</CardTitle>
              <CardDescription>Define the areas where you provide cleaning services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {serviceAreas.length > 0 ? (
                    serviceAreas.map((area) => (
                      <Card key={area.id} className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{area.postal_code}</h4>
                            <p className="text-sm text-muted-foreground">
                              Travel distance: {area.travel_distance} km
                            </p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeServiceArea(area.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <p className="text-muted-foreground col-span-2">No service areas added yet.</p>
                  )}
                </div>
                
                <Separator className="my-4" />
                
                <Form {...serviceAreaForm}>
                  <form onSubmit={serviceAreaForm.handleSubmit(addServiceArea)} className="space-y-4">
                    <h3 className="text-lg font-medium">Add Service Area</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={serviceAreaForm.control}
                        name="postal_code"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postal Code</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="e.g., 10115" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={serviceAreaForm.control}
                        name="travel_distance"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Travel Distance (km)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button type="submit" className="mt-2" disabled={loading}>
                      {loading ? "Adding..." : "Add Service Area"}
                    </Button>
                  </form>
                </Form>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <VacationRequestDialog 
        open={vacationDialogOpen}
        onOpenChange={setVacationDialogOpen}
        onVacationRequest={handleVacationRequest}
      />
    </div>
  );
};

export default ProviderAvailability;
