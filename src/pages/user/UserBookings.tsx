
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2
} from "lucide-react";
import { BookingStatus } from "@/components/admin/sections/bookings/types";
import type { User } from "@/types/supabase";

interface UserContextType {
  user: User;
}

const UserBookings = () => {
  const { user } = useOutletContext<UserContextType>();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>("upcoming");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', user.id)
          .order('date', { ascending: true });
        
        if (error) throw error;
        setBookings(data || []);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  const getFilteredBookings = () => {
    const now = new Date();
    
    switch (activeTab) {
      case "upcoming":
        return bookings.filter(booking => 
          new Date(booking.date) >= now && 
          (booking.status === 'pending' || booking.status === 'confirmed')
        );
      case "completed":
        return bookings.filter(booking => booking.status === 'completed');
      case "cancelled":
        return bookings.filter(booking => booking.status === 'cancelled');
      default:
        return bookings;
    }
  };

  const getStatusBadgeClass = (status: BookingStatus) => {
    switch (status) {
      case 'pending':
        return "bg-yellow-100 text-yellow-800";
      case 'confirmed':
        return "bg-blue-100 text-blue-800";
      case 'completed':
        return "bg-green-100 text-green-800";
      case 'cancelled':
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'confirmed':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const filteredBookings = getFilteredBookings();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold">My Bookings</h1>
        <p className="text-muted-foreground">View and manage your cleaning services</p>
      </div>

      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          <TabsTrigger value="all">All Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          {filteredBookings.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No {activeTab} bookings found</h3>
                <p className="text-muted-foreground mb-4">
                  {activeTab === 'upcoming' ? 'Schedule your next cleaning service now!' : 'Your booking history will appear here.'}
                </p>
                {activeTab === 'upcoming' && (
                  <Button>Book a Service</Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredBookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{booking.service_type}</CardTitle>
                      <CardDescription>Booking #{booking.id.substring(0, 8)}</CardDescription>
                    </div>
                    <div className={`
                      px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1
                      ${getStatusBadgeClass(booking.status)}
                    `}>
                      {getStatusIcon(booking.status)}
                      <span className="capitalize">{booking.status}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Date & Time</p>
                        <p className="text-sm text-muted-foreground">{formatDate(booking.date)}</p>
                        <p className="text-sm text-muted-foreground">{booking.preferredTime || 'Time to be confirmed'}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">{booking.address || 'Address not provided'}</p>
                        <p className="text-sm text-muted-foreground">{booking.postal_code}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Service Details</p>
                      <div className="text-sm text-muted-foreground mt-1">
                        <p>Duration: {booking.hours} hours</p>
                        <p>Frequency: {booking.frequency}</p>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium">Price</p>
                      <p className="text-lg font-semibold mt-1">
                        ${booking.total_price?.toFixed(2) || '(Price to be confirmed)'}
                      </p>
                    </div>
                  </div>

                  {(booking.status === 'pending' || booking.status === 'confirmed') && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button variant="outline">Reschedule</Button>
                      <Button variant="outline" className="text-red-500 hover:text-red-700">Cancel</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserBookings;
