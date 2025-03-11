
import React from 'react';
import { format } from 'date-fns';
import { CalendarClock, Clock, Home, MapPin, Phone, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Box } from '@/components/layout/Box';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface BookingDetailsCardProps {
  booking: any;
  onClose: () => void;
}

const BookingDetailsCard = ({ booking, onClose }: BookingDetailsCardProps) => {
  // Function to format date string
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'PPP');
    } catch (error) {
      return dateString || 'N/A';
    }
  };

  // Function to format time string
  const formatTime = (dateString: string) => {
    try {
      return format(new Date(dateString), 'p');
    } catch (error) {
      return '';
    }
  };

  // Function to get badge color based on status
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  // Function to get service type display name
  const getServiceName = (serviceType: string) => {
    switch (serviceType) {
      case 'regular':
        return 'Regular Cleaning';
      case 'deep':
        return 'Deep Cleaning';
      case 'move_in_out':
        return 'Move In/Out Cleaning';
      case 'business':
        return 'Business Cleaning';
      default:
        return serviceType?.replace(/_/g, ' ') || 'N/A';
    }
  };

  return (
    <Box className="bg-white dark:bg-gray-800 rounded-lg shadow-sm h-full">
      <div className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold">Booking Details</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      <div className="p-4 space-y-4">
        {/* Status Badge */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-muted-foreground">Status</span>
          <Badge className={`${getStatusColor(booking.status)}`}>
            {booking.status || 'N/A'}
          </Badge>
        </div>

        {/* Service Type */}
        <div>
          <span className="text-sm font-medium text-muted-foreground">Service</span>
          <p className="mt-1 font-medium">{getServiceName(booking.service_type)}</p>
        </div>

        {/* Date and Time */}
        <div className="flex items-start gap-2">
          <CalendarClock className="h-4 w-4 text-muted-foreground mt-0.5" />
          <div>
            <p className="font-medium">{booking.date ? formatDate(booking.date) : 'N/A'}</p>
            <p className="text-sm text-muted-foreground">{booking.date ? formatTime(booking.date) : ''}</p>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <p>{booking.hours ? `${booking.hours} hours` : 'N/A'}</p>
        </div>

        <Separator />

        {/* Client Information */}
        <div>
          <span className="text-sm font-medium text-muted-foreground">Client</span>
          <div className="mt-1 flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <p className="font-medium">
              {booking.first_name && booking.last_name
                ? `${booking.first_name} ${booking.last_name}`
                : 'N/A'}
            </p>
          </div>
          {booking.phone && (
            <div className="mt-1 flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <p>{booking.phone}</p>
            </div>
          )}
        </div>

        <Separator />

        {/* Address */}
        <div>
          <span className="text-sm font-medium text-muted-foreground">Address</span>
          <div className="mt-1 flex items-start gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium">{booking.address || 'N/A'}</p>
              {booking.postal_code && (
                <p className="text-sm text-muted-foreground">{booking.postal_code}</p>
              )}
            </div>
          </div>
        </div>

        {/* Details */}
        <div>
          <span className="text-sm font-medium text-muted-foreground">Details</span>
          <div className="mt-1 grid grid-cols-2 gap-2">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-md text-center">
              <p className="text-xs text-muted-foreground">Bedrooms</p>
              <p className="font-medium">{booking.bedrooms || '0'}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-md text-center">
              <p className="text-xs text-muted-foreground">Bathrooms</p>
              <p className="font-medium">{booking.bathrooms || '0'}</p>
            </div>
          </div>
        </div>

        {/* Extras */}
        {booking.extras && booking.extras.length > 0 && (
          <div>
            <span className="text-sm font-medium text-muted-foreground">Extras</span>
            <div className="mt-1 flex flex-wrap gap-1">
              {booking.extras.map((extra: string, index: number) => (
                <Badge key={index} variant="outline">
                  {extra.replace(/_/g, ' ')}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Special Instructions */}
        {booking.special_instructions && (
          <div>
            <span className="text-sm font-medium text-muted-foreground">Special Instructions</span>
            <p className="mt-1 text-sm p-3 bg-muted rounded-md">{booking.special_instructions}</p>
          </div>
        )}

        {/* Price */}
        <div className="mt-4 p-3 bg-primary/10 rounded-md flex justify-between items-center">
          <span className="font-medium">Total Price</span>
          <span className="text-xl font-bold">
            ${booking.total_price ? booking.total_price.toFixed(2) : 'N/A'}
          </span>
        </div>
      </div>
    </Box>
  );
};

export default BookingDetailsCard;
