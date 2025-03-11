
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, CalendarClock, Info } from "lucide-react";

interface BookingDetailsCardProps {
  selectedBooking: any | null;
  onClose: () => void;
}

const BookingDetailsCard = ({ selectedBooking, onClose }: BookingDetailsCardProps) => {
  if (!selectedBooking) {
    return (
      <Card className="p-4 md:p-6 h-full flex flex-col items-center justify-center text-center shadow-sm">
        <Info className="h-10 w-10 text-muted-foreground mb-4 opacity-50" />
        <h3 className="text-lg font-medium mb-2">Booking Details</h3>
        <p className="text-sm text-muted-foreground mb-4">Select a booking to view details</p>
      </Card>
    );
  }

  return (
    <Card className="p-4 md:p-6 h-full shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-lg md:text-xl font-bold">{selectedBooking.clientName}</h3>
        <Button variant="outline" size="sm" className="text-xs" onClick={onClose}>
          Close
        </Button>
      </div>
      
      <div className="space-y-5">
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h4 className="font-medium mb-1">Location</h4>
            <p className="text-sm text-muted-foreground">{selectedBooking.address}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <CalendarClock className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h4 className="font-medium mb-1">Schedule</h4>
            <p className="text-sm">{selectedBooking.date ? new Date(selectedBooking.date).toLocaleDateString() : 'TBD'}</p>
            <p className="text-sm text-muted-foreground">{selectedBooking.time}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h4 className="font-medium mb-1">Service Details</h4>
            <p className="text-sm">{selectedBooking.service}</p>
            <p className="text-sm text-muted-foreground">{selectedBooking.hours} hour{selectedBooking.hours !== 1 ? 's' : ''}</p>
          </div>
        </div>
        
        <div className="pt-4 space-y-3">
          <Button className="w-full">Navigate to Location</Button>
          <Button variant="outline" className="w-full">Contact Client</Button>
        </div>
      </div>
    </Card>
  );
};

export default BookingDetailsCard;
