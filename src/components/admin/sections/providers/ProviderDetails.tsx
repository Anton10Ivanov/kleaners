
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Database } from "@/integrations/supabase/types";
import { Badge } from "@/components/ui/badge";
import { Calendar, Phone, Mail, Award } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ServiceProvider = Database["public"]["Tables"]["service_providers"]["Row"];
type Booking = Database["public"]["Tables"]["bookings"]["Row"];

interface ProviderDetailsProps {
  open: boolean;
  onClose: () => void;
  provider: ServiceProvider | null;
}

export const ProviderDetails = ({ open, onClose, provider }: ProviderDetailsProps) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open && provider) {
      fetchProviderBookings();
    }
  }, [open, provider]);

  const fetchProviderBookings = async () => {
    if (!provider) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("provider_id", provider.id)
        .order("date", { ascending: false });
        
      if (error) throw error;
      
      setBookings(data || []);
    } catch (error) {
      console.error("Error fetching provider bookings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate some metrics
  const totalBookings = bookings.length;
  const completedBookings = bookings.filter(b => b.status === "completed").length;
  const upcomingBookings = bookings.filter(b => ["confirmed", "assigned"].includes(b.status || "")).length;
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Provider Details</DialogTitle>
        </DialogHeader>
        
        {provider && (
          <div className="mt-4 space-y-6">
            {/* Provider Basic Info */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full h-20 w-20 flex items-center justify-center text-2xl font-bold">
                {provider.first_name[0]}{provider.last_name[0]}
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">
                  {provider.first_name} {provider.last_name}
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Mail className="h-4 w-4 mr-1" />
                    {provider.email}
                  </div>
                  
                  {provider.phone && (
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Phone className="h-4 w-4 mr-1" />
                      {provider.phone}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {provider.services && provider.services.map(service => (
                    <Badge key={service} variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-green-800 dark:text-green-300">Completed</h4>
                <p className="text-2xl font-bold">{completedBookings}</p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">Upcoming</h4>
                <p className="text-2xl font-bold">{upcomingBookings}</p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-purple-800 dark:text-purple-300">Total</h4>
                <p className="text-2xl font-bold">{totalBookings}</p>
              </div>
            </div>
            
            {/* Tabs */}
            <Tabs defaultValue="bookings">
              <TabsList className="w-full">
                <TabsTrigger value="bookings" className="flex-1">Bookings</TabsTrigger>
                <TabsTrigger value="availability" className="flex-1">Availability</TabsTrigger>
                <TabsTrigger value="performance" className="flex-1">Performance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="bookings" className="mt-4">
                <div className="rounded-md border overflow-hidden">
                  {isLoading ? (
                    <div className="p-4 text-center text-gray-500">Loading bookings...</div>
                  ) : bookings.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th className="px-4 py-3 text-left">Date</th>
                            <th className="px-4 py-3 text-left">Client</th>
                            <th className="px-4 py-3 text-left">Service</th>
                            <th className="px-4 py-3 text-left">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {bookings.map(booking => (
                            <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                              <td className="px-4 py-3">
                                {booking.date ? new Date(booking.date).toLocaleDateString() : 'Not scheduled'}
                              </td>
                              <td className="px-4 py-3">
                                {booking.first_name} {booking.last_name}
                              </td>
                              <td className="px-4 py-3">
                                {booking.service_type}
                              </td>
                              <td className="px-4 py-3">
                                <Badge variant="outline" className={
                                  booking.status === 'completed' ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300' :
                                  booking.status === 'confirmed' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300' :
                                  booking.status === 'assigned' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300' :
                                  booking.status === 'cancelled' ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300' :
                                  'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300'
                                }>
                                  {booking.status || 'pending'}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">No bookings found for this provider</div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="availability" className="mt-4">
                <div className="p-4 border rounded-md">
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center space-y-2">
                      <Calendar className="h-16 w-16 mx-auto text-gray-400" />
                      <p>Provider availability coming soon</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="performance" className="mt-4">
                <div className="p-4 border rounded-md">
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center space-y-2">
                      <Award className="h-16 w-16 mx-auto text-gray-400" />
                      <p>Performance metrics coming soon</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
