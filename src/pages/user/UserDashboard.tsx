
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, Clock, Package, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UserContextType {
  user: User;
}

type UserBookingSummary = {
  total: number;
  upcoming: number;
  completed: number;
  cancelled: number;
}

const UserDashboard = () => {
  const { user } = useOutletContext<UserContextType>();
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState<any>(null);
  const [bookingSummary, setBookingSummary] = useState<UserBookingSummary>({
    total: 0,
    upcoming: 0,
    completed: 0,
    cancelled: 0
  });
  const [nextBooking, setNextBooking] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch customer data
        const { data: customerData, error: customerError } = await supabase
          .from('customers')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (customerError) throw customerError;
        setCustomer(customerData);

        // Fetch booking summary
        const { data: bookings, error: bookingsError } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', user.id);
        
        if (bookingsError) throw bookingsError;
        
        const upcoming = bookings.filter(b => 
          new Date(b.date) > new Date() && 
          (b.status === 'pending' || b.status === 'confirmed')
        );
        
        const completed = bookings.filter(b => b.status === 'completed');
        const cancelled = bookings.filter(b => b.status === 'cancelled');
        
        setBookingSummary({
          total: bookings.length,
          upcoming: upcoming.length,
          completed: completed.length,
          cancelled: cancelled.length
        });

        // Get next upcoming booking
        if (upcoming.length > 0) {
          const sortedUpcoming = [...upcoming].sort((a, b) => 
            new Date(a.date).getTime() - new Date(b.date).getTime()
          );
          setNextBooking(sortedUpcoming[0]);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {customer?.first_name || 'there'}!</h1>
        <p className="text-muted-foreground">Here's an overview of your cleaning services.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                <h3 className="text-2xl font-bold mt-1">{bookingSummary.total}</h3>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <Package className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Upcoming Bookings</p>
                <h3 className="text-2xl font-bold mt-1">{bookingSummary.upcoming}</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed Bookings</p>
                <h3 className="text-2xl font-bold mt-1">{bookingSummary.completed}</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cancelled Bookings</p>
                <h3 className="text-2xl font-bold mt-1">{bookingSummary.cancelled}</h3>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <AlertCircle className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Next Cleaning Service</CardTitle>
            <CardDescription>Your upcoming booking details</CardDescription>
          </CardHeader>
          <CardContent>
            {nextBooking ? (
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-medium text-lg">{nextBooking.service_type}</h4>
                    <p className="text-muted-foreground">
                      {new Date(nextBooking.date).toLocaleDateString('en-US', { 
                        weekday: 'long',
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {nextBooking.preferredTime || 'Time to be confirmed'}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button onClick={() => navigate('/user/bookings')}>
                      View Details
                    </Button>
                    <Button variant="outline">
                      Reschedule
                    </Button>
                  </div>
                </div>
                <div className="text-sm border-t pt-4 mt-4">
                  <p className="font-medium">Service address:</p>
                  <p className="text-muted-foreground">{nextBooking.address || 'Address not provided'}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No upcoming bookings</h3>
                <p className="text-muted-foreground mb-4">Schedule your next cleaning service now</p>
                <Button onClick={() => navigate('/services/regular-cleaning')}>
                  Book a Service
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/services/regular-cleaning')}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Book New Service
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/user/bookings')}
              >
                <Clock className="mr-2 h-4 w-4" />
                View All Bookings
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/user/profile')}
              >
                <UserCircle className="mr-2 h-4 w-4" />
                Update Profile
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/contact')}
              >
                <AlertCircle className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
