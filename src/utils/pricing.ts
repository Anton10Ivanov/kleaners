
import { BookingFormData, Frequency } from "@/schemas/booking";

export const getPrice = (data: BookingFormData): number => {
  let hourlyRate = 35; // Default hourly rate

  if (data.frequency === Frequency.Weekly) {
    hourlyRate = 27;
  } else if (data.frequency === Frequency.BiWeekly) {
    hourlyRate = 30;
  }

  const basePrice = (data.hours || 0) * hourlyRate;
  
  // For now, since extras is an array of strings, we'll add a flat rate per extra
  // In the future, this could be enhanced to have specific pricing per extra type
  const extrasPrice = (data.extras || []).length * 15; // €15 per extra service

  return basePrice + extrasPrice;
};
