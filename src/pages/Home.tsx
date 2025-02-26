
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";

const Home = () => {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <Services />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
};

export default Home;
