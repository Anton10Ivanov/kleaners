
export const calculateRecommendedTime = (bedrooms: number, bathrooms: number, cleaningPace: string = 'standard'): number => {
  // Base time calculation
  let baseTime = 2; // minimum 2 hours
  
  // Add time based on bedrooms
  baseTime += bedrooms * 0.5;
  
  // Add time based on bathrooms
  baseTime += bathrooms * 0.5;
  
  // Adjust for cleaning pace
  if (cleaningPace === 'quick') {
    baseTime *= 0.8; // 20% faster
  }
  
  // Round to nearest 0.5 hour and ensure minimum 2 hours
  return Math.max(2, Math.round(baseTime * 2) / 2);
};

export const calculatePrice = (hours: number, frequency: string): number => {
  const baseRate = frequency === 'weekly' ? 27 : 
                  frequency === 'bi-weekly' ? 30 : 35;
  
  return hours * baseRate;
};
