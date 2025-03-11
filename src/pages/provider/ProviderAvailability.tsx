
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
import { CalendarClock, MapPin, Plus } from 'lucide-react';

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
    <div className="space-y-8 pb-16 md:pb-0 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <CalendarClock className="h-6 w-6 text-primary" />
            Availability Management
          </h1>
          <p className="text-muted-foreground">Set your working hours and service areas for optimal client matching</p>
        </div>
        <Button 
          onClick={() => setVacationDialogOpen(true)}
          className="bg-gradient-to-r from-primary to-primary-hover text-white hover:opacity-90 transition-all font-medium"
        >
          Request Vacation
        </Button>
      </div>
      
      <Tabs defaultValue="schedule" className="space-y-6">
        <TabsList className="w-full md:w-auto grid grid-cols-2 mb-4">
          <TabsTrigger value="schedule" className="text-sm px-6">Weekly Schedule</TabsTrigger>
          <TabsTrigger value="service-areas" className="text-sm px-6">Service Areas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="schedule" className="pt-2">
          <Card className="border shadow-sm bg-card hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <CalendarClock className="h-5 w-5 text-primary" />
                Weekly Working Hours
              </CardTitle>
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
        
        <TabsContent value="service-areas" className="pt-2">
          <Card className="border shadow-sm bg-card hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Service Coverage
              </CardTitle>
              <CardDescription>Define the areas where you provide cleaning services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {serviceAreas.length > 0 ? (
                    serviceAreas.map((area) => (
                      <Card key={area.id} className="p-4 border border-border/50 hover:border-primary/30 transition-all">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <h4 className="font-medium flex items-center gap-1.5">
                              <MapPin className="h-4 w-4 text-primary" />
                              {area.postal_code}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Travel radius: {area.travel_distance} km
                            </p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeServiceArea(area.id)}
                            className="text-destructive hover:text-destructive/90 hover:bg-destructive/10 -mt-1 -mr-2"
                          >
                            Remove
                          </Button>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full py-6 text-center border border-dashed rounded-lg bg-muted/30">
                      <MapPin className="h-10 w-10 text-muted-foreground mx-auto mb-2 opacity-60" />
                      <p className="text-muted-foreground">No service areas added yet.</p>
                      <p className="text-sm text-muted-foreground">Add your first service area below.</p>
                    </div>
                  )}
                </div>
                
                <Separator className="my-6" />
                
                <Form {...serviceAreaForm}>
                  <form onSubmit={serviceAreaForm.handleSubmit(addServiceArea)} className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Plus className="h-4 w-4 text-primary" />
                      <h3 className="text-lg font-medium">Add Service Area</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={serviceAreaForm.control}
                        name="postal_code"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postal Code</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="e.g., 10115" className="bg-background" />
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
                                className="bg-background"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="mt-4 bg-gradient-to-r from-primary to-primary-hover text-white hover:opacity-90 transition-all" 
                      disabled={loading}
                    >
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
