
import { SortField, SortOrder, BookingStatus } from "@/components/admin/sections/bookings/types";
import { DateRange } from "react-day-picker";

export interface BookingsFilterParams {
  selectedStatus: BookingStatus | null;
  searchTerm: string;
  sortField: SortField;
  sortOrder: SortOrder;
  dateRange: DateRange | undefined;
}

/**
 * Generates a consistent query key factory to ensure proper cache invalidation
 */
export const getBookingsQueryKey = (filters?: Partial<BookingsFilterParams>) => {
  const baseKey = ['admin-bookings'];
  if (!filters) return baseKey;
  
  // Build array of filter values in consistent order
  return [
    ...baseKey,
    filters.selectedStatus || null,
    filters.searchTerm || '',
    filters.sortField || 'date',
    filters.sortOrder || 'desc',
    // Convert date range to string to ensure consistent cache keys
    filters.dateRange ? `${filters.dateRange.from?.toISOString()}-${filters.dateRange.to?.toISOString()}` : null
  ];
};
