
import { useState } from "react";
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { Calendar, Clock } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';

interface QuickAvailabilityToggleProps {
  initialAvailability: boolean;
  providerId: string;
  onStatusChange?: (status: boolean) => void;
}

export const QuickAvailabilityToggle = ({
  initialAvailability = true,
  providerId,
  onStatusChange,
}: QuickAvailabilityToggleProps) => {
  const [isAvailable, setIsAvailable] = useState(initialAvailability);
  const [isLoading, setIsLoading] = useState(false);

  const toggleAvailability = async () => {
    try {
      setIsLoading(true);
      
      // Toggle the state first for a responsive UI experience (optimistic update)
      const newAvailabilityStatus = !isAvailable;
      setIsAvailable(newAvailabilityStatus);
      
      // Make the API call to update the provider's availability status
      const { error } = await supabase
        .from('service_providers')
        .update({ is_available: newAvailabilityStatus })
        .eq('id', providerId);
      
      if (error) {
        throw error;
      }
      
      // Call the callback if provided
      if (onStatusChange) {
        onStatusChange(newAvailabilityStatus);
      }
      
      // Show success message
      toast.success(
        newAvailabilityStatus 
          ? "You are now marked as available for bookings" 
          : "You are now marked as unavailable for bookings"
      );
    } catch (error) {
      console.error("Error toggling availability:", error);
      
      // Revert the optimistic update if there was an error
      setIsAvailable(isAvailable);
      
      toast.error("Failed to update availability status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg card-spacing-sm flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          <Clock className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-medium">Availability Status</h3>
          <p className="text-sm text-muted-foreground">
            {isAvailable 
              ? "You're currently available for new bookings" 
              : "You're currently unavailable for new bookings"}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Switch
            checked={isAvailable}
            onCheckedChange={toggleAvailability}
            disabled={isLoading}
            aria-label="Toggle availability"
          />
          <Label htmlFor="availability-toggle">
            {isAvailable ? "Available" : "Unavailable"}
          </Label>
        </div>
        
        <Button variant="outline" size="sm" asChild>
          <a href="/provider/availability">
            <Calendar className="mr-2 h-4 w-4" />
            Manage Schedule
          </a>
        </Button>
      </div>
    </div>
  );
};
