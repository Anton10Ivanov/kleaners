
import { format } from "date-fns";
import { CalendarIcon, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
  return (
    <Card 
      className={cn(
        "hover:shadow-md transition-shadow cursor-pointer", 
        selected && "border-2 border-primary"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <h3 className="font-medium">{booking.clientName}</h3>
            <span className="text-sm font-medium">{booking.service}</span>
          </div>
          
          <div className="flex items-start text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1 mt-0.5 shrink-0" />
            <span>{booking.address}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1" />
              <span>
                {booking.date ? format(booking.date, "MMM dd, yyyy") : "TBD"}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{booking.time}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between gap-2">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onAction();
          }}
          variant={actionVariant}
          size="sm"
          className="flex-1"
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
            className="flex-1"
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
