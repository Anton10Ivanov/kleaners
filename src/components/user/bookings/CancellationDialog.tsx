
import React from 'react';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';

interface CancellationDialogProps {
  handleCancel: () => Promise<void>;
  isCancelling: boolean;
}

export function CancellationDialog({
  handleCancel,
  isCancelling
}: CancellationDialogProps): JSX.Element {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Cancel Booking</DialogTitle>
      </DialogHeader>
      <div className="py-4">
        <p className="mb-4">
          Are you sure you want to cancel this booking? This action cannot be undone.
        </p>
        <div className="flex justify-between">
          <DialogClose asChild>
            <Button variant="outline">Keep Booking</Button>
          </DialogClose>
          <Button 
            variant="destructive"
            onClick={handleCancel}
            disabled={isCancelling}
          >
            {isCancelling ? "Cancelling..." : "Yes, Cancel"}
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
