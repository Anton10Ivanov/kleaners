
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { deepCleaningData } from "@/data/services/deepCleaning";
import { useNavigate } from "react-router-dom";

const IntensiveCleaning = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate("/booking");
  };

  // Use deep cleaning data as intensive cleaning is essentially the same service
  const intensiveCleaningData = {
    ...deepCleaningData,
    title: "Intensive Cleaning Service",
    subtitle: "Deep cleaning for the most challenging spaces",
    startingPrice: "$150",
    responseTime: "Same day response",
    onBookingClick: handleBookingClick,
    faqs: [
      {
        question: "How long does intensive cleaning take?",
        answer: "Intensive cleaning typically takes 4-8 hours depending on the size and condition of your space."
      },
      {
        question: "What makes this different from regular cleaning?",
        answer: "Intensive cleaning includes deep scrubbing, detailed sanitization, and attention to areas often missed in regular cleaning."
      },
      {
        question: "Do you bring your own supplies?",
        answer: "Yes, we bring all professional-grade cleaning supplies and equipment needed for the job."
      }
    ]
  };

  return <ServicePageTemplate {...intensiveCleaningData} />;
};

export default IntensiveCleaning;






