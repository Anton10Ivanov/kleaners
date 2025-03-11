
/**
 * Formats a number as currency (USD)
 * @param value Number to format as currency
 * @param minimumFractionDigits Minimum number of fraction digits (default: 2)
 * @returns Formatted currency string
 */
export function formatCurrency(value: number, minimumFractionDigits = 2): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits,
    maximumFractionDigits: 2
  }).format(value);
}

/**
 * Formats a percentage value
 * @param value Number to format as percentage
 * @param minimumFractionDigits Minimum number of fraction digits (default: 1)
 * @returns Formatted percentage string
 */
export function formatPercentage(value: number, minimumFractionDigits = 1): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits,
    maximumFractionDigits: 2
  }).format(value / 100);
}
