
import React from 'react';
import { cn } from "@/lib/utils";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { 
  Calendar,
  Clock, 
  DollarSign,
  Star,
  TrendingUp,
  CheckCircle
} from "lucide-react";

interface UserDashboardStatsProps {
  stats: {
    totalBookings: number;
    hoursClean: number;
    totalSpent: number;
    avgRating: number;
    upcomingBookings: number;
    completedBookings: number;
  };
  className?: string;
}

/**
 * User dashboard statistics component with design system integration
 * Mobile-first responsive grid layout with touch-optimized cards
 */
export function UserDashboardStats({
  stats,
  className,
}: UserDashboardStatsProps) {
  const { getMobileSpacing } = useMobileOptimizations();

  const statCards = [
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: <Calendar className="h-5 w-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Hours of Clean Time",
      value: `${stats.hoursClean}h`,
      icon: <Clock className="h-5 w-5" />,
      color: "text-green-600", 
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      title: "Total Spent",
      value: `$${stats.totalSpent}`,
      icon: <DollarSign className="h-5 w-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      title: "Average Rating",
      value: `${stats.avgRating}/5`,
      icon: <Star className="h-5 w-5" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20"
    },
    {
      title: "Upcoming",
      value: stats.upcomingBookings,
      icon: <TrendingUp className="h-5 w-5" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    },
    {
      title: "Completed",
      value: stats.completedBookings,
      icon: <CheckCircle className="h-5 w-5" />,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20"
    }
  ];

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">
          Your Dashboard
        </h2>
      </div>
      
      <ResponsiveGrid 
        cols={{ mobile: 1, tablet: 2, desktop: 3 }} 
        gap="md"
      >
        {statCards.map((card, index) => (
          <Card 
            key={card.title}
            className={cn(
              "card-primary hover:card-elevated transition-all duration-200",
              "hover:transform hover:scale-[1.02]"
            )}
          >
            <CardHeader className={cn(
              "pb-2",
              getMobileSpacing('sm')
            )}>
              <CardTitle className="flex items-center justify-between text-sm font-medium text-muted-foreground">
                {card.title}
                <div className={cn(
                  "p-2 rounded-lg",
                  card.bgColor
                )}>
                  <div className={card.color}>
                    {card.icon}
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className={getMobileSpacing('sm')}>
              <div className="text-2xl font-bold text-foreground">
                {card.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </ResponsiveGrid>
    </div>
  );
}
