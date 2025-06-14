
import { BookingFormData, Frequency } from "@/schemas/booking";

export const getPrice = (data: BookingFormData): number => {
  let hourlyRate = 35; // Default hourly rate

  if (data.frequency === Frequency.Weekly) {
    hourlyRate = 27;
  } else if (data.frequency === Frequency.BiWeekly) {
    hourlyRate = 30;
  }

  const basePrice = (data.hours || 0) * hourlyRate;
  
  const extrasPrice = (data.extras || []).reduce((total, extra) => total + extra.price, 0);

  return basePrice + extrasPrice;
};
