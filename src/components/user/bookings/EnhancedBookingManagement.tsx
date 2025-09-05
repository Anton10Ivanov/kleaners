import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { useMobileOptimizations } from "@/hooks/useMobileOptimizations";
import { UnifiedContainer } from "@/components/layout/UnifiedContainer";
import { LayoutSection } from "@/components/layout/LayoutSection";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, Clock, MapPin, Phone, DollarSign, Filter, Search } from "lucide-react";

interface Booking {
  id: string;
  date: string;
  time: string;
  service: string;
  location: string;
  provider: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  price: number;
  contact: string;
}

interface EnhancedBookingManagementProps {
  bookings: Booking[];
  onReschedule?: (bookingId: string) => void;
  onCancel?: (bookingId: string) => void;
  onContact?: (bookingId: string) => void;
}

export function EnhancedBookingManagement({
  bookings: initialBookings,
  onReschedule,
  onCancel,
  onContact
}: EnhancedBookingManagementProps) {
  const { isMobile } = useMobileOptimizations();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [bookings, setBookings] = useState(initialBookings);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const bookingStats = {
    total: bookings.length,
    upcoming: bookings.filter(b => b.status === 'upcoming').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  };

  return (
    <div className="min-h-screen bg-surface-blue">
      <LayoutSection spacing="xl">
        <UnifiedContainer size="xl">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-foreground">
                My Bookings
              </h1>
              <p className="text-lg text-muted-foreground">
                Manage and track all your cleaning service appointments
              </p>
            </div>

            {/* Quick Stats */}
            <ResponsiveGrid cols={{ mobile: 2, tablet: 4, desktop: 4 }} gap="md">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{bookingStats.total}</div>
                  <div className="text-sm text-muted-foreground">Total</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{bookingStats.upcoming}</div>
                  <div className="text-sm text-muted-foreground">Upcoming</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{bookingStats.completed}</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">{bookingStats.cancelled}</div>
                  <div className="text-sm text-muted-foreground">Cancelled</div>
                </CardContent>
              </Card>
            </ResponsiveGrid>

            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className={cn(
                  "flex gap-4",
                  isMobile ? "flex-col" : "flex-row items-center"
                )}>
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search bookings..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[150px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bookings List */}
            <div className="space-y-4">
              {filteredBookings.length > 0 ? (
                <ResponsiveGrid cols={{ mobile: 1, tablet: 1, desktop: 2 }} gap="md">
                  {filteredBookings.map((booking) => (
                    <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg">{booking.service}</CardTitle>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-muted-foreground" />
                            <span>{formatDate(booking.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{booking.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="truncate">{booking.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{booking.provider}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span className="font-semibold">${booking.price}</span>
                          </div>
                        </div>
                        
                        {booking.status === 'upcoming' && (
                          <div className="flex gap-2 pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => onReschedule?.(booking.id)}
                            >
                              Reschedule
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => onContact?.(booking.id)}
                            >
                              Contact
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="flex-1"
                              onClick={() => onCancel?.(booking.id)}
                            >
                              Cancel
                            </Button>
                          </div>
                        )}
                        
                        {booking.status === 'completed' && (
                          <div className="pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                            >
                              Leave Review
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </ResponsiveGrid>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No bookings found</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchTerm || statusFilter !== 'all' 
                        ? 'Try adjusting your search or filters'
                        : 'You haven\'t made any bookings yet'
                      }
                    </p>
                    {!searchTerm && statusFilter === 'all' && (
                      <Button className="mt-4">
                        Book a Service
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </UnifiedContainer>
      </LayoutSection>
    </div>
  );
}