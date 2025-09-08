import { Routes, Route } from 'react-router-dom';
import BookingServiceSelector from '@/components/booking/BookingServiceSelector';
import HomeCleaningBooking from './HomeCleaningBooking';
import HomeCleaningBooking2 from './HomeCleaningBooking2';
import HomeCleaning22 from './HomeCleaning22';
import DeepCleaningBooking from './DeepCleaningBooking';
import MoveInOutBooking from './MoveInOutBooking';
import OfficeCleaningBooking from './OfficeCleaningBooking';
import PostConstructionBooking from './PostConstructionBooking';
import { ServiceType } from '@/schemas/booking';
import { useNavigate } from 'react-router-dom';
import { getRouteFromServiceType } from '@/utils/serviceRouting';

const BookingRoutes = () => {
  const navigate = useRouter();

  const handleServiceSelect = (service: ServiceType) => {
    const route = getRouteFromServiceType(service);
    navigate(route);
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
        path="home-cleaning22" 
        element={<HomeCleaning22 />} 
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
