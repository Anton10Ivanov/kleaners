
import { calculateRecommendedTime } from '@/utils/bookingCalculations';

export const useTimeCalculator = () => {
  const getHourRecommendation = (hours: number) => {
    if (hours <= 2) return { text: "Quick clean", color: "text-blue-600" };
    if (hours <= 4) return { text: "Standard clean", color: "text-green-600" };
    if (hours <= 6) return { text: "Deep clean", color: "text-orange-600" };
    return { text: "Extensive clean", color: "text-purple-600" };
  };

  const calculateTime = (bedrooms: number, bathrooms: number) => {
    return calculateRecommendedTime(bedrooms, bathrooms);
  };

  return {
    getHourRecommendation,
    calculateTime
  };
};
