
import React from 'react';
import { Booking } from './types';
import { usePendingBookings } from './pending-pool/usePendingBookings';
import { EmptyBookingPool } from './pending-pool/EmptyBookingPool';
import { ProviderBookingsList } from './pending-pool/ProviderBookingsList';
import { AdminBookingsList } from './pending-pool/AdminBookingsList';
import { AssignProviderDialog } from './AssignProviderDialog';

interface PendingBookingsPoolProps {
  pendingBookings?: Booking[];
  refreshData: () => void;
  isProviderView?: boolean;
}

export const PendingBookingsPool: React.FC<PendingBookingsPoolProps> = ({
  pendingBookings: externalPendingBookings,
  refreshData,
  isProviderView = false
}) => {
  const {
    pendingBookings,
    sortField,
    sortOrder,
    isAssignDialogOpen,
    selectedBooking,
    handleToggleSort,
    handleUpdateBookingStatus,
    handleDeleteBooking,
    handleViewDetails,
    handleContactClient,
    handleAssignProvider,
    handleAssignClick,
    refreshBookings,
    handleAcceptJob,
    handleRejectJob,
    setIsAssignDialogOpen
  } = usePendingBookings(externalPendingBookings);

  // Combine external refresh with internal refresh
  const handleRefreshBookings = () => {
    refreshBookings();
    refreshData();
  };

  if (pendingBookings.length === 0) {
    return <EmptyBookingPool isProviderView={isProviderView} />;
  }

  // For provider view, use a simpler layout with just the option to accept or reject
  if (isProviderView) {
    return (
      <ProviderBookingsList
        bookings={pendingBookings}
        onAcceptJob={handleAcceptJob}
        onRejectJob={handleRejectJob}
        onRefresh={handleRefreshBookings}
      />
    );
  }
  
  // Admin view without tabs
  return (
    <>
      <AdminBookingsList
        bookings={pendingBookings}
        sortField={sortField}
        sortOrder={sortOrder}
        toggleSort={handleToggleSort}
        updateBookingStatus={handleUpdateBookingStatus}
        deleteBooking={handleDeleteBooking}
        refreshData={handleRefreshBookings}
        viewDetails={handleViewDetails}
        contactClient={handleContactClient}
      />
      
      {selectedBooking && (
        <AssignProviderDialog
          open={isAssignDialogOpen}
          onClose={() => setIsAssignDialogOpen(false)}
          booking={selectedBooking}
          onAssign={handleAssignProvider}
        />
      )}
    </>
  );
};
