
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * UserDashboard component 
 * 
 * This component redirects to the UserBookings page as the dashboard 
 * functionality has been moved there
 */
const UserDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to bookings page since the dashboard functionality
    // has been moved there
    navigate('/user/bookings');
  }, [navigate]);

  return null;
};

export default UserDashboard;
