
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { ArrowRight, Sparkles, Shield, Clock, Phone } from 'lucide-react';

const Index = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted with email:', email);
  };

  return (
    <div className="min-h-screen font-raleway">
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 bg-gradient-to-b from-white to-secondary">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fadeIn">
            Professional Cleaning<br />for Your Peace of Mind
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fadeIn">
            Experience spotless spaces with our premium cleaning services. Let us handle the cleaning while you focus on what matters most.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeIn">
            <button className="bg-primary text-white px-8 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              Book Now
              <ArrowRight size={20} />
            </button>
            <button className="bg-white text-primary px-8 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors border border-primary">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-secondary p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="text-primary mb-4">
                  <Sparkles size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="about" className="py-20 px-4 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              icon={<Shield className="w-8 h-8 text-primary" />}
              title="Trusted & Reliable"
              description="Fully insured and bonded cleaning services you can trust"
            />
            <Feature
              icon={<Sparkles className="w-8 h-8 text-primary" />}
              title="Expert Team"
              description="Professionally trained and experienced cleaning specialists"
            />
            <Feature
              icon={<Clock className="w-8 h-8 text-primary" />}
              title="Flexible Scheduling"
              description="Convenient scheduling that works around your timetable"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Get in Touch</h2>
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
              <button
                type="submit"
                className="w-full bg-primary text-white px-8 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                Contact Us
                <Phone size={20} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p>&copy; 2024 SparkleClean. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const Feature = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="text-center p-6 bg-white rounded-lg hover:shadow-lg transition-shadow">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const services = [
  {
    title: "Home Cleaning",
    description: "Comprehensive cleaning services for homes of all sizes",
  },
  {
    title: "Office Cleaning",
    description: "Professional cleaning solutions for commercial spaces",
  },
  {
    title: "Deep Cleaning",
    description: "Thorough deep cleaning for a pristine environment",
  },
];

export default Index;
