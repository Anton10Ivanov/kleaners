
import React from 'react';
import { useTitle } from '@/hooks/useTitle';
import { useMobileOptimizations } from '@/hooks/useMobileOptimizations';
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  Clock, 
  DollarSign,
  Star,
  TrendingUp,
  Users,
  MapPin,
  CheckCircle,
  AlertCircle,
  Plus
} from "lucide-react";

/**
 * ProviderDashboard Page
 * 
 * Mobile-first provider dashboard with design system integration
 * Touch-optimized interface for provider management
 */
export default function ProviderDashboard(): JSX.Element {
  useTitle("Provider Dashboard | Kleaners");
  
  const { getMobileSpacing, getMobileButtonSize, isMobile } = useMobileOptimizations();

  // Mock provider stats - in real app would come from API
  const providerStats = {
    totalBookings: 142,
    completedJobs: 128,
    activeBookings: 3,
    avgRating: 4.8,
    totalEarnings: 3240,
    thisMonthEarnings: 580,
    hoursWorked: 320,
    clientRetention: 85
  };

  const statCards = [
    {
      title: "Total Bookings",
      value: providerStats.totalBookings,
      icon: <Calendar className="h-5 w-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      change: "+12%"
    },
    {
      title: "Active Jobs",
      value: providerStats.activeBookings,
      icon: <Clock className="h-5 w-5" />,
       color: "text-secondary",
       bgColor: "bg-secondary/10",
      urgent: true
    },
    {
      title: "This Month",
      value: `$${providerStats.thisMonthEarnings}`,
      icon: <DollarSign className="h-5 w-5" />,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      change: "+8%"
    },
    {
      title: "Rating",
      value: `${providerStats.avgRating}/5`,
      icon: <Star className="h-5 w-5" />,
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      title: "Completed Jobs",
      value: providerStats.completedJobs,
      icon: <CheckCircle className="h-5 w-5" />,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20"
    },
    {
      title: "Total Earnings",
      value: `$${providerStats.totalEarnings}`,
      icon: <TrendingUp className="h-5 w-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    }
  ];

  const quickActions = [
    {
      title: "View Schedule",
      description: "Check your upcoming bookings",
      icon: <Calendar className="h-5 w-5" />,
      action: () => console.log("Navigate to schedule"),
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      title: "Update Availability",
      description: "Manage your working hours",
      icon: <Clock className="h-5 w-5" />,
      action: () => console.log("Navigate to availability"),
      color: "bg-green-600 hover:bg-green-700"
    },
    {
      title: "View Earnings",
      description: "Check payment history",
      icon: <DollarSign className="h-5 w-5" />,
      action: () => console.log("Navigate to earnings"),
      color: "bg-purple-600 hover:bg-purple-700"
    },
    {
      title: "Service Areas",
      description: "Update coverage zones",
      icon: <MapPin className="h-5 w-5" />,
      action: () => console.log("Navigate to service areas"),
      color: "bg-orange-600 hover:bg-orange-700"
    }
  ];

  return (
    <div className={cn("form-spacing-loose", getMobileSpacing('lg'))}>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Provider Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's your performance overview.
          </p>
        </div>
        
        <Button
          className={cn(
            "touch-comfortable",
            getMobileButtonSize('md')
          )}
        >
          <Plus className="h-4 w-4 mr-2" />
          {isMobile ? "New" : "Add Availability"}
        </Button>
      </div>

      {/* Stats Grid */}
      <ResponsiveGrid 
        cols={{ mobile: 1, tablet: 2, desktop: 3 }} 
        gap="md"
      >
        {statCards.map((card, index) => (
          <Card 
            key={card.title}
            className={cn(
              "card-primary hover:card-elevated transition-all duration-200",
              "hover:transform hover:scale-[1.02]",
              card.urgent && "border-orange-200 dark:border-orange-800"
            )}
          >
            <CardHeader className={cn(
              "pb-2",
              getMobileSpacing('sm')
            )}>
              <CardTitle className="flex items-center justify-between text-sm font-medium text-muted-foreground">
                <span>{card.title}</span>
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
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-foreground">
                  {card.value}
                </div>
                {card.change && (
                  <Badge variant="secondary" className="text-xs">
                    {card.change}
                  </Badge>
                )}
                {card.urgent && (
                  <Badge variant="destructive" className="text-xs">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Urgent
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </ResponsiveGrid>

      {/* Quick Actions */}
      <Card className="card-primary">
        <CardHeader className={getMobileSpacing('md')}>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        
        <CardContent className={cn("form-spacing-normal", getMobileSpacing('md'))}>
          <ResponsiveGrid 
            cols={{ mobile: 1, tablet: 2, desktop: 2 }} 
            gap="sm"
          >
            {quickActions.map((action, index) => (
              <Button
                key={action.title}
                onClick={action.action}
                variant="outline"
                className={cn(
                  "h-auto card-spacing-sm justify-start text-left",
                  getMobileButtonSize('lg'),
                  "hover:bg-accent/50"
                )}
              >
                <div className={cn(
                  "p-2 rounded-md mr-3",
                  action.color,
                  "text-white"
                )}>
                  {action.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground">
                    {action.title}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {action.description}
                  </div>
                </div>
              </Button>
            ))}
          </ResponsiveGrid>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card className="card-primary">
        <CardHeader className={getMobileSpacing('md')}>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5" />
            Performance Insights
          </CardTitle>
        </CardHeader>
        
        <CardContent className={cn("form-spacing-relaxed", getMobileSpacing('md'))}>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center card-spacing-sm bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-foreground">
                {providerStats.hoursWorked}h
              </div>
              <div className="text-sm text-muted-foreground">
                Hours Worked
              </div>
            </div>
            
            <div className="text-center card-spacing-sm bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-foreground">
                {providerStats.clientRetention}%
              </div>
              <div className="text-sm text-muted-foreground">
                Client Retention
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Button variant="outline" className={getMobileButtonSize('md')}>
              View Detailed Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
