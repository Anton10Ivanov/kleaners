
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserX } from "lucide-react";
import { useState } from "react";

/**
 * DangerZoneCard Component Props
 */
interface DangerZoneCardProps {
  /**
   * Callback function to handle account deletion
   * @returns {Promise<void>} Promise that resolves when deletion is complete
   */
  onDeleteAccount: () => Promise<void>;
}

/**
 * DangerZoneCard Component
 * 
 * Displays dangerous account operations that require confirmation, 
 * such as account deletion.
 * 
 * @param {DangerZoneCardProps} props - Component props
 * @returns {JSX.Element} A card component with danger zone options
 */
export const DangerZoneCard = ({ onDeleteAccount }: DangerZoneCardProps): JSX.Element => {
  const [isDeleting, setIsDeleting] = useState(false);

  /**
   * Handles the account deletion process
   */
  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      await onDeleteAccount();
    } catch (error) {
      console.error("Error deleting account:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="border-red-200">
      <CardHeader>
        <div className="flex items-center gap-2">
          <UserX className="h-5 w-5 text-red-500" aria-hidden="true" />
          <CardTitle className="text-red-500">Danger Zone</CardTitle>
        </div>
        <CardDescription>
          Actions here can't be undone
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Deleting your account will remove all of your information from our database. This cannot be undone.
        </p>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="destructive"
              aria-label="Delete your account permanently"
            >
              Delete Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDeleteAccount} 
                className="bg-red-500 hover:bg-red-600 focus:ring-red-500"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete Account"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};
