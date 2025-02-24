
import { Database } from "@/integrations/supabase/types";

export type BookingStatus = Database["public"]["Enums"]["booking_status"];

export const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
} as const;

export type SortField = "date" | "total_price" | "created_at";
export type SortOrder = "asc" | "desc";

