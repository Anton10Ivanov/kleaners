
/**
 * Standardized enum definitions for the application
 */

/**
 * Booking frequency options
 */
export enum Frequency {
  OneTime = "oneTime",
  Weekly = "weekly",
  BiWeekly = "biWeekly", // Standardized to BiWeekly (not Biweekly)
  Monthly = "monthly",
  Custom = "custom"
}

/**
 * Service types
 */
export enum Service {
  Regular = "regular",
  MoveInOut = "moveInOut",
  Business = "business",
  Construction = "construction"
}

/**
 * Business establishment types
 */
export enum BusinessType {
  Office = "office",
  Retail = "retail",
  Restaurant = "restaurant",
  Medical = "medical",
  School = "school",
  Warehouse = "warehouse",
  Other = "other"
}

/**
 * Cleaning options/services
 */
export enum CleaningOption {
  Dusting = "dusting",
  Vacuuming = "vacuuming",
  Mopping = "mopping",
  RestroomCleaning = "restroomCleaning",
  TrashRemoval = "trashRemoval",
  WindowCleaning = "windowCleaning",
  KitchenCleaning = "kitchenCleaning",
  DeepCleaning = "deepCleaning"
}

/**
 * Property size categories
 */
export enum PropertySize {
  Small = "small",
  Medium = "medium",
  Large = "large",
  ExtraLarge = "extraLarge"
}

/**
 * Error severity levels
 */
export enum ErrorSeverity {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
  INFO = "info",
  WARNING = "warning",
  ERROR = "error"
}

/**
 * Booking status values
 */
export enum BookingStatus {
  Pending = "pending",
  Assigned = "assigned",
  Confirmed = "confirmed",
  Completed = "completed",
  Cancelled = "cancelled"
}

/**
 * User roles in the application
 */
export enum UserRole {
  ADMIN = "admin",
  PROVIDER = "provider",
  CLIENT = "client",
  SUPER_ADMIN = "super_admin"
}

/**
 * Application steps for provider onboarding
 */
export enum ApplicationStep {
  PERSONAL_INFO = 0,
  EXPERIENCE = 1,
  DOCUMENTS = 2,
  CONFIRMATION = 3
}
