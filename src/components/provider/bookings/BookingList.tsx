import { Check, X } from "lucide-react";
import BookingCard from "./BookingCard";

interface BookingListProps {
  bookings: any[];
  type: 'upcoming' | 'pending' | 'completed';
}

const BookingList = ({ bookings, type }: BookingListProps) => {
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
        // Configure card props based on booking type
        const cardProps = {
          booking,
          onAction: handleAction,
          actionLabel: 'Cancel',
          actionIcon: <X className="h-4 w-4 mr-2" />,
          actionVariant: 'destructive' as const,
        };

        if (type === 'upcoming') {
          // Keep default props for upcoming
        } else if (type === 'pending') {
          cardProps.actionLabel = 'Accept';
          cardProps.actionIcon = <Check className="h-4 w-4 mr-2" />;
          cardProps.actionVariant = 'default';
          cardProps.secondaryAction = handleSecondaryAction;
          cardProps.secondaryLabel = 'Decline';
          cardProps.secondaryIcon = <X className="h-4 w-4 mr-2" />;
          cardProps.secondaryVariant = 'outline';
        } else if (type === 'completed') {
          cardProps.actionLabel = 'Details';
          cardProps.actionIcon = undefined;
          cardProps.actionVariant = 'outline';
        }

        return <BookingCard key={booking.id} {...cardProps} />;
      })}
    </div>
  );
};

export default BookingList;
