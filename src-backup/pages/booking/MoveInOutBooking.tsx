import { useState } from 'react';
import { useBookingSubmission } from '@/hooks/useBookingSubmission';
import { useNavigate } from 'react-router-dom';
import { UnifiedBookingForm } from '@/components/forms/UnifiedBookingForm';
import { motion } from 'framer-motion';

const MoveInOutBooking = () => {
  const { submitBooking } = useBookingSubmission();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await submitBooking(data);
      navigate('/booking/confirmation');
    } catch (error) {
      console.error('Booking submission failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/booking');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background"
    >
      <div className="container mx-auto px-4 py-8">
        <UnifiedBookingForm
          serviceType="move-in-out"
          onSubmit={handleSubmit}
          onBack={handleBack}
          isLoading={isLoading}
        />
      </div>
    </motion.div>
  );
};

export default MoveInOutBooking;