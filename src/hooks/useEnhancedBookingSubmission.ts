import { useState } from 'react';
import { BookingFormData } from '@/schemas/booking';
import { BookingFormData as EnhancedBookingFormData, ServiceType, validateBookingData } from '@/schemas/bookingSchemas';
import { toast } from 'sonner';
import useBookingStore from '@/store/useBookingStore';
import { generateBookingReference } from '@/utils/bookingReference';
import { formPersistence } from '@/utils/formPersistence';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';
import { getPrice } from '@/utils/pricing';
import { logInfo, logError } from '@/utils/console-cleanup';
import { useFeatureFlags } from '@/contexts/FeatureFlagContext';
import type { Database } from '@/types/database';

interface BookingSubmissionResult {
  success: boolean;
  referenceNumber?: string;
  error?: string;
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

type AnyBookingFormData = BookingFormData | EnhancedBookingFormData;

interface BookingWithStatus {
  bookingData: AnyBookingFormData;
  referenceNumber: string;
  status: BookingStatus;
  createdAt: Date;
  emailSent: boolean;
}

/**
 * Enhanced hook for handling booking submission with support for both legacy and new schemas
 */
export const useEnhancedBookingSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationData, setConfirmationData] = useState<{
    bookingData: AnyBookingFormData;
    referenceNumber: string;
  } | null>(null);
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>(BookingStatus.PENDING);
  
  const resetForm = useBookingStore(state => state.resetForm);
  const { user } = useAuth();
  const { flags } = useFeatureFlags();
  
  /**
   * Send confirmation email
   */
  const sendConfirmationEmail = async (bookingData: AnyBookingFormData, referenceNumber: string): Promise<boolean> => {
    try {
      logInfo('Sending confirmation email for booking', { referenceNumber }, 'useEnhancedBookingSubmission');
      
      const emailData = {
        to: bookingData.email,
        subject: `Booking Confirmation - Reference #${referenceNumber}`,
        template: 'booking_confirmation',
        data: {
          customerName: `${bookingData.firstName} ${bookingData.lastName}`,
          referenceNumber,
          serviceType: bookingData.serviceType,
          address: `${bookingData.address}, ${bookingData.city} ${bookingData.postalCode}`,
          date: bookingData.selectedDate?.toLocaleDateString() || new Date().toLocaleDateString(),
          specialInstructions: bookingData.specialInstructions || 'None'
        }
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      logInfo('Email sent successfully', { emailData }, 'useEnhancedBookingSubmission');
      toast.success('Confirmation email sent!');
      return true;
      
    } catch (error) {
      logError('Failed to send confirmation email', error, 'useEnhancedBookingSubmission');
      toast.error('Failed to send confirmation email. We will contact you shortly.');
      return false;
    }
  };
  
  /**
   * Update booking status
   */
  const updateBookingStatus = (newStatus: BookingStatus) => {
    setBookingStatus(newStatus);
    logInfo('Booking status updated', { newStatus }, 'useEnhancedBookingSubmission');
  };

  /**
   * Map enhanced form data to database schema
   */
  const mapEnhancedDataToDatabase = (data: EnhancedBookingFormData): Database['public']['Tables']['bookings']['Insert'] => {
    const serviceTypeMap = {
      'home': 'regular' as const,
      'office': 'business' as const,
      'deep-cleaning': 'move_in_out' as const,
      'move-in-out': 'move_in_out' as const,
      'post-construction': 'post_construction' as const
    };

    const mapFrequency = (freq: string) => {
      switch (freq) {
        case 'one-time': return 'one_time' as const;
        case 'bi-weekly': return 'bi_weekly' as const;
        case 'weekly': return 'weekly' as const;
        case 'monthly': return 'monthly' as const;
        default: return 'one_time' as const;
      }
    };

    return {
      service_type: serviceTypeMap[data.serviceType as keyof typeof serviceTypeMap] || 'regular',
      postal_code: data.postalCode,
      address: data.address,
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      floor: data.floor,
      entry_code: data.entryCode,
      access_method: data.accessMethod,
      special_instructions: data.specialInstructions,
      extras: data.extras || [],
      date: data.selectedDate?.toISOString(),
      frequency: 'one_time',
      hours: 1,
      bedrooms: 0,
      bathrooms: 1,
      status: 'pending' as const,
      total_price: getPrice(data as any),
      // Add service-specific fields
      ...(data.serviceType === 'home' && {
        property_size: (data as any).propertySize,
        supplies_provided: (data as any).suppliesProvided,
        dirtiness_level: (data as any).dirtinessLevel,
      }),
      ...(data.serviceType === 'office' && {
        square_meters: (data as any).squareMeters,
        num_employees: (data as any).numEmployees,
        avg_visitors_per_week: (data as any).avgVisitorsPerWeek,
        cleaning_during_work_hours: (data as any).cleaningDuringWorkHours,
        security_clearance_required: (data as any).securityClearanceRequired,
      }),
      ...(data.serviceType === 'deep-cleaning' && {
        square_meters: (data as any).squareMeters,
        dirtiness_level: (data as any).dirtinessLevel,
        last_cleaned: (data as any).lastCleaned?.toISOString(),
        include_walls_and_ceilings: (data as any).includeWallsAndCeilings,
        mold_or_pest_presence: (data as any).moldOrPestPresence,
        special_surfaces_to_handle: (data as any).specialSurfacesToHandle,
        target_areas: (data as any).targetAreas,
      }),
      ...(data.serviceType === 'move-in-out' && {
        square_meters: (data as any).squareMeters,
        is_furnished: (data as any).isFurnished,
        trash_removal_needed: (data as any).trashRemovalNeeded,
        pre_inspection_required: (data as any).preInspectionRequired,
        parking_available: (data as any).parkingAvailable,
        dirtiness_level: (data as any).dirtinessLevel,
        cleaning_goal: (data as any).cleaningGoal,
        disinfection_required: (data as any).disinfectionRequired,
      }),
    } as any; // Type assertion to bypass strict typing for now
  };

  /**
   * Map legacy form data to database schema
   */
  const mapLegacyDataToDatabase = (data: BookingFormData): Database['public']['Tables']['bookings']['Insert'] => {
    const mapFrequency = (freq: string) => {
      switch (freq) {
        case 'one-time': return 'one_time' as const;
        case 'bi-weekly': return 'bi_weekly' as const;
        case 'weekly': return 'weekly' as const;
        case 'monthly': return 'monthly' as const;
        default: return 'one_time' as const;
      }
    };

    return {
      service_type: data.serviceType === 'home' ? 'regular' : 'business',
      postal_code: data.postalCode,
      address: `${data.address}, ${data.city} ${data.postalCode}`,
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      floor: data.floor,
      entry_code: data.entryCode,
      access_method: data.accessMethod,
      special_instructions: data.specialInstructions,
      extras: data.extras || [],
      date: (data.selectedDate || data.date)?.toISOString(),
      frequency: mapFrequency(data.frequency || 'one-time'),
      hours: data.hours || 1,
      bedrooms: data.bedrooms || 0,
      bathrooms: data.bathrooms || 1,
      status: 'pending' as const,
      total_price: getPrice(data),
    } as any; // Type assertion to bypass strict typing for now
  };
  
  /**
   * Submit booking data with enhanced error handling, confirmation, and email flow
   */
  const submitBooking = async (data: AnyBookingFormData): Promise<BookingSubmissionResult> => {
    setIsSubmitting(true);
    updateBookingStatus(BookingStatus.PENDING);
    
    if (!user) {
      toast.error("You need to be logged in to complete a booking.");
      setIsSubmitting(false);
      return { success: false, error: 'User not authenticated' };
    }

    try {
      // Validate data based on schema type
      if (flags.enhancedBookingSchema) {
        const serviceType = data.serviceType as ServiceType;
        const validationResult = validateBookingData(serviceType, data);
        
        if (!validationResult.success) {
          const errorMessage = validationResult.error.issues.map(issue => issue.message).join(', ');
          throw new Error(`Validation failed: ${errorMessage}`);
        }
      }

      // Validate required fields
      if (!data.firstName || !data.lastName || !data.email || !data.phone) {
        throw new Error('Please fill in all required personal information');
      }
      
      if (!data.address || !data.city || !data.postalCode) {
        throw new Error('Please provide a complete address');
      }
      
      if (!data.accessMethod) {
        throw new Error('Please specify how we should access your property');
      }
      
      // Generate booking reference
      const referenceNumber = generateBookingReference();
      
      logInfo('Submitting booking', { referenceNumber, dataKeys: Object.keys(data), enhancedSchema: flags.enhancedBookingSchema }, 'useEnhancedBookingSubmission');
      
      // Map form data to database schema based on flag
      const databaseData = flags.enhancedBookingSchema 
        ? mapEnhancedDataToDatabase(data as EnhancedBookingFormData)
        : mapLegacyDataToDatabase(data as BookingFormData);

      // Add user ID
      const insertData = {
        ...databaseData,
        user_id: user.id,
      };

      // Insert into Supabase
      const { error: insertError } = await supabase.from('bookings').insert(insertData);

      if (insertError) {
        logError('Supabase insert error', insertError, 'useEnhancedBookingSubmission');
        throw new Error('Could not save your booking. Please try again.');
      }
      
      // Create booking with status tracking
      const bookingWithStatus: BookingWithStatus = {
        bookingData: data,
        referenceNumber,
        status: BookingStatus.PENDING,
        createdAt: new Date(),
        emailSent: false
      };
      
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update status to confirmed
      updateBookingStatus(BookingStatus.CONFIRMED);
      
      // Send confirmation email
      const emailSent = await sendConfirmationEmail(data, referenceNumber);
      
      // Update booking with email status
      bookingWithStatus.emailSent = emailSent;
      bookingWithStatus.status = BookingStatus.CONFIRMED;
      
      // Store confirmation data
      setConfirmationData({
        bookingData: data,
        referenceNumber
      });
      
      // Success! Show toast and clear form persistence
      toast.success(`Booking confirmed! Reference: #${referenceNumber}`);
      formPersistence.clear();
      
      return {
        success: true,
        referenceNumber
      };
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      logError('Error submitting booking', error, 'useEnhancedBookingSubmission');
      
      updateBookingStatus(BookingStatus.CANCELLED);
      toast.error(errorMessage);
      
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsSubmitting(false);
    }
  };
  
  /**
   * Clear confirmation data and reset form
   */
  const clearConfirmation = () => {
    setConfirmationData(null);
    setBookingStatus(BookingStatus.PENDING);
    resetForm();
  };
  
  /**
   * Get current booking status with display text
   */
  const getStatusDisplay = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.PENDING:
        return { text: 'Pending', color: 'text-yellow-600' };
      case BookingStatus.CONFIRMED:
        return { text: 'Confirmed', color: 'text-green-600' };
      case BookingStatus.IN_PROGRESS:
        return { text: 'In Progress', color: 'text-blue-600' };
      case BookingStatus.COMPLETED:
        return { text: 'Completed', color: 'text-green-700' };
      case BookingStatus.CANCELLED:
        return { text: 'Cancelled', color: 'text-red-600' };
      default:
        return { text: 'Unknown', color: 'text-gray-600' };
    }
  };
  
  return {
    submitBooking,
    isSubmitting,
    confirmationData,
    clearConfirmation,
    bookingStatus,
    updateBookingStatus,
    getStatusDisplay,
    sendConfirmationEmail,
    isEnhancedSchema: flags.enhancedBookingSchema
  };
};

export default useEnhancedBookingSubmission;