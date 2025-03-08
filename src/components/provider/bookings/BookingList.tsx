
import { Check, X } from "lucide-react";
import BookingCard from "./BookingCard";

interface BookingListProps {
  bookings: any[];
  type: 'upcoming' | 'pending' | 'completed';
  onSelectBooking?: (id: string) => void;
  selectedBookingId?: string;
}

const BookingList = ({ bookings, type, onSelectBooking, selectedBookingId }: BookingListProps) => {
  // Placeholder action handlers
  const handleAction = () => {};
  const handleSecondaryAction = () => {};

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
          onAction: handleAction,
          actionLabel: 'Cancel',
          actionIcon: <X className="h-4 w-4 mr-2" />,
          actionVariant: 'destructive' as const,
          selected: booking.id === selectedBookingId,
          onClick: () => onSelectBooking && onSelectBooking(booking.id)
        };

        if (type === 'upcoming') {
          // Keep default props for upcoming
        } else if (type === 'pending') {
          cardProps.actionLabel = 'Accept';
          cardProps.actionIcon = <Check className="h-4 w-4 mr-2" />;
          cardProps.actionVariant = 'default' as const;
          cardProps.secondaryAction = handleSecondaryAction;
          cardProps.secondaryLabel = 'Decline';
          cardProps.secondaryIcon = <X className="h-4 w-4 mr-2" />;
          cardProps.secondaryVariant = 'outline' as const;
        } else if (type === 'completed') {
          cardProps.actionLabel = 'Details';
          cardProps.actionIcon = undefined;
          cardProps.actionVariant = 'outline' as const;
        }

        return <BookingCard key={booking.id} {...cardProps} />;
      })}
    </div>
  );
};

export default BookingList;
