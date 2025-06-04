
// Admin Components Index
// Centralized exports for all admin components

// Main layout components
export { default as AdminLayout } from './AdminLayout';
export { default as AdminHeader } from './AdminHeader';
export { default as AdminTabs } from './AdminTabs';
export { default as AdminQuickActions } from './AdminQuickActions';
export { default as AdminStatsSummary } from './AdminStatsSummary';
export { default as Dashboard } from './Dashboard';

// Navigation components
export { default as MobileSidebar } from './navigation/MobileSidebar';
export { default as SidebarContent } from './navigation/SidebarContent';
export { getNavItems } from './navigation/getNavItems';

// Dashboard components
export { default as DashboardHeader } from './dashboard/DashboardHeader';
export { default as StatCards } from './dashboard/StatCards';
export { default as BookingTrends } from './dashboard/BookingTrends';
export { default as ErrorDisplay } from './dashboard/ErrorDisplay';

// Section components
export { BookingsSection } from './sections/bookings/BookingsRefactored';
export { ClientsSection } from './sections/ClientsSection';
export { ProvidersSection } from './sections/ProvidersSection';
export { CalendarSection } from './sections/CalendarSection';
export { ClientQuestionsSection } from './sections/ClientQuestionsSection';
export { CustomerQuestionsSection } from './sections/CustomerQuestionsSection';
export { VacationRequestsSection } from './sections/VacationRequestsSection';
