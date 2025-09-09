
import { format } from "date-fns";
import { CalendarIcon, Clock, MapPin, AlertCircle } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface BookingCardProps {
  booking: any;
  onAction: () => void;
  actionLabel: string;
  actionIcon?: React.ReactNode;
  actionVariant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "home";
  secondaryAction?: () => void;
  secondaryLabel?: string;
  secondaryIcon?: React.ReactNode;
  secondaryVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "home";
  selected?: boolean;
  onClick?: () => void;
}

const BookingCard = ({
  booking,
  onAction,
  actionLabel,
  actionIcon,
  actionVariant,
  secondaryAction,
  secondaryLabel,
  secondaryIcon,
  secondaryVariant,
  selected = false,
  onClick,
}: BookingCardProps) => {
  const isToday = booking.date && new Date(booking.date).toDateString() === new Date().toDateString();
  const isPending = 'isConfirmationPending' in booking && booking.isConfirmationPending;

  return (
    <Card 
      className={cn(
        "hover:shadow-md transition-shadow cursor-pointer overflow-hidden shadow-sm", 
        selected && "border-2 border-primary",
        isToday && "border-l-4 border-l-blue-500"
      )}
      onClick={onClick}
    >
      {isPending && (
        <div className="bg-amber-50 dark:bg-amber-900/20 py-1.5 px-4 border-b border-amber-100 dark:border-amber-800">
          <div className="flex items-center text-xs text-amber-700 dark:text-amber-400">
            <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
            Needs confirmation
          </div>
        </div>
      )}
      
      <CardContent className="card-spacing-sm">
        <div className="form-spacing-tight">
          <div className="flex justify-between">
            <h3 className="font-medium text-sm md:text-base">{booking.clientName}</h3>
            <Badge variant={isToday ? "default" : "outline"} className={isToday ? "bg-blue-500" : ""}>
              {booking.service}
            </Badge>
          </div>
          
          <div className="flex items-start text-xs md:text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1 mt-0.5 shrink-0" />
            <span>{booking.address}</span>
          </div>
          
          <div className="flex items-center justify-between text-xs md:text-sm">
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1" />
              <span>
                {booking.date ? format(new Date(booking.date), "MMM dd, yyyy") : "TBD"}
                {isToday && <span className="ml-1 text-blue-500 font-medium">Today</span>}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{booking.time}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="card-spacing-sm pt-0 flex justify-between gap-2">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onAction();
          }}
          variant={actionVariant}
          size="sm"
          className="flex-1 text-xs"
        >
          {actionIcon}
          {actionLabel}
        </Button>
        
        {secondaryAction && secondaryLabel && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              secondaryAction();
            }}
            variant={secondaryVariant || "outline"}
            size="sm"
            className="flex-1 text-xs"
          >
            {secondaryIcon}
            {secondaryLabel}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BookingCard;
