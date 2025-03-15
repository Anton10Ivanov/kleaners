
import { BookingStatus } from "@/types/enums";

/**
 * Interface representing a user booking
 */
export interface UserBooking {
  /** Unique booking identifier */
  id: string;
  
  /** Status of the booking */
  status: "pending" | "assigned" | "confirmed" | "completed" | "cancelled";
  
  /** Date and time of the booking */
  date: string;
  
  /** Service type booked */
  service: string;
  
  /** Address where service will be performed */
  address: string;
  
  /** Total price of the booking */
  price: number;
  
  /** Duration of the service in hours */
  duration: number;
  
  /** Additional notes or special instructions */
  notes?: string;
  
  /** Name of assigned service provider (if any) */
  providerName?: string;
}

/**
 * Result object returned by useUserBookings hook
 */
export interface UseUserBookingsResult {
  /** Array of user bookings */
  bookings: UserBooking[];
  
  /** Whether bookings are currently loading */
  isLoading: boolean;
  
  /** Error object if the fetch failed */
  error: Error | null;
  
  /** Function to manually refetch bookings */
  refetch: () => void;
  
  /** Function to cancel a booking */
  cancelBooking: (bookingId: string) => Promise<boolean>;
  
  /** Function to reschedule a booking */
  rescheduleBooking: (bookingId: string, newDate: string) => Promise<boolean>;
  
  /** Function to generate an invoice for a completed booking */
  generateInvoice: (bookingId: string) => Promise<boolean>;
}
