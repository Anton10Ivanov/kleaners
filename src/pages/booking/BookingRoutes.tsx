
import { Routes, Route } from 'react-router-dom';
import BookingServiceSelector from '@/components/booking/BookingServiceSelector';
import HomeCleaningBooking from './HomeCleaningBooking';
import { ServiceType } from '@/schemas/booking';
import { useNavigate } from 'react-router-dom';

const BookingRoutes = () => {
  const navigate = useNavigate();

  const handleServiceSelect = (service: ServiceType) => {
    switch (service) {
      case ServiceType.Home:
        navigate('/booking/home-cleaning');
        break;
      case ServiceType.Office:
        navigate('/booking/office-cleaning');
        break;
      case ServiceType.DeepCleaning:
        navigate('/booking/deep-cleaning');
        break;
      case ServiceType.MoveInOut:
        navigate('/booking/move-in-out');
        break;
      default:
        navigate('/booking/home-cleaning');
    }
  };

  return (
    <Routes>
      <Route 
        index 
        element={<BookingServiceSelector onServiceSelect={handleServiceSelect} />} 
      />
      <Route 
        path="home-cleaning" 
        element={<HomeCleaningBooking />} 
      />
      {/* Placeholder routes - will be implemented next */}
      <Route 
        path="office-cleaning" 
        element={<div className="p-8 text-center">Office Cleaning Booking - Coming Soon</div>} 
      />
      <Route 
        path="deep-cleaning" 
        element={<div className="p-8 text-center">Deep Cleaning Booking - Coming Soon</div>} 
      />
      <Route 
        path="move-in-out" 
        element={<div className="p-8 text-center">Move In/Out Booking - Coming Soon</div>} 
      />
    </Routes>
  );
};

export default BookingRoutes;
