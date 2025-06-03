
const roundToNearestHalf = (num: number): number => {
  const decimal = num - Math.floor(num);
  if (decimal < 0.25) return Math.floor(num);
  if (decimal >= 0.75) return Math.ceil(num);
  return Math.floor(num) + 0.5;
};

export const calculateRecommendedTime = (
  propertySize: number, 
  bedrooms: number, 
  bathrooms: number, 
  pace: 'standard' | 'quick' = 'standard'
): number => {
  const BASE_TIME = 2;
  let totalTime = BASE_TIME;
 
  // Limit values to reasonable ranges
  propertySize = Math.min(Math.max(propertySize, 20), 500);
  bedrooms = Math.min(bedrooms, 10);
  bathrooms = Math.min(bathrooms, 10);

  // Base calculation on property size
  if (propertySize > 60) {
    totalTime += Math.ceil((propertySize - 60) / 20) * 0.5;
  }

  // Add time for extra bedrooms and bathrooms
  if (bedrooms > 1) totalTime += (bedrooms - 1) * 0.3;
  if (bathrooms > 1) totalTime += (bathrooms - 1) * 0.5;

  // Cap at maximum
  totalTime = Math.min(totalTime, 8);
  
  // Apply quick pace reduction (20% off, but not below 2 hours)
  if (pace === 'quick') {
    totalTime = Math.max(2, totalTime * 0.8);
  }

  return roundToNearestHalf(totalTime);
};

export const calculatePrice = (frequency: string, basePrice: number) => {
  // Return the base price directly without any discounts
  return basePrice;
};
