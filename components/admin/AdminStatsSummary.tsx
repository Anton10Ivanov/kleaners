
import React, { memo, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, DollarSign, TrendingUp } from "lucide-react";

/**
 * Stats card props interface
 */
interface StatsCardProps {
  /** Card title */
  title: string;
  
  /** Numerical value to display */
  value: string | number;
  
  /** Descriptive text below the value */
  description: string;
  
  /** Icon to display */
  icon: React.ReactNode;
  
  /** CSS class for icon background */
  iconBgClass: string;
}

/**
 * Individual stats card component
 * 
 * @param {StatsCardProps} props Component props
 * @returns {JSX.Element} Stats card component
 */
const StatsCard = memo(function StatsCard({ 
  title, 
  value, 
  description, 
  icon, 
  iconBgClass 
}: StatsCardProps): JSX.Element {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`${iconBgClass} rounded-full p-2`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
});

/**
 * AdminStatsSummary Component
 * 
 * Displays key metrics for the admin dashboard.
 * Optimized with React.memo to prevent unnecessary re-renders.
 * 
 * @returns {JSX.Element} Admin stats summary component
 */
export const AdminStatsSummary = memo(function AdminStatsSummary(): JSX.Element {
  // Use useMemo to prevent unnecessary recreation of the stats array
  const statsCards = useMemo(() => [
    {
      title: "Total Customers",
      value: "720",
      description: "42 new this month",
      icon: <Users className="h-4 w-4 text-blue-500" />,
      iconBgClass: "bg-blue-100 dark:bg-blue-900/20"
    },
    {
      title: "Upcoming Bookings",
      value: "48",
      description: "12 in the next 48hrs",
      icon: <Calendar className="h-4 w-4 text-indigo-500" />,
      iconBgClass: "bg-indigo-100 dark:bg-indigo-900/20"
    },
    {
      title: "Monthly Revenue",
      value: "$12,450",
      description: "↑ 18% from last month",
      icon: <DollarSign className="h-4 w-4 text-green-500" />,
      iconBgClass: "bg-green-100 dark:bg-green-900/20"
    },
    {
      title: "Completion Rate",
      value: "98.3%",
      description: "↑ 2% from last month",
      icon: <TrendingUp className="h-4 w-4 text-amber-500" />,
      iconBgClass: "bg-amber-100 dark:bg-amber-900/20"
    }
  ], []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsCards.map((card, index) => (
        <StatsCard
          key={`stat-card-${index}`}
          title={card.title}
          value={card.value}
          description={card.description}
          icon={card.icon}
          iconBgClass={card.iconBgClass}
        />
      ))}
    </div>
  );
});

export default AdminStatsSummary;
