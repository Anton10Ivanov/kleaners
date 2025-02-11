
const Services = () => {
  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Cleaning Services</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Professional cleaning solutions for every need</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Regular Cleaning",
              description: "Weekly or bi-weekly cleaning services to maintain a spotless home",
              price: "From €29/hour"
            },
            {
              title: "Deep Cleaning",
              description: "Thorough cleaning for those special occasions or seasonal needs",
              price: "From €35/hour"
            },
            {
              title: "Move In/Out Cleaning",
              description: "Comprehensive cleaning service for moving transitions",
              price: "Custom quote"
            }
          ].map((service) => (
            <div key={service.title} className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{service.description}</p>
              <p className="text-primary font-semibold">{service.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
