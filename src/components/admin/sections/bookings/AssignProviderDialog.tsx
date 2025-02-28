
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { Loader2 } from "lucide-react";

type ServiceProvider = Database["public"]["Tables"]["service_providers"]["Row"];
type Booking = Database["public"]["Tables"]["bookings"]["Row"];

interface AssignProviderDialogProps {
  open: boolean;
  onClose: () => void;
  bookingId: string | null;
  onAssigned: () => void;
  currentBooking?: Booking | null;
}

export const AssignProviderDialog = ({
  open,
  onClose,
  bookingId,
  onAssigned,
  currentBooking,
}: AssignProviderDialogProps) => {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [selectedProviderId, setSelectedProviderId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (open && bookingId) {
      fetchProviders();
      // Reset selection when dialog opens
      setSelectedProviderId("");
    }
  }, [open, bookingId]);

  const fetchProviders = async () => {
    setIsFetching(true);
    try {
      const { data, error } = await supabase
        .from("service_providers")
        .select("*")
        .order("first_name", { ascending: true });

      if (error) throw error;
      setProviders(data || []);
    } catch (error: any) {
      console.error("Error fetching providers:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load providers: " + error.message,
      });
    } finally {
      setIsFetching(false);
    }
  };

  const handleAssign = async () => {
    if (!bookingId || !selectedProviderId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a provider",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ provider_id: selectedProviderId, status: "assigned" })
        .eq("id", bookingId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Provider assigned successfully",
      });
      
      onAssigned();
      onClose();
    } catch (error: any) {
      console.error("Error assigning provider:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to assign provider: " + error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Provider to Booking</DialogTitle>
          <DialogDescription>
            Select a service provider to assign to this booking.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {currentBooking && (
            <div className="space-y-2">
              <h4 className="font-medium">Booking Details</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Customer:</div>
                <div>{currentBooking.first_name} {currentBooking.last_name}</div>
                <div className="text-muted-foreground">Service:</div>
                <div>{currentBooking.service_type}</div>
                <div className="text-muted-foreground">Date:</div>
                <div>{currentBooking.date ? new Date(currentBooking.date).toLocaleDateString() : 'Not scheduled'}</div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="provider">Service Provider</Label>
            {isFetching ? (
              <div className="flex items-center justify-center py-2">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              </div>
            ) : (
              <Select
                value={selectedProviderId}
                onValueChange={setSelectedProviderId}
              >
                <SelectTrigger id="provider">
                  <SelectValue placeholder="Select a provider" />
                </SelectTrigger>
                <SelectContent>
                  {providers.map((provider) => (
                    <SelectItem key={provider.id} value={provider.id}>
                      {provider.first_name} {provider.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button 
            onClick={handleAssign} 
            disabled={isLoading || !selectedProviderId}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Assign Provider
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
