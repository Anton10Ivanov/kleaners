
const roundToNearestHalf = (num: number): number => {
  const decimal = num - Math.floor(num);
  if (decimal < 0.25) return Math.floor(num);
  if (decimal >= 0.75) return Math.ceil(num);
  return Math.floor(num) + 0.5;
};

export const calculateRecommendedTime = (bedrooms: number, bathrooms: number): number => {
  const BASE_TIME = 2;
  let totalTime = BASE_TIME;
  
  // Case 1: Both bedrooms and bathrooms = 1
  if (bedrooms === 1 && bathrooms === 1) {
    return BASE_TIME;
  }

  // Calculate extra rooms (subtract 1 from each as the first room is included in base time)
  const extraBedrooms = Math.max(0, bedrooms - 1);
  const extraBathrooms = Math.max(0, bathrooms - 1);

  // Case 2: >1 & <= 3 rooms
  if (Math.max(bedrooms, bathrooms) <= 3) {
    totalTime += extraBedrooms * 0.5;  // +0.5h per extra bedroom
    totalTime += extraBathrooms * 0.75; // +0.75h per extra bathroom
  }
  // Case 3: >3 & <= 6 rooms
  else if (Math.max(bedrooms, bathrooms) <= 6) {
    totalTime += extraBedrooms * 0.4;  // +0.4h per extra bedroom
    totalTime += extraBathrooms * 0.6; // +0.6h per extra bathroom
  }
  // Case 4: >6 & <= 10 rooms
  else if (Math.max(bedrooms, bathrooms) <= 10) {
    totalTime = Math.max(
      7, // minimum 6 hours for large properties
      BASE_TIME + (extraBedrooms * 0.3) + (extraBathrooms * 0.5)
    );
  }

  // Apply rounding rules
  return roundToNearestHalf(totalTime);
};

export const calculatePrice = (frequency: string, basePrice: number) => {
  let price = basePrice;
  if (frequency === 'weekly') {
    price *= 0.8;
  } else if (frequency === 'biweekly') {
    price *= 0.9;
  }
  return price;
};
