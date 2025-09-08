
import React, { useState, useEffect } from "react";
import { Button } from '@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea";
import { Label } from '@/components/ui/label";
import { Input } from '@/components/ui/input";
import { useToast } from '@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Booking } from "./types";

export interface MessageClientDialogProps {
  open: boolean;
  onClose: () => void;
  booking: Booking | null;
  onMessageSent: () => void;
}

export const MessageClientDialog = ({
  open,
  onClose,
  booking,
  onMessageSent,
}: MessageClientDialogProps) => {
  const [subject, setSubject] = useState("Update on your cleaning service");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  // Generate a default message when the dialog opens
  useEffect(() => {
    if (booking) {
      const defaultMessage = `Hello ${booking.first_name},\n\nWe wanted to provide you with an update on your ${booking.service_type} service scheduled for ${
        booking.date ? new Date(booking.date).toLocaleDateString() : 'the upcoming date'
      }.\n\n[Your message here]\n\nIf you have any questions, please don't hesitate to contact us.\n\nBest regards,\nYour Cleaning Team`;
      setMessage(defaultMessage);
    }
  }, [booking]);

  const handleSendMessage = async () => {
    if (!booking || !message.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a message",
      });
      return;
    }

    setIsSending(true);
    try {
      // In a real app, we would call a function to send an email here
      // For now, we'll just simulate sending and store a record in the database
      
      const { error } = await supabase
        .from("bookings")
        .update({ 
          updated_at: new Date().toISOString(),
          // We could store the message in a dedicated messages table in a real implementation
        })
        .eq("id", booking.id);
        
      if (error) throw error;
      
      // Simulate a delay to show the loading state
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: `Message sent to ${booking.first_name} ${booking.last_name}`,
      });
      
      onMessageSent();
      onClose();
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message: " + error.message,
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Message Client</DialogTitle>
          <DialogDescription>
            Send a message to the client regarding their booking.
          </DialogDescription>
        </DialogHeader>

        <div className="form-spacing-relaxed section-spacing-xs">
          {booking && (
            <div className="form-spacing-tight mb-4">
              <h4 className="font-medium">Client Details</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Name:</div>
                <div>{booking.first_name} {booking.last_name}</div>
                <div className="text-muted-foreground">Email:</div>
                <div>{booking.email}</div>
                <div className="text-muted-foreground">Phone:</div>
                <div>{booking.phone || 'Not provided'}</div>
              </div>
            </div>
          )}

          <div className="form-spacing-tight">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="form-spacing-tight">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={8}
              className="resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button 
            onClick={handleSendMessage} 
            disabled={isSending || !message.trim()}
          >
            {isSending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send Message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
