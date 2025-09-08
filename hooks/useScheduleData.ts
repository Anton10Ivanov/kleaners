'use client'

import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { CleanerSchedule, BookingRule } from '@/components/calendar/UnifiedCalendar';

// Default booking rules
const DEFAULT_BOOKING_RULES: BookingRule = {
  minAdvanceHours: 2,
  maxAdvanceDays: 30,
  workingHours: {
    start: "08:00",
    end: "20:00"
  },
  slotDuration: 120, // 2 hours
  breakDuration: 30  // 30 minutes
};

// Default cleaners data
const DEFAULT_CLEANERS: CleanerSchedule[] = [
  {
    id: 'cleaner-1',
    name: 'Anna Schmidt',
    availableSlots: ['08:00-10:00', '10:30-12:30', '14:00-16:00', '16:30-18:30'],
    blockedDates: [],
    maxDailyBookings: 5
  },
  {
    id: 'cleaner-2',
    name: 'Maria Garcia',
    availableSlots: ['09:00-11:00', '11:30-13:30', '15:00-17:00', '17:30-19:30'],
    blockedDates: [],
    maxDailyBookings: 4
  },
  {
    id: 'cleaner-3',
    name: 'Sarah Johnson',
    availableSlots: ['08:30-10:30', '11:00-13:00', '14:30-16:30', '17:00-19:00'],
    blockedDates: [],
    maxDailyBookings: 6
  }
];

export const useScheduleData = () => {
  const [cleaners, setCleaners] = useState<CleanerSchedule[]>(DEFAULT_CLEANERS);
  const [bookingRules, setBookingRules] = useState<BookingRule>(DEFAULT_BOOKING_RULES);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load data from localStorage or API
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Try to load from localStorage first
        const savedCleaners = localStorage.getItem('kleaners-cleaners');
        const savedRules = localStorage.getItem('kleaners-booking-rules');

        if (savedCleaners) {
          setCleaners(JSON.parse(savedCleaners));
        }

        if (savedRules) {
          setBookingRules(JSON.parse(savedRules));
        }

        // In a real app, you would load from your API here
        // const response = await fetch('/api/schedule-data');
        // const data = await response.json();
        // setCleaners(data.cleaners);
        // setBookingRules(data.bookingRules);

      } catch (err) {
        setError('Failed to load schedule data');
        console.error('Error loading schedule data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Save cleaners data
  const updateCleaners = useCallback((newCleaners: CleanerSchedule[]) => {
    setCleaners(newCleaners);
    localStorage.setItem('kleaners-cleaners', JSON.stringify(newCleaners));
  }, []);

  // Save booking rules
  const updateBookingRules = useCallback((newRules: BookingRule) => {
    setBookingRules(newRules);
    localStorage.setItem('kleaners-booking-rules', JSON.stringify(newRules));
  }, []);

  // Add new cleaner
  const addCleaner = useCallback((cleaner: Omit<CleanerSchedule, 'id'>) => {
    const newCleaner: CleanerSchedule = {
      ...cleaner,
      id: `cleaner-${Date.now()}`
    };
    updateCleaners([...cleaners, newCleaner]);
  }, [cleaners, updateCleaners]);

  // Update existing cleaner
  const updateCleaner = useCallback((id: string, updates: Partial<CleanerSchedule>) => {
    const updatedCleaners = cleaners.map(cleaner =>
      cleaner.id === id ? { ...cleaner, ...updates } : cleaner
    );
    updateCleaners(updatedCleaners);
  }, [cleaners, updateCleaners]);

  // Delete cleaner
  const deleteCleaner = useCallback((id: string) => {
    const updatedCleaners = cleaners.filter(cleaner => cleaner.id !== id);
    updateCleaners(updatedCleaners);
  }, [cleaners, updateCleaners]);

  // Get cleaner by ID
  const getCleanerById = useCallback((id: string) => {
    return cleaners.find(cleaner => cleaner.id === id);
  }, [cleaners]);

  // Check if a time slot is available
  const isTimeSlotAvailable = useCallback((date: Date, timeSlot: string) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return cleaners.some(cleaner => 
      cleaner.availableSlots.includes(timeSlot) &&
      !cleaner.blockedDates.includes(dateStr)
    );
  }, [cleaners]);

  // Get available time slots for a date
  const getAvailableTimeSlots = useCallback((date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const availableSlots: string[] = [];
    
    cleaners.forEach(cleaner => {
      if (!cleaner.blockedDates.includes(dateStr)) {
        cleaner.availableSlots.forEach(slot => {
          if (!availableSlots.includes(slot)) {
            availableSlots.push(slot);
          }
        });
      }
    });
    
    return availableSlots;
  }, [cleaners]);

  // Get cleaner availability for a specific date and time
  const getCleanerAvailability = useCallback((date: Date, timeSlot: string) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return cleaners.filter(cleaner => 
      cleaner.availableSlots.includes(timeSlot) &&
      !cleaner.blockedDates.includes(dateStr)
    );
  }, [cleaners]);

  // Block a date for a cleaner
  const blockDate = useCallback((cleanerId: string, date: string) => {
    updateCleaner(cleanerId, {
      blockedDates: [...(getCleanerById(cleanerId)?.blockedDates || []), date]
    });
  }, [updateCleaner, getCleanerById]);

  // Unblock a date for a cleaner
  const unblockDate = useCallback((cleanerId: string, date: string) => {
    const cleaner = getCleanerById(cleanerId);
    if (cleaner) {
      updateCleaner(cleanerId, {
        blockedDates: cleaner.blockedDates.filter(d => d !== date)
      });
    }
  }, [updateCleaner, getCleanerById]);

  // Add time slot to cleaner
  const addTimeSlot = useCallback((cleanerId: string, timeSlot: string) => {
    const cleaner = getCleanerById(cleanerId);
    if (cleaner && !cleaner.availableSlots.includes(timeSlot)) {
      updateCleaner(cleanerId, {
        availableSlots: [...cleaner.availableSlots, timeSlot]
      });
    }
  }, [updateCleaner, getCleanerById]);

  // Remove time slot from cleaner
  const removeTimeSlot = useCallback((cleanerId: string, timeSlot: string) => {
    const cleaner = getCleanerById(cleanerId);
    if (cleaner) {
      updateCleaner(cleanerId, {
        availableSlots: cleaner.availableSlots.filter(slot => slot !== timeSlot)
      });
    }
  }, [updateCleaner, getCleanerById]);

  return {
    // Data
    cleaners,
    bookingRules,
    isLoading,
    error,
    
    // Actions
    updateCleaners,
    updateBookingRules,
    addCleaner,
    updateCleaner,
    deleteCleaner,
    getCleanerById,
    
    // Availability checks
    isTimeSlotAvailable,
    getAvailableTimeSlots,
    getCleanerAvailability,
    
    // Schedule management
    blockDate,
    unblockDate,
    addTimeSlot,
    removeTimeSlot
  };
};

// Helper function to format date - using date-fns format function
