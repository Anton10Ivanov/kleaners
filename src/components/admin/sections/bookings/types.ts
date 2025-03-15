
import { Database } from "@/integrations/supabase/types";
import { BookingStatus } from "@/types/enums";

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

// Define the Booking type to be more flexible for both real and mock data
export type Booking = Partial<Database["public"]["Tables"]["bookings"]["Row"]> & {
  id: string;
  status: BookingStatus;
  service_type: string;
  date: string;
  total_price: number;
  address: string;
  created_at: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  provider_id?: string;
  time_slot?: string;
};
