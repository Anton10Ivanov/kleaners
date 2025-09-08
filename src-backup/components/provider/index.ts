
// Provider Components Index
// Centralized exports for all provider components

// Main layout components
export { default as ProviderLayout } from './ProviderLayout';
export { TopNav } from './TopNav';

// Unified components
export { ProviderDataTable } from './ProviderDataTable';
export { ProviderForm } from './ProviderForm';
export { ProviderSection } from './ProviderSection';
export { default as ProviderBottomNav } from './ProviderBottomNav';
export { ErrorBoundaryWrapper } from './ErrorBoundaryWrapper';

// Application components
// ApplicationForm removed - replaced by ProviderForm
export { BenefitsPanel } from './application/BenefitsPanel';
export { ConfirmationStep } from './application/ConfirmationStep';
export { DocumentsStep } from './application/DocumentsStep';
export { ExperienceStep } from './application/ExperienceStep';
export { PersonalInfoStep } from './application/PersonalInfoStep';
export { SuccessSubmission } from './application/SuccessSubmission';

// Application sub-components
export { ApplicationNavigation } from './application/components/ApplicationNavigation';
export { ApplicationSteps } from './application/components/ApplicationSteps';
export { AvailabilitySection } from './application/components/AvailabilitySection';
export { EmploymentTypeSection } from './application/components/EmploymentTypeSection';
export { EquipmentSection } from './application/components/EquipmentSection';
export { ExperienceSection } from './application/components/ExperienceSection';
export { SelectionButtons as FormSelectionButtons } from './application/components/FormSelectionButtons';
export { PositionSection } from './application/components/PositionSection';
export { SkillsSection } from './application/components/SkillsSection';
export { StepContent } from './application/components/StepContent';

// Availability components
export { CalendarView } from './availability/CalendarView';
export { QuickAvailabilityToggle } from './availability/QuickAvailabilityToggle';
export { ServiceAreaForm } from './availability/ServiceAreaForm';
export { ServiceAreasList } from './availability/ServiceAreasList';
export { ServiceAreasTab } from './availability/ServiceAreasTab';
export { TimeRangeSelector } from './availability/TimeRangeSelector';
export { VacationRequestDialog } from './availability/VacationRequestDialog';
export { WeeklySchedule } from './availability/WeeklySchedule';

// Booking components
export { default as BookingCard } from './bookings/BookingCard';
export { default as BookingDetailsCard } from './bookings/BookingDetailsCard';
export { default as BookingList } from './bookings/BookingList';
export { default as BookingMap } from './bookings/BookingMap';
export { default as BookingTabs } from './bookings/BookingTabs';
export { default as BookingsContent } from './bookings/BookingsContent';
export { default as BookingsHeader } from './bookings/BookingsHeader';
export { FilterableStatsCards } from './bookings/FilterableStatsCards';
export { default as ScheduleCard } from './bookings/ScheduleCard';

// Dashboard components
export { EarningsHistory } from './dashboard/EarningsHistory';
export { ServicePerformance } from './dashboard/ServicePerformance';

// Messages components
export { default as MessagesContent } from './messages/MessagesContent';
export { default as MessagesSidebar } from './messages/MessagesSidebar';

// Profile components
export { ProfileCompletionIndicator } from './profile/ProfileCompletionIndicator';
export { ProfileContent } from './profile/ProfileContent';
export { ProfileHeader } from './profile/ProfileHeader';
