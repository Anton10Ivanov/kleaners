
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

export default BookingCard;
