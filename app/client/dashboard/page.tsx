'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, CheckCircle, Clock, DollarSign, User } from 'lucide-react'

export default function ClientDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Client Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's your booking overview.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+3 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">67% completion rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Booking</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Tomorrow</div>
              <p className="text-xs text-muted-foreground">2:00 PM - Office cleaning</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€540</div>
              <p className="text-xs text-muted-foreground">This year</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Your latest cleaning service bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Office Cleaning</p>
                    <p className="text-sm text-gray-600">Tomorrow, 2:00 PM</p>
                  </div>
                  <Badge>Confirmed</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Home Deep Clean</p>
                    <p className="text-sm text-gray-600">Dec 15, 10:00 AM</p>
                  </div>
                  <Badge variant="secondary">Completed</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Move-out Cleaning</p>
                    <p className="text-sm text-gray-600">Dec 12, 3:00 PM</p>
                  </div>
                  <Badge variant="secondary">Completed</Badge>
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
              <CardDescription>Common actions for your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <Button className="h-auto p-4 justify-start">
                  <Calendar className="mr-3 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Book New Service</div>
                    <div className="text-sm text-muted-foreground">Schedule your next cleaning</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <User className="mr-3 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Update Profile</div>
                    <div className="text-sm text-muted-foreground">Manage your account settings</div>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <Clock className="mr-3 h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Booking History</div>
                    <div className="text-sm text-muted-foreground">View past cleaning services</div>
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