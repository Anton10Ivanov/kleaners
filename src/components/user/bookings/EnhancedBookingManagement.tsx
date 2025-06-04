
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import { DesignSystemContainer } from "@/components/layout/DesignSystemContainer";
import { LayoutSection } from "@/components/layout/LayoutSection";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Search, Filter, MapPin, Phone, MessageCircle } from "lucide-react";

interface BookingItem {
  id: string;
  service: string;
  date: string;
  time: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  provider: {
    name: string;
    phone: string;
    avatar?: string;
  };
  address: string;
  price: string;
}

interface EnhancedBookingManagementProps {
  bookings: BookingItem[];
  className?: string;
}

/**
 * Enhanced booking management interface with design system integration
 * Mobile-first booking management with filtering, search, and actions
 */
export function EnhancedBookingManagement({
  bookings,
  className
}: EnhancedBookingManagementProps) {
  const { getMobileSpacing, getMobileButtonSize } = useMobileOptimizations();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Filter bookings based on search and status
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = !searchQuery || 
      booking.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.provider.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'scheduled': return 'default';
      case 'in-progress': return 'secondary';
      case 'completed': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'text-blue-600';
      case 'in-progress': return 'text-amber-600';
      case 'completed': return 'text-green-600';
      case 'cancelled': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <LayoutSection spacing="lg" className={className}>
      <DesignSystemContainer size="xl">
        <div className={cn("space-y-6", getMobileSpacing('lg'))}>
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-foreground">
              My Bookings
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage and track your cleaning service bookings
            </p>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn("pl-10", getMobileSpacing('md'))}
              />
            </div>

            {/* Filter Controls */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className={cn("gap-2", getMobileButtonSize('md'))}
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredBookings.length} booking{filteredBookings.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Bookings Grid */}
          {filteredBookings.length > 0 ? (
            <ResponsiveGrid cols={{ mobile: 1, tablet: 2, desktop: 3 }} gap="md">
              {filteredBookings.map((booking) => (
                <Card key={booking.id} className="card-primary">
                  <CardHeader className={cn("space-y-3", getMobileSpacing('md'))}>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg font-semibold">
                          {booking.service}
                        </CardTitle>
                        <Badge 
                          variant={getStatusBadgeVariant(booking.status)}
                          className={cn("text-xs", getStatusColor(booking.status))}
                        >
                          {booking.status.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-lg font-bold text-primary">
                        {booking.price}
                      </div>
                    </div>

                    {/* Date and Time */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {booking.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {booking.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {booking.address}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className={cn("space-y-4", getMobileSpacing('md'))}>
                    {/* Provider Info */}
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {booking.provider.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{booking.provider.name}</p>
                        <p className="text-xs text-muted-foreground">Your cleaner</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-1"
                        disabled={booking.status === 'cancelled'}
                      >
                        <Phone className="h-3 w-3" />
                        Call
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-1"
                        disabled={booking.status === 'cancelled'}
                      >
                        <MessageCircle className="h-3 w-3" />
                        Message
                      </Button>
                    </div>

                    {booking.status === 'scheduled' && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Reschedule
                        </Button>
                        <Button variant="destructive" size="sm" className="flex-1">
                          Cancel
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </ResponsiveGrid>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                No bookings found
              </p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </DesignSystemContainer>
    </LayoutSection>
  );
}
