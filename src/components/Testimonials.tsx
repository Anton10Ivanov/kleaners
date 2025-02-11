
const Testimonials = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Clients Say</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Read testimonials from our satisfied customers</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah M.",
              text: "The best cleaning service I've ever used. Professional, thorough, and friendly staff.",
              location: "Berlin"
            },
            {
              name: "Michael K.",
              text: "Reliable and consistent quality. I've been using their services for over a year now.",
              location: "Munich"
            },
            {
              name: "Anna L.",
              text: "Excellent deep cleaning service. They transformed my apartment before I moved in.",
              location: "Hamburg"
            }
          ].map((testimonial) => (
            <div key={testimonial.name} className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl shadow-sm">
              <p className="text-gray-600 dark:text-gray-400 mb-4">"{testimonial.text}"</p>
              <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
              <p className="text-gray-500 dark:text-gray-400">{testimonial.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
