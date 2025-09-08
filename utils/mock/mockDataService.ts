
import { BookingStatus } from "@/types/enums";
import { Booking } from "@/components/admin/sections/bookings/types";
import { UserBooking } from "@/types/bookings";
import { generateMockBookings } from "./bookings";
import { generateMockCustomers } from "./customers";
import { generateMockProviders } from "./providers";

// Central storage key for mock data
const MOCK_BOOKINGS_KEY = 'mock-bookings';
const MOCK_NOTIFICATIONS_KEY = 'mock-notifications';

// Initialize mock data if it doesn't exist
export const initMockData = () => {
  if (!localStorage.getItem(MOCK_BOOKINGS_KEY)) {
    // Generate mock data
    const clients = generateMockCustomers(5);
    const providers = generateMockProviders(3);
    const bookings = generateMockBookings(clients, providers, 15);
    
    // Store in localStorage
    localStorage.setItem(MOCK_BOOKINGS_KEY, JSON.stringify(bookings));
  }
  
  if (!localStorage.getItem(MOCK_NOTIFICATIONS_KEY)) {
    localStorage.setItem(MOCK_NOTIFICATIONS_KEY, JSON.stringify([]));
  }
};

// Get all bookings
export const getMockBookings = (): Booking[] => {
  initMockData();
  return JSON.parse(localStorage.getItem(MOCK_BOOKINGS_KEY) || '[]');
};

// Get filtered bookings based on status
export const getFilteredMockBookings = (status: BookingStatus | null): Booking[] => {
  const bookings = getMockBookings();
  if (!status) return bookings;
  return bookings.filter(booking => booking.status === status);
};

// Get bookings for a specific user (client)
export const getUserMockBookings = (userId: string): UserBooking[] => {
  const bookings = getMockBookings();
  const userBookings = bookings
    .filter(booking => booking.user_id === userId)
    .map(booking => ({
      id: booking.id,
      status: booking.status as BookingStatus,
      date: booking.date || new Date().toISOString(),
      service: booking.service_type || 'Regular Cleaning',
      address: booking.address || 'Unknown address',
      price: booking.total_price || 100,
      duration: 2, // Default duration
      providerName: booking.provider_id ? 'Assigned Provider' : undefined
    }));
  return userBookings;
};

// Get bookings for a specific provider
export const getProviderMockBookings = (providerId: string): Booking[] => {
  const bookings = getMockBookings();
  return bookings.filter(booking => booking.provider_id === providerId);
};

// Add a new booking
export const addMockBooking = (booking: Partial<Booking>): Booking => {
  const bookings = getMockBookings();
  
  // Create a new booking with defaults
  const newBooking: Booking = {
    id: `booking-${Date.now()}`,
    status: BookingStatus.Pending,
    service_type: booking.service_type || 'Regular Cleaning',
    date: booking.date || new Date().toISOString(),
    total_price: booking.total_price || 100,
    address: booking.address || 'Default Address',
    created_at: new Date().toISOString(),
    user_id: booking.user_id,
    first_name: booking.first_name,
    last_name: booking.last_name,
    email: booking.email,
    phone: booking.phone,
    ...booking
  };
  
  bookings.push(newBooking);
  localStorage.setItem(MOCK_BOOKINGS_KEY, JSON.stringify(bookings));
  
  // Add a notification
  addMockNotification({
    title: 'New Booking',
    message: `New booking for ${newBooking.service_type} created`,
    type: 'booking'
  });
  
  return newBooking;
};

// Update a booking
export const updateMockBooking = (id: string, updates: Partial<Booking>): Booking | null => {
  const bookings = getMockBookings();
  const index = bookings.findIndex(b => b.id === id);
  
  if (index !== -1) {
    bookings[index] = { ...bookings[index], ...updates };
    localStorage.setItem(MOCK_BOOKINGS_KEY, JSON.stringify(bookings));
    return bookings[index];
  }
  
  return null;
};

// Delete a booking
export const deleteMockBooking = (id: string): boolean => {
  const bookings = getMockBookings();
  const filteredBookings = bookings.filter(b => b.id !== id);
  
  if (filteredBookings.length !== bookings.length) {
    localStorage.setItem(MOCK_BOOKINGS_KEY, JSON.stringify(filteredBookings));
    return true;
  }
  
  return false;
};

// Notification interfaces
export interface MockNotification {
  id: string;
  title: string;
  message: string;
  type: 'booking' | 'system' | 'provider';
  createdAt: string;
  read: boolean;
}

// Get all notifications
export const getMockNotifications = (): MockNotification[] => {
  return JSON.parse(localStorage.getItem(MOCK_NOTIFICATIONS_KEY) || '[]');
};

// Add a notification
export const addMockNotification = (notification: Partial<MockNotification>): MockNotification => {
  const notifications = getMockNotifications();
  
  const newNotification: MockNotification = {
    id: `notification-${Date.now()}`,
    title: notification.title || 'Notification',
    message: notification.message || 'New notification',
    type: notification.type || 'system',
    createdAt: new Date().toISOString(),
    read: false
  };
  
  notifications.push(newNotification);
  localStorage.setItem(MOCK_NOTIFICATIONS_KEY, JSON.stringify(notifications));
  
  return newNotification;
};

// Mark notification as read
export const markNotificationAsRead = (id: string): boolean => {
  const notifications = getMockNotifications();
  const index = notifications.findIndex(n => n.id === id);
  
  if (index !== -1) {
    notifications[index].read = true;
    localStorage.setItem(MOCK_NOTIFICATIONS_KEY, JSON.stringify(notifications));
    return true;
  }
  
  return false;
};

// Initialize mock data when the module is imported
initMockData();
