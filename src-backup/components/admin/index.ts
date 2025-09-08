
// Admin Components Index
// Centralized exports for all admin components

// Main layout components
export { default as AdminLayout } from './AdminLayout';
export { default as AdminHeader } from './AdminHeader';

// Unified components
export { AdminDataTable } from './AdminDataTable';
export { AdminForm } from './AdminForm';
export { default as AdminTabs } from './AdminTabs';
export { default as AdminQuickActions } from './AdminQuickActions';
export { default as AdminStatsSummary } from './AdminStatsSummary';
export { Dashboard } from './Dashboard';

// Navigation components
export { MobileSidebar } from './navigation/MobileSidebar';
export { SidebarContent } from './navigation/SidebarContent';
export { getNavItems } from './navigation/getNavItems';

// Dashboard components
export { DashboardHeader } from './dashboard/DashboardHeader';
export { StatCards } from './dashboard/StatCards';
export { BookingTrends } from './dashboard/BookingTrends';
export { ErrorDisplay } from './dashboard/ErrorDisplay';

// Section components
export { BookingsSection } from './sections/bookings/BookingsRefactored';
export { ClientsSection } from './sections/ClientsSection';
export { ProvidersSection } from './sections/ProvidersSection';
export { CalendarSection } from './sections/CalendarSection';
export { ClientQuestionsSection } from './sections/ClientQuestionsSection';
export { default as CustomerQuestionsSection } from './sections/CustomerQuestionsSection';
export { VacationRequestsSection } from './sections/VacationRequestsSection';
