
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog";
import { Button } from '@/components/ui/button";
import { Label } from '@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select";
import { Booking } from "./types";

// Mock data for providers
const MOCK_PROVIDERS = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Robert Johnson" },
];

interface AssignProviderData {
  bookingId: string;
  providerId: string;
}

export interface AssignProviderDialogProps {
  open: boolean;
  onClose: () => void;
  booking: Booking;
  onAssign: (data: AssignProviderData) => void;
}

export const AssignProviderDialog: React.FC<AssignProviderDialogProps> = ({
  open,
  onClose,
  booking,
  onAssign,
}) => {
  const [selectedProviderId, setSelectedProviderId] = useState<string>("");

  const handleAssign = () => {
    if (selectedProviderId) {
      onAssign({
        bookingId: booking.id,
        providerId: selectedProviderId
      });
      setSelectedProviderId("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Provider</DialogTitle>
          <DialogDescription>
            Select a service provider for this booking.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 section-spacing-xs">
          <div className="form-spacing-tight">
            <Label htmlFor="provider">Provider</Label>
            <Select
              value={selectedProviderId}
              onValueChange={setSelectedProviderId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a provider" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_PROVIDERS.map((provider) => (
                  <SelectItem key={provider.id} value={provider.id}>
                    {provider.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAssign} disabled={!selectedProviderId}>
            Assign Provider
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
