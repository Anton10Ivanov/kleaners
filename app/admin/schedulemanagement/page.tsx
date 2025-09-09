'use client'

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminScheduleManager } from '@/components/calendar/AdminScheduleManager';
import { useScheduleData } from '@/hooks/useScheduleData';
import { Calendar, Settings, Users } from 'lucide-react';

export default function ScheduleManagement() {
  const {
    cleaners,
    bookingRules,
    updateCleaners,
    updateBookingRules,
    isLoading,
    error
  } = useScheduleData();

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-red-600 mb-4">Error loading schedule data</div>
            <p className="text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Schedule Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage cleaner schedules, availability, and booking rules
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="cleaners" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Cleaners
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Cleaners</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{cleaners.length}</div>
                <p className="text-xs text-muted-foreground">
                  Active cleaners
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Available Slots</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {cleaners.reduce((total, cleaner) => total + cleaner.availableSlots.length, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Total time slots
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Blocked Dates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {cleaners.reduce((total, cleaner) => total + cleaner.blockedDates.length, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Total blocked dates
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Max Advance Days</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{bookingRules.maxAdvanceDays}</div>
                <p className="text-xs text-muted-foreground">
                  Days in advance
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Schedule updated</p>
                      <p className="text-sm text-muted-foreground">Anna Schmidt's schedule modified</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">2 hours ago</span>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">New cleaner added</p>
                      <p className="text-sm text-muted-foreground">Sarah Johnson joined the team</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">1 day ago</span>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Booking rules updated</p>
                      <p className="text-sm text-muted-foreground">Working hours changed to 8:00-20:00</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">3 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cleaners">
          <AdminScheduleManager
            cleaners={cleaners}
            bookingRules={bookingRules}
            onCleanersUpdate={updateCleaners}
            onBookingRulesUpdate={updateBookingRules}
          />
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Booking Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Minimum Advance Hours</label>
                      <p className="text-sm text-muted-foreground">
                        {bookingRules.minAdvanceHours} hours
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Maximum Advance Days</label>
                      <p className="text-sm text-muted-foreground">
                        {bookingRules.maxAdvanceDays} days
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Working Hours</label>
                      <p className="text-sm text-muted-foreground">
                        {bookingRules.workingHours.start} - {bookingRules.workingHours.end}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Slot Duration</label>
                      <p className="text-sm text-muted-foreground">
                        {bookingRules.slotDuration} minutes
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Data Management</h3>
                  <div className="space-y-2">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                      Export Schedule Data
                    </button>
                    <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                      Import Schedule Data
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                      Reset to Defaults
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

