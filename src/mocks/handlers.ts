
import { http, HttpResponse } from 'msw'
import { UserBooking } from '@/hooks/useUserBookings'
import { UserData } from '@/hooks/useUserProfileData'

/**
 * Handler definitions for the Mock Service Worker
 * These intercept API requests and provide mock responses during development
 */
export const handlers = [
  // Example: Mock user bookings API
  http.get('/api/bookings', () => {
    return HttpResponse.json<UserBooking[]>([
      {
        id: "1",
        status: "pending",
        date: "2023-05-15T10:00:00",
        service: "Regular Cleaning",
        address: "123 Main St, Apt 4B",
        price: 120,
        duration: 3,
        providerName: "Maria Johnson"
      },
      {
        id: "2",
        status: "completed",
        date: "2023-05-01T14:00:00",
        service: "Deep Cleaning",
        address: "123 Main St, Apt 4B",
        price: 210,
        duration: 5
      },
      {
        id: "3",
        status: "cancelled",
        date: "2023-04-22T09:00:00",
        service: "Move In/Out Cleaning",
        address: "456 Park Ave, Suite 203",
        price: 180,
        duration: 4,
        notes: "Cancelled due to scheduling conflict"
      }
    ])
  }),

  // Example: Mock user profile data API
  http.get('/api/profile', () => {
    return HttpResponse.json<UserData>({
      id: "123",
      fullName: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      avatarUrl: "/placeholder.svg",
      notificationPreferences: {
        emailBookingUpdates: true,
        emailPromotions: false,
        smsReminders: true,
        pushNotifications: false
      },
      accountPreferences: {
        language: "en",
        darkMode: false,
        showEmail: true,
        showPhone: false
      },
      createdAt: "2023-01-15T00:00:00Z"
    })
  }),

  // Example: Mock auth API - login
  http.post('/api/auth/login', async ({ request }) => {
    const data = await request.json();
    const { email, password } = data as { email: string; password: string };
    
    // Simple validation for demo purposes
    if (email === "demo@example.com" && password === "password") {
      return HttpResponse.json({
        user: {
          id: "123",
          email: "demo@example.com",
          name: "Demo User"
        },
        token: "fake-jwt-token"
      })
    }
    
    return new HttpResponse(
      JSON.stringify({ message: "Invalid credentials" }),
      { status: 401 }
    )
  }),

  // Example: Mock supabase-like response for bookings
  http.get('*/rest/v1/bookings*', () => {
    return HttpResponse.json([
      {
        id: "1",
        service_type: "Regular Cleaning",
        hours: 3,
        bedrooms: 2,
        bathrooms: 1,
        frequency: "weekly",
        date: "2023-05-15T10:00:00",
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        phone: "+1234567890",
        address: "123 Main St, Apt 4B",
        postal_code: "12345",
        total_price: 120,
        status: "pending"
      }
    ])
  }),

  // Example: Mock creating a booking
  http.post('*/rest/v1/bookings', async () => {
    return HttpResponse.json({
      id: "new-booking-id",
      status: "pending",
      created_at: new Date().toISOString()
    })
  }),
]
