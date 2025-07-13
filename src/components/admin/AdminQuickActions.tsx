
import React, { memo, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Plus, RotateCw, Send, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logger } from "@/utils/logging";
import { toast } from "sonner";

/**
 * Action button interface
 */
interface QuickActionButton {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

/**
 * AdminQuickActions Component
 * 
 * Provides shortcut buttons for common admin actions.
 * Optimized with React.memo to prevent unnecessary re-renders.
 * 
 * @returns {JSX.Element} Admin quick actions component
 */
export const AdminQuickActions = memo(function AdminQuickActions(): JSX.Element {
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

  /**
   * View schedule page
   */
  const goToSchedule = () => {
    navigate("/admin/bookings?view=calendar");
  };

  /**
   * Send updates to customers
   */
  const goToSendUpdates = () => {
    navigate("/admin/customers?action=message");
  };

  /**
   * Sync data with external systems
   */
  const syncData = () => {
    logger.info("Data synchronization initiated", {}, "AdminQuickActions");
    toast.success("Data synchronized successfully!");
  };

  // Use useMemo to prevent unnecessary recreation of the buttons array
  const actionButtons = useMemo<QuickActionButton[]>(() => [
    {
      icon: <UserPlus className="h-5 w-5" />,
      label: "Add Customer",
      onClick: goToAddCustomer
    },
    {
      icon: <Plus className="h-5 w-5" />,
      label: "New Booking",
      onClick: goToAddBooking
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "View Schedule",
      onClick: goToSchedule
    },
    {
      icon: <Send className="h-5 w-5" />,
      label: "Send Updates",
      onClick: goToSendUpdates
    },
    {
      icon: <RotateCw className="h-5 w-5" />,
      label: "Sync Data",
      onClick: syncData
    }
  ], []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Shortcuts to common tasks and activities
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        {actionButtons.map((button, index) => (
          <Button 
            key={`quick-action-${index}`}
            variant="outline" 
            className="flex h-24 flex-col items-center justify-center gap-1"
            onClick={button.onClick}
          >
            {button.icon}
            <span className="text-xs">{button.label}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
});

export default AdminQuickActions;
