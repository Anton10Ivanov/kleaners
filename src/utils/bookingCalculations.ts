
export const calculateRecommendedTime = (bedrooms: number, bathrooms: number) => {
  const baseTime = 2;
  const bedroomTime = bedrooms * 0.5;
  const bathroomTime = bathrooms * 0.5;
  return Math.max(2, Math.ceil(baseTime + bedroomTime + bathroomTime));
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
