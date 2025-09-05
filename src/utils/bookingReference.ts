
/**
 * Generate booking reference in format DDMMYYXX
 * where DD = day, MM = month, YY = year, XX = random digits
 */
export const generateBookingReference = (): string => {
  const now = new Date();
  
  // Get day, month, year in 2-digit format
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear().toString().slice(-2);
  
  // Generate 2 random digits
  const randomDigits = Math.floor(Math.random() * 100).toString().padStart(2, '0');
  
  return `${day}${month}${year}${randomDigits}`;
};

/**
 * Validate booking reference format
 */
export const isValidBookingReference = (reference: string): boolean => {
  const pattern = /^\d{8}$/;
  return pattern.test(reference);
};

/**
 * Parse booking reference to extract date components
 */
export const parseBookingReference = (reference: string) => {
  if (!isValidBookingReference(reference)) {
    throw new Error('Invalid booking reference format');
  }
  
  const day = parseInt(reference.slice(0, 2), 10);
  const month = parseInt(reference.slice(2, 4), 10);
  const year = parseInt('20' + reference.slice(4, 6), 10);
  const randomPart = reference.slice(6, 8);
  
  return {
    day,
    month,
    year,
    randomPart,
    date: new Date(year, month - 1, day)
  };
};
