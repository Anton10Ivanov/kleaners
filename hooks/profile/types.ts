
/**
 * Interface for notification preferences
 
export interface NotificationPreferences {
  /** Email notifications for booking updates 
  emailBookingUpdates: boolean;
  
  /** Email notifications for promotions 
  emailPromotions: boolean;
  
  /** SMS notifications for booking reminders 
  smsReminders: boolean;
  
  /** Mobile push notifications 
  pushNotifications: boolean;
}

/**
 * Interface for account preferences
 
export interface AccountPreferences {
  /** Preferred language 
  language: string;
  
  /** Dark mode preference 
  darkMode: boolean;
  
  /** Email visibility 
  showEmail: boolean;
  
  /** Phone visibility 
  showPhone: boolean;
}

/**
 * Interface for user data
 */
export interface UserData {
  /** User's unique identifier */
  id: string;
  
  /** User's full name */
  fullName: string;
  
  /** User's email address */
  email: string;
  
  /** User's phone number */
  phone: string;
  
  /** URL to user's avatar image */
  avatarUrl: string;
  
  /** User's notification preferences */
  notificationPreferences: NotificationPreferences;
  
  /** User's account preferences */
  accountPreferences: AccountPreferences;
  
  /** User's created date */
  createdAt: string;
}
