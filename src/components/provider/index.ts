
// Provider Components Index
// Centralized exports for all provider components

// Main layout components
export { default as ProviderLayout } from './ProviderLayout';
export { default as TopNav } from './TopNav';
export { default as ProviderBottomNav } from './ProviderBottomNav';
export { default as ErrorBoundaryWrapper } from './ErrorBoundaryWrapper';

// Application components
export { default as ApplicationForm } from './application/ApplicationForm';
export { default as BenefitsPanel } from './application/BenefitsPanel';
export { default as ConfirmationStep } from './application/ConfirmationStep';
export { default as DocumentsStep } from './application/DocumentsStep';
export { default as ExperienceStep } from './application/ExperienceStep';
export { default as PersonalInfoStep } from './application/PersonalInfoStep';
export { default as SuccessSubmission } from './application/SuccessSubmission';

// Application sub-components
export { ApplicationNavigation } from './application/components/ApplicationNavigation';
export { ApplicationSteps } from './application/components/ApplicationSteps';
export { AvailabilitySection } from './application/components/AvailabilitySection';
export { EmploymentTypeSection } from './application/components/EmploymentTypeSection';
export { EquipmentSection } from './application/components/EquipmentSection';
export { ExperienceSection } from './application/components/ExperienceSection';
export { FormSelectionButtons } from './application/components/FormSelectionButtons';
export { PositionSection } from './application/components/PositionSection';
export { SkillsSection } from './application/components/SkillsSection';
export { StepContent } from './application/components/StepContent';

// Availability components
export { default as CalendarView } from './availability/CalendarView';
export { default as QuickAvailabilityToggle } from './availability/QuickAvailabilityToggle';
export { default as ServiceAreaForm } from './availability/ServiceAreaForm';
export { default as ServiceAreasList } from './availability/ServiceAreasList';
export { default as ServiceAreasTab } from './availability/ServiceAreasTab';
export { default as TimeRangeSelector } from './availability/TimeRangeSelector';
export { default as VacationRequestDialog } from './availability/VacationRequestDialog';
export { default as WeeklySchedule } from './availability/WeeklySchedule';

// Booking components
export { default as BookingCard } from './bookings/BookingCard';
export { default as BookingDetailsCard } from './bookings/BookingDetailsCard';
export { default as BookingList } from './bookings/BookingList';
export { default as BookingMap } from './bookings/BookingMap';
export { default as BookingTabs } from './bookings/BookingTabs';
export { default as BookingsContent } from './bookings/BookingsContent';
export { default as BookingsHeader } from './bookings/BookingsHeader';
export { default as FilterableStatsCards } from './bookings/FilterableStatsCards';
export { default as ScheduleCard } from './bookings/ScheduleCard';

// Dashboard components
export { default as EarningsHistory } from './dashboard/EarningsHistory';
export { default as ServicePerformance } from './dashboard/ServicePerformance';

// Messages components
export { default as MessagesContent } from './messages/MessagesContent';
export { default as MessagesSidebar } from './messages/MessagesSidebar';

// Profile components
export { default as ProfileCompletionIndicator } from './profile/ProfileCompletionIndicator';
export { default as ProfileContent } from './profile/ProfileContent';
export { default as ProfileHeader } from './profile/ProfileHeader';
