'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, CheckCircle, Clock, DollarSign, Users, Star, AlertCircle } from 'lucide-react'

export default function ProviderDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Provider Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back! Here's your performance overview.</p>
          </div>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Add Availability
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Bookings scheduled</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">Total jobs completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.9</div>
              <p className="text-xs text-muted-foreground">Average customer rating</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€2,340</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Bookings</CardTitle>
              <CardDescription>Your scheduled cleaning appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Office Building - Floor 3</p>
                    <p className="text-sm text-gray-600">Tomorrow, 9:00 AM</p>
                    <p className="text-sm text-gray-600">Contact: Sarah Johnson</p>
                  </div>
                  <Badge>Confirmed</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div>
                    <p className="font-medium">Home Deep Clean</p>
                    <p className="text-sm text-gray-600">Dec 20, 2:00 PM</p>
                    <p className="text-sm text-gray-600">Contact: Mike Chen</p>
                  </div>
                  <Badge variant="secondary">
                    <AlertCircle className="mr-1 h-3 w-3" />
                    Pending
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Move-in Cleaning</p>
                    <p className="text-sm text-gray-600">Dec 22, 11:00 AM</p>
                    <p className="text-sm text-gray-600">Contact: Emma Davis</p>
                  </div>
                  <Badge>Confirmed</Badge>
                </div>
              </div>
              
              <Button className="w-full mt-4" variant="outline">
                View All Bookings
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your provider account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <Button className="h-auto p-4 justify-start">
                  <Calendar className="mr-3 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Update Availability</div>
                    <div className="text-sm text-muted-foreground">Manage your schedule</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <Users className="mr-3 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">View Customers</div>
                    <div className="text-sm text-muted-foreground">Manage client relationships</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <DollarSign className="mr-3 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Earnings Report</div>
                    <div className="text-sm text-muted-foreground">View payment history</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}