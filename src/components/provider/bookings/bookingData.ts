
// Mock booking data for development
export const getBookingData = () => {
  // Placeholder data for development
  const upcomingBookings = [
    { 
      id: '1', 
      clientName: 'John Smith',
      address: '123 Main St, Apt 4B, Berlin',
      coordinates: [13.404954, 52.520007], // Berlin center coordinates
      date: new Date(Date.now() + 86400000), // Tomorrow
      time: '14:00 - 16:00',
      service: 'Regular Cleaning',
      hours: 2,
    },
    { 
      id: '2', 
      clientName: 'Emma Johnson',
      address: '456 Elm St, Berlin',
      coordinates: [13.414954, 52.530007], // Slightly north-east from center
      date: new Date(Date.now() + 172800000), // Day after tomorrow
      time: '10:00 - 13:00',
      service: 'Deep Cleaning',
      hours: 3,
    }
  ];
  
  const pendingBookings = [
    { 
      id: '3', 
      clientName: 'Michael Brown',
      address: '789 Oak St, Berlin',
      coordinates: [13.394954, 52.510007], // Slightly south-west from center
      date: new Date(Date.now() + 345600000), // 4 days from now
      time: '09:00 - 12:00',
      service: 'Move-In Cleaning',
      hours: 3,
      isConfirmationPending: true
    }
  ];
  
  const completedBookings = [
    { 
      id: '4', 
      clientName: 'Sarah Miller',
      address: '101 Pine St, Berlin',
      coordinates: [13.384954, 52.525007], // Slightly west from center
      date: new Date(Date.now() - 86400000), // Yesterday
      time: '13:00 - 15:00',
      service: 'Regular Cleaning',
      hours: 2,
      completed: true
    }
  ];

  return {
    upcomingBookings,
    pendingBookings,
    completedBookings
  };
};
