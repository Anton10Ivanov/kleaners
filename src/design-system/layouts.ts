
import { cn } from "@/lib/utils";

/**
 * Responsive grid options for different screen sizes
 */
export const responsiveGrids = {
  // Basic responsive grid that goes from 1 column on mobile to 2, 3, or 4 columns on larger screens
  oneToTwo: "grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6",
  oneToThree: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6",
  oneToFour: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6",
  
  // Sidebar layout that goes from stacked on mobile to side-by-side on larger screens
  sidebar: "grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6",
  
  // Dashboard layout with different column configurations
  dashboard: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6",
  
  // Specialty layouts for specific use cases
  messaging: "grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6",
};

/**
 * Responsive spacing options for different elements
 */
export const spacing = {
  section: "mb-8 md:mb-12 lg:mb-16",
  card: "p-4 md:p-6",
  headerSection: "py-4 md:py-6 lg:py-8",
};

/**
 * Apply responsive container padding
 */
export function responsiveContainer(className?: string) {
  return cn("px-4 sm:px-6 lg:px-8", className);
}

/**
 * Apply responsive section spacing
 */
export function responsiveSection(className?: string) {
  return cn("py-8 md:py-12 lg:py-16", className);
}
