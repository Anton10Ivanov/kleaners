
import { formatDistanceToNow } from "date-fns";
import { CalendarDays, Clock, MapPin, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * Booking status type
 */
export type BookingStatus = "pending" | "completed" | "cancelled";

/**
 * BookingCardProps interface
 */
export interface BookingCardProps {
  /**
   * Unique identifier for the booking
   */
  id: string;
  
  /**
   * Type of cleaning service
   */
  service: string;
  
  /**
   * Current status of the booking
   */
  status: BookingStatus;
  
  /**
   * Date when the booking was created
   */
  bookingDate?: string;
  
  /**
   * Scheduled date for the service
   */
  scheduledDate?: string;
  
  /**
   * Scheduled time for the service
   */
  scheduledTime?: string;
  
  /**
   * Number of hours booked for the service
   */
  hours: number;
  
  /**
   * Frequency of the service (e.g., weekly, biweekly)
   */
  frequency?: string;
  
  /**
   * Service location address
   */
  address?: string;
}

/**
 * BookingCard Component
 * 
 * Displays information about a single booking in a card format
 * 
 * @param {BookingCardProps} props - Component props
 * @returns {JSX.Element} A booking card component
 */
export const BookingCard = ({
  id,
  service,
  status,
  bookingDate,
  scheduledDate,
  scheduledTime,
  hours,
  frequency,
  address,
}: BookingCardProps): JSX.Element => {
  const navigate = useNavigate();

  /**
   * Returns the appropriate status badge based on booking status
   * @param {BookingStatus} status - The booking status
   * @returns {JSX.Element} The status badge
   */
  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Upcoming</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  /**
   * Formats the service name for display
   * @param {string} serviceType - The raw service type
   * @returns {string} The formatted service name
   */
  const getFormattedServiceName = (serviceType: string) => {
    switch (serviceType) {
      case "regular":
        return "Regular Cleaning";
      case "moveInOut":
        return "Move In/Out";
      case "business":
        return "Business Cleaning";
      case "construction":
        return "Construction Cleaning";
      default:
        return serviceType;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-2 pt-3">
        <div className="flex justify-between items-start mb-1">
          <CardTitle className="text-base md:text-lg">
            {getFormattedServiceName(service)}
          </CardTitle>
          {getStatusBadge(status)}
        </div>
        <p className="text-xs text-muted-foreground">
          {bookingDate
            ? `Booked ${formatDistanceToNow(new Date(bookingDate), { addSuffix: true })}`
            : "Recently booked"}
        </p>
      </CardHeader>

      <CardContent className="space-y-3 pb-3">
        <div className="flex items-start">
          <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium">{scheduledDate || "Schedule pending"}</p>
            <p className="text-xs text-muted-foreground">{scheduledTime || "Time to be confirmed"}</p>
          </div>
        </div>

        <div className="flex items-start">
          <Clock className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" aria-hidden="true" />
          <p className="text-sm">
            {hours} {hours === 1 ? "hour" : "hours"}
            {frequency && ` (${frequency === "weekly" ? "Weekly" : frequency === "biweekly" ? "Biweekly" : "One-time"})`}
          </p>
        </div>

        <div className="flex items-start">
          <MapPin className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" aria-hidden="true" />
          <p className="text-sm">{address || "Address not provided"}</p>
        </div>
      </CardContent>

      <CardFooter className="pt-0 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-between hover:bg-primary/5 py-2.5 focus:ring-2 focus:ring-primary focus:ring-offset-2"
          onClick={() => navigate(`/user/bookings/${id}`)}
          aria-label={`View details for ${getFormattedServiceName(service)} booking on ${scheduledDate || 'unscheduled date'}`}
        >
          <span>View Details</span>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingCard;
