
import { useState, useEffect } from 'react';
import { useTitle } from '@/hooks/useTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

const ProviderBookings = () => {
  useTitle('Provider Bookings');
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Placeholder data for development
  const upcomingBookings = [
    { 
      id: '1', 
      clientName: 'John Smith',
      address: '123 Main St, Apt 4B, Berlin',
      date: new Date(Date.now() + 86400000), // Tomorrow
      time: '14:00 - 16:00',
      service: 'Regular Cleaning',
      hours: 2,
    },
    { 
      id: '2', 
      clientName: 'Emma Johnson',
      address: '456 Elm St, Berlin',
      date: new Date(Date.now() + 172800000), // Day after tomorrow
      time: '10:00 - 13:00',
      service: 'Deep Cleaning',
      hours: 3,
    }
  ];
  
  const pendingBookings = [
    { 
      id: '3', 
      clientName: 'Michael Brown',
      address: '789 Oak St, Berlin',
      date: new Date(Date.now() + 345600000), // 4 days from now
      time: '09:00 - 12:00',
      service: 'Move-In Cleaning',
      hours: 3,
      isConfirmationPending: true
    }
  ];
  
  const completedBookings = [
    { 
      id: '4', 
      clientName: 'Sarah Miller',
      address: '101 Pine St, Berlin',
      date: new Date(Date.now() - 86400000), // Yesterday
      time: '13:00 - 15:00',
      service: 'Regular Cleaning',
      hours: 2,
      completed: true
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Your Bookings</h1>
        <p className="text-muted-foreground">Manage your cleaning assignments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="space-y-4">
              {upcomingBookings.map(booking => (
                <BookingCard 
                  key={booking.id}
                  booking={booking}
                  onAction={() => {}}
                  actionLabel="Cancel"
                  actionIcon={<X className="h-4 w-4 mr-2" />}
                  actionVariant="destructive"
                />
              ))}
              {upcomingBookings.length === 0 && (
                <p className="text-center py-6 text-muted-foreground">No upcoming bookings</p>
              )}
            </TabsContent>
            
            <TabsContent value="pending" className="space-y-4">
              {pendingBookings.map(booking => (
                <BookingCard 
                  key={booking.id}
                  booking={booking}
                  onAction={() => {}}
                  actionLabel="Accept"
                  actionIcon={<Check className="h-4 w-4 mr-2" />}
                  actionVariant="default"
                  secondaryAction={() => {}}
                  secondaryLabel="Decline"
                  secondaryIcon={<X className="h-4 w-4 mr-2" />}
                  secondaryVariant="outline"
                />
              ))}
              {pendingBookings.length === 0 && (
                <p className="text-center py-6 text-muted-foreground">No pending bookings</p>
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-4">
              {completedBookings.map(booking => (
                <BookingCard 
                  key={booking.id}
                  booking={booking}
                  onAction={() => {}}
                  actionLabel="Details"
                  actionVariant="outline"
                />
              ))}
              {completedBookings.length === 0 && (
                <p className="text-center py-6 text-muted-foreground">No completed bookings</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

interface BookingCardProps {
  booking: any;
  onAction: () => void;
  actionLabel: string;
  actionIcon?: React.ReactNode;
  actionVariant?: 'default' | 'destructive' | 'outline';
  secondaryAction?: () => void;
  secondaryLabel?: string;
  secondaryIcon?: React.ReactNode;
  secondaryVariant?: 'default' | 'destructive' | 'outline';
}

const BookingCard = ({
  booking,
  onAction,
  actionLabel,
  actionIcon,
  actionVariant = 'default',
  secondaryAction,
  secondaryLabel,
  secondaryIcon,
  secondaryVariant = 'outline',
}: BookingCardProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{booking.clientName}</h3>
            <p className="text-muted-foreground text-sm">{booking.address}</p>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm font-medium">{booking.date.toLocaleDateString()}</p>
                <p className="text-sm text-muted-foreground">{booking.time}</p>
              </div>
              <div>
                <p className="text-sm font-medium">{booking.service}</p>
                <p className="text-sm text-muted-foreground">{booking.hours} hours</p>
              </div>
            </div>
          </div>
          
          <div className="flex mt-4 md:mt-0 gap-2 self-end">
            {secondaryAction && secondaryLabel && (
              <Button 
                variant={secondaryVariant} 
                onClick={secondaryAction}
                size="sm"
              >
                {secondaryIcon}
                {secondaryLabel}
              </Button>
            )}
            <Button 
              variant={actionVariant} 
              onClick={onAction}
              size="sm"
            >
              {actionIcon}
              {actionLabel}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderBookings;
