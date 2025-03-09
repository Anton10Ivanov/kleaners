
import { Database } from "@/integrations/supabase/types";

// Include "assigned" in the BookingStatus type to match your app requirements
export type BookingStatus = "pending" | "assigned" | "confirmed" | "completed" | "cancelled";

export const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  assigned: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
} as const;

export type SortField = "date" | "total_price" | "created_at";
export type SortOrder = "asc" | "desc";

// Define the Booking type to include provider_id and ensure it matches the database structure
export type Booking = Database["public"]["Tables"]["bookings"]["Row"] & {
  provider_id?: string;
};
