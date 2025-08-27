import { Routes, Route } from 'react-router-dom';
import BookingServiceSelector from '@/components/booking/BookingServiceSelector';
import HomeCleaningBooking from './HomeCleaningBooking';
import HomeCleaningBooking2 from './HomeCleaningBooking2';
import DeepCleaningBooking from './DeepCleaningBooking';
import MoveInOutBooking from './MoveInOutBooking';
import OfficeCleaningBooking from './OfficeCleaningBooking';
import PostConstructionBooking from './PostConstructionBooking';
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
      case ServiceType.PostConstruction:
        navigate('/booking/post-construction');
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
      <Route 
        path="home-cleaning2" 
        element={<HomeCleaningBooking2 />} 
      />
      <Route 
        path="office-cleaning" 
        element={<OfficeCleaningBooking />} 
      />
      <Route 
        path="deep-cleaning" 
        element={<DeepCleaningBooking />} 
      />
      <Route 
        path="move-in-out" 
        element={<MoveInOutBooking />} 
      />
      <Route 
        path="post-construction" 
        element={<PostConstructionBooking />} 
      />
    </Routes>
  );
};

export default BookingRoutes;
