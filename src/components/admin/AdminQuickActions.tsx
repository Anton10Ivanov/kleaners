
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Plus, RotateCw, Send, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * AdminQuickActions Component
 * 
 * Provides shortcut buttons for common admin actions
 * 
 * @returns {JSX.Element} Admin quick actions component
 */
export function AdminQuickActions(): JSX.Element {
  const navigate = useNavigate();
  
  /**
   * Navigate to customer creation page
   */
  const goToAddCustomer = () => {
    navigate("/admin/customers/new");
  };
  
  /**
   * Navigate to booking creation page
   */
  const goToAddBooking = () => {
    navigate("/admin/bookings/new");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Shortcuts to common tasks and activities
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Button 
          variant="outline" 
          className="flex h-24 flex-col items-center justify-center gap-1"
          onClick={goToAddCustomer}
        >
          <UserPlus className="h-5 w-5" />
          <span className="text-xs">Add Customer</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="flex h-24 flex-col items-center justify-center gap-1"
          onClick={goToAddBooking}
        >
          <Plus className="h-5 w-5" />
          <span className="text-xs">New Booking</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="flex h-24 flex-col items-center justify-center gap-1"
        >
          <Calendar className="h-5 w-5" />
          <span className="text-xs">View Schedule</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="flex h-24 flex-col items-center justify-center gap-1"
        >
          <Send className="h-5 w-5" />
          <span className="text-xs">Send Updates</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="flex h-24 flex-col items-center justify-center gap-1"
        >
          <RotateCw className="h-5 w-5" />
          <span className="text-xs">Sync Data</span>
        </Button>
      </CardContent>
    </Card>
  );
}

export default AdminQuickActions;
