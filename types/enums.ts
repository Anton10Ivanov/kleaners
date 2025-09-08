/**
 * Enum for booking status values
 */
export enum BookingStatus {
  Pending = "pending",
  Assigned = "assigned", 
  Confirmed = "confirmed",
  Completed = "completed",
  Cancelled = "cancelled"
}

/**
 * Enum for business types
 */
export enum BusinessType {
  Office = "office",
  Restaurant = "restaurant",
  Retail = "retail",
  Medical = "medical",
  School = "school",
  Warehouse = "warehouse",
  Event = "event",
  Praxen = "praxen",
  Airbnb = "airbnb",
  Other = "other"
}

/**
 * Enum for cleaning options
 */
export enum CleaningOption {
  BasicCleaning = "basic-cleaning",
  DeepCleaning = "deep-cleaning",
  DisinfectionCleaning = "disinfection-cleaning",
  WindowCleaning = "window-cleaning",
  FloorCleaning = "floor-cleaning",
  KitchenCleaning = "kitchen-cleaning",
  BathroomCleaning = "bathroom-cleaning",
  OfficeCleaning = "office-cleaning"
}

/**
 * Enum for property sizes
 */
export enum PropertySize {
  Small = "small",
  Medium = "medium",
  Large = "large",
  ExtraLarge = "extra-large"
}

/**
 * Enum for error severity levels
 */
export enum ErrorSeverity {
  Low = "low",
  Medium = "medium",
  High = "high",
  Critical = "critical"
}

/**
 * Enum for application steps
 */
export enum ApplicationStep {
  PersonalInfo = "personal-info",
  Experience = "experience",
  Documents = "documents",
  Confirmation = "confirmation",
  Success = "success"
}
