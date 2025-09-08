'use client'

import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, MapPin, User, Phone, Mail, Settings, BarChart3, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ProviderSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
  badge?: {
    text: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  };
  loading?: boolean;
  error?: string;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  onToggle?: (collapsed: boolean) => void;
  type?: 'profile' | 'availability' | 'bookings' | 'earnings' | 'settings' | 'application';
}

export function ProviderSection({
  title,
  description,
  children,
  actions,
  badge,
  loading = false,
  error,
  className,
  headerClassName,
  contentClassName,
  collapsible = false,
  defaultCollapsed = false,
  onToggle,
  type = 'profile'
}: ProviderSectionProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  const handleToggle = () => {
    if (collapsible) {
      const newCollapsed = !isCollapsed;
      setIsCollapsed(newCollapsed);
      onToggle?.(newCollapsed);
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'profile': return <User className="h-5 w-5" />;
      case 'availability': return <Calendar className="h-5 w-5" />;
      case 'bookings': return <Clock className="h-5 w-5" />;
      case 'earnings': return <DollarSign className="h-5 w-5" />;
      case 'settings': return <Settings className="h-5 w-5" />;
      case 'application': return <Phone className="h-5 w-5" />;
      default: return <User className="h-5 w-5" />;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'profile': return 'text-blue-600';
      case 'availability': return 'text-green-600';
      case 'bookings': return 'text-orange-600';
      case 'earnings': return 'text-emerald-600';
      case 'settings': return 'text-gray-600';
      case 'application': return 'text-purple-600';
      default: return 'text-blue-600';
    }
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader className={headerClassName}>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-6 bg-muted animate-pulse rounded w-48"></div>
              {description && (
                <div className="h-4 bg-muted animate-pulse rounded w-64"></div>
              )}
            </div>
            {actions && (
              <div className="h-8 bg-muted animate-pulse rounded w-24"></div>
            )}
          </div>
        </CardHeader>
        <CardContent className={contentClassName}>
          <div className="space-y-4">
            <div className="h-32 bg-muted animate-pulse rounded"></div>
            <div className="h-32 bg-muted animate-pulse rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={cn('border-destructive', className)}>
        <CardHeader className={headerClassName}>
          <CardTitle className="text-destructive flex items-center gap-2">
            {getTypeIcon()}
            {title}
            <Badge variant="destructive">Error</Badge>
          </CardTitle>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </CardHeader>
        <CardContent className={contentClassName}>
          <div className="text-center py-8">
            <p className="text-destructive mb-4">{error}</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className={headerClassName}>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CardTitle className={cn('text-lg font-semibold flex items-center gap-2', getTypeColor())}>
                {getTypeIcon()}
                {title}
              </CardTitle>
              {badge && (
                <Badge variant={badge.variant || 'secondary'}>
                  {badge.text}
                </Badge>
              )}
            </div>
            {description && (
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {actions}
            {collapsible && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggle}
                className="h-8 w-8 p-0"
              >
                {isCollapsed ? '▼' : '▲'}
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      {!isCollapsed && (
        <>
          <Separator />
          <CardContent className={contentClassName}>
            {children}
          </CardContent>
        </>
      )}
    </Card>
  );
}

export default ProviderSection;
