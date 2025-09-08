
import { EarningsPeriod, EarningsData, EarningsSummary } from '@/hooks/useProviderEarnings';

// Generate earnings data for a given date range based on period
export function generateChartData(period: EarningsPeriod): EarningsData[] {
  const currentDate = new Date();
  let chartData: EarningsData[] = [];
  
  // Generate appropriate chart data based on selected period
  if (period === "weekly") {
    // Last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - i);
      chartData.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        amount: Math.floor(Math.random() * 150) + 50
      });
    }
  } else if (period === "monthly") {
    // Last 30 days grouped by week
    for (let i = 4; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - (i * 7));
      chartData.push({
        date: `Week ${4-i + 1}`,
        amount: Math.floor(Math.random() * 600) + 200
      });
    }
  } else if (period === "yearly") {
    // Last 12 months
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = currentDate.getMonth();
    
    for (let i = 11; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      chartData.push({
        date: months[monthIndex],
        amount: Math.floor(Math.random() * 2500) + 1000
      });
    }
  }
  
  return chartData;
}

// Calculate summary statistics from chart data
export function calculateSummaryStats(chartData: EarningsData[]): Omit<EarningsSummary, 'chartData'> {
  const totalEarnings = chartData.reduce((sum, item) => sum + item.amount, 0);
  const halfwayPoint = Math.floor(chartData.length / 2);
  const currentPeriodEarnings = chartData.slice(halfwayPoint).reduce((sum, item) => sum + item.amount, 0);
  const previousPeriodEarnings = chartData.slice(0, halfwayPoint).reduce((sum, item) => sum + item.amount, 0);
  const percentChange = previousPeriodEarnings > 0 
    ? ((currentPeriodEarnings - previousPeriodEarnings) / previousPeriodEarnings) * 100 
    : 0;

  return {
    totalEarnings,
    currentPeriodEarnings,
    previousPeriodEarnings,
    percentChange
  };
}

// Generate complete mock earnings data
export function generateMockEarningsData(period: EarningsPeriod): EarningsSummary {
  const chartData = generateChartData(period);
  const stats = calculateSummaryStats(chartData);
  
  return {
    ...stats,
    chartData
  };
}
