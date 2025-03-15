
import { Check, X } from "lucide-react";
import BookingCard from "./BookingCard";

interface BookingListProps {
  bookings: any[];
  type: 'upcoming' | 'pending' | 'completed';
  onSelectBooking?: (id: string) => void;
  selectedBookingId?: string;
  onAcceptJob?: (bookingId: string) => void;
  onRejectJob?: (bookingId: string) => void;
}

const BookingList = ({ 
  bookings, 
  type, 
  onSelectBooking, 
  selectedBookingId,
  onAcceptJob,
  onRejectJob
}: BookingListProps) => {
  
  if (bookings.length === 0) {
    return (
      <p className="text-center py-6 text-muted-foreground">
        No {type} bookings
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => {
        // Base card props
        const cardProps: any = {
          booking,
          selected: booking.id === selectedBookingId,
          onClick: () => onSelectBooking && onSelectBooking(booking.id)
        };

        if (type === 'upcoming') {
          cardProps.actionLabel = 'Cancel';
          cardProps.actionIcon = <X className="h-4 w-4 mr-2" />;
          cardProps.actionVariant = 'destructive' as const;
          cardProps.onAction = () => {};
        } else if (type === 'pending') {
          // Simplified actions for pending jobs
          cardProps.actionLabel = 'Accept Job';
          cardProps.actionIcon = <Check className="h-4 w-4 mr-2" />;
          cardProps.actionVariant = 'default' as const;
          cardProps.onAction = () => onAcceptJob && onAcceptJob(booking.id);
          
          cardProps.secondaryLabel = 'Reject Job';
          cardProps.secondaryIcon = <X className="h-4 w-4 mr-2" />;
          cardProps.secondaryVariant = 'outline' as const;
          cardProps.secondaryAction = () => onRejectJob && onRejectJob(booking.id);
        } else if (type === 'completed') {
          cardProps.actionLabel = 'Details';
          cardProps.actionIcon = undefined;
          cardProps.actionVariant = 'outline' as const;
          cardProps.onAction = () => {};
        }

        return <BookingCard key={booking.id} {...cardProps} />;
      })}
    </div>
  );
};

export default BookingList;
