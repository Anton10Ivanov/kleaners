
const WhyChooseUs = () => {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Kleaners.de</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Experience the difference with our professional cleaning service</p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              title: "Experienced Staff",
              description: "Our cleaners are professionally trained and background checked"
            },
            {
              title: "Eco-Friendly",
              description: "We use environmentally safe cleaning products"
            },
            {
              title: "Flexible Scheduling",
              description: "Book our services at your convenience"
            },
            {
              title: "Satisfaction Guaranteed",
              description: "100% satisfaction guarantee on all our services"
            }
          ].map((feature) => (
            <div key={feature.title} className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
