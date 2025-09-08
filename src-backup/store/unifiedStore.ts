import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'provider' | 'admin';
  avatar?: string;
  phone?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  serviceType: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  clientId: string;
  providerId?: string;
  scheduledDate: string;
  duration: number;
  price: number;
  address: string;
  specialInstructions?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // UI state
  sidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  notifications: Notification[];
  
  // Data state
  bookings: Booking[];
  users: User[];
  
  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  removeNotification: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  setBookings: (bookings: Booking[]) => void;
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  removeBooking: (id: string) => void;
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  removeUser: (id: string) => void;
  
  // Computed values
  getUnreadNotificationsCount: () => number;
  getBookingsByStatus: (status: Booking['status']) => Booking[];
  getBookingsByUser: (userId: string) => Booking[];
  getUserById: (id: string) => User | undefined;
  getBookingById: (id: string) => Booking | undefined;
}

// Create unified store
export const useUnifiedStore = create<AppState>()(
  devtools(
    persist(
      immer((set, get) => ({
        // Initial state
        user: null,
        isAuthenticated: false,
        isLoading: false,
        sidebarOpen: false,
        theme: 'system',
        notifications: [],
        bookings: [],
        users: [],

        // User actions
        setUser: (user) =>
          set((state) => {
            state.user = user;
            state.isAuthenticated = !!user;
          }),

        setLoading: (loading) =>
          set((state) => {
            state.isLoading = loading;
          }),

        // UI actions
        setSidebarOpen: (open) =>
          set((state) => {
            state.sidebarOpen = open;
          }),

        setTheme: (theme) =>
          set((state) => {
            state.theme = theme;
          }),

        // Notification actions
        addNotification: (notification) =>
          set((state) => {
            const newNotification: Notification = {
              ...notification,
              id: Date.now().toString(),
              createdAt: new Date().toISOString(),
            };
            state.notifications.unshift(newNotification);
          }),

        removeNotification: (id) =>
          set((state) => {
            state.notifications = state.notifications.filter(n => n.id !== id);
          }),

        markNotificationAsRead: (id) =>
          set((state) => {
            const notification = state.notifications.find(n => n.id === id);
            if (notification) {
              notification.read = true;
            }
          }),

        clearNotifications: () =>
          set((state) => {
            state.notifications = [];
          }),

        // Booking actions
        setBookings: (bookings) =>
          set((state) => {
            state.bookings = bookings;
          }),

        addBooking: (booking) =>
          set((state) => {
            state.bookings.unshift(booking);
          }),

        updateBooking: (id, updates) =>
          set((state) => {
            const booking = state.bookings.find(b => b.id === id);
            if (booking) {
              Object.assign(booking, updates);
            }
          }),

        removeBooking: (id) =>
          set((state) => {
            state.bookings = state.bookings.filter(b => b.id !== id);
          }),

        // User management actions
        setUsers: (users) =>
          set((state) => {
            state.users = users;
          }),

        addUser: (user) =>
          set((state) => {
            state.users.unshift(user);
          }),

        updateUser: (id, updates) =>
          set((state) => {
            const user = state.users.find(u => u.id === id);
            if (user) {
              Object.assign(user, updates);
            }
          }),

        removeUser: (id) =>
          set((state) => {
            state.users = state.users.filter(u => u.id !== id);
          }),

        // Computed values
        getUnreadNotificationsCount: () => {
          const state = get();
          return state.notifications.filter(n => !n.read).length;
        },

        getBookingsByStatus: (status) => {
          const state = get();
          return state.bookings.filter(b => b.status === status);
        },

        getBookingsByUser: (userId) => {
          const state = get();
          return state.bookings.filter(b => b.clientId === userId);
        },

        getUserById: (id) => {
          const state = get();
          return state.users.find(u => u.id === id);
        },

        getBookingById: (id) => {
          const state = get();
          return state.bookings.find(b => b.id === id);
        },
      })),
      {
        name: 'unified-store',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          theme: state.theme,
          sidebarOpen: state.sidebarOpen,
        }),
      }
    ),
    {
      name: 'unified-store',
    }
  )
);

// Selectors for better performance
export const useUser = () => useUnifiedStore((state) => state.user);
export const useIsAuthenticated = () => useUnifiedStore((state) => state.isAuthenticated);
export const useIsLoading = () => useUnifiedStore((state) => state.isLoading);
export const useSidebarOpen = () => useUnifiedStore((state) => state.sidebarOpen);
export const useTheme = () => useUnifiedStore((state) => state.theme);
export const useNotifications = () => useUnifiedStore((state) => state.notifications);
export const useBookings = () => useUnifiedStore((state) => state.bookings);
export const useUsers = () => useUnifiedStore((state) => state.users);

// Action selectors
export const useUserActions = () => useUnifiedStore((state) => ({
  setUser: state.setUser,
  setLoading: state.setLoading,
}));

export const useUIActions = () => useUnifiedStore((state) => ({
  setSidebarOpen: state.setSidebarOpen,
  setTheme: state.setTheme,
}));

export const useNotificationActions = () => useUnifiedStore((state) => ({
  addNotification: state.addNotification,
  removeNotification: state.removeNotification,
  markNotificationAsRead: state.markNotificationAsRead,
  clearNotifications: state.clearNotifications,
}));

export const useBookingActions = () => useUnifiedStore((state) => ({
  setBookings: state.setBookings,
  addBooking: state.addBooking,
  updateBooking: state.updateBooking,
  removeBooking: state.removeBooking,
}));

export const useUserManagementActions = () => useUnifiedStore((state) => ({
  setUsers: state.setUsers,
  addUser: state.addUser,
  updateUser: state.updateUser,
  removeUser: state.removeUser,
}));

// Computed selectors
export const useUnreadNotificationsCount = () => useUnifiedStore((state) => state.getUnreadNotificationsCount());
export const useBookingsByStatus = (status: Booking['status']) => useUnifiedStore((state) => state.getBookingsByStatus(status));
export const useBookingsByUser = (userId: string) => useUnifiedStore((state) => state.getBookingsByUser(userId));
export const useUserById = (id: string) => useUnifiedStore((state) => state.getUserById(id));
export const useBookingById = (id: string) => useUnifiedStore((state) => state.getBookingById(id));

export default useUnifiedStore;
