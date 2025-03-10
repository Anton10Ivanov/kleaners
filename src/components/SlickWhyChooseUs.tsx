
import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import Slider from "react-slick";
import { whyChooseUsContent, advantagesByCategory } from "./why-choose-us/WhyChooseUsContent";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlickWhyChooseUs = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_: number, next: number) => setActiveSlide(next),
    arrows: !isMobile,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    adaptiveHeight: true,
    customPaging: (i: number) => (
      <div 
        className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${
          i === activeSlide ? "bg-primary scale-125" : "bg-gray-300 dark:bg-gray-700"
        }`} 
      />
    ),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          adaptiveHeight: true
        }
      }
    ]
  };

  // Featured advantages to display in the grid (limited selection)
  const featuredAdvantages = [
    whyChooseUsContent.find(item => item.title === "Local Cleaners"),
    whyChooseUsContent.find(item => item.title === "Transparent Pricing"),
    whyChooseUsContent.find(item => item.title === "Customizable Service"),
    whyChooseUsContent.find(item => item.title === "Flexible Scheduling"),
    whyChooseUsContent.find(item => item.title === "Fully Insured"),
    whyChooseUsContent.find(item => item.title === "Fast Booking")
  ].filter(Boolean);

  return (
    <section id="why-choose-us-slider" className="py-8 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[12px]">
        <div className="text-left mb-6 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4 drop-shadow-sm my-[12px] text-zinc-950">
            Why Choose Us
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl">
            We make home cleaning simple, reliable, and tailored to your needs with our trusted local professionals.
          </p>
        </div>

        {/* Advantages Grid - organized by top features */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3 lg:gap-4 mb-8 md:mb-12">
          {featuredAdvantages.map((item, index) => (
            <div 
              key={`box-${index}`} 
              className="p-3 md:p-4 rounded-xl shadow-md flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 bg-white hover:shadow-lg border border-gray-100"
            >
              <div className="p-2 md:p-3 bg-[#E3F4FF] rounded-full mb-2 md:mb-3">
                <item!.icon className="w-5 h-5 md:w-7 md:h-7 text-[#0FA0CE]" />
              </div>
              <h3 className="text-xs md:text-sm lg:text-base font-bold text-gray-900 mb-1 drop-shadow-md">
                {item!.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Categorized advantages in tabs/sections */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {Object.entries(advantagesByCategory).map(([category, items], idx) => (
              <div key={category} className="w-full md:w-auto">
                <h3 className="text-xl font-bold text-center md:text-left mb-4 capitalize">
                  {category === 'trust' ? 'Trust & Security' : 
                   category === 'convenience' ? 'Convenience' : 'Flexibility'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.slice(0, 3).map((item, index) => (
                    <div 
                      key={`${category}-${index}`}
                      className="p-4 bg-white rounded-lg shadow border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start">
                        <div className="p-2 bg-[#E3F4FF] rounded-full mr-3">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                          <p className="text-gray-600 text-sm">{item.description.split('.')[0]}.</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slider - showcasing detailed advantages */}
        <div className="slick-container max-w-5xl mx-auto">
          <Slider {...settings}>
            {whyChooseUsContent.map((item, index) => (
              <div key={index} className="focus:outline-none py-0 px-0">
                <div className="rounded-2xl overflow-hidden shadow-xl transition-all duration-700 transform bg-white border border-gray-100">
                  <div className="relative w-full min-h-[250px] md:min-h-[300px] lg:min-h-[400px] flex items-center justify-center text-gray-900 p-6 md:p-8 lg:p-10 overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-gray-100 blur-3xl"></div>
                      <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-gray-100 blur-3xl"></div>
                    </div>
                    
                    <div className="text-center transform transition-all duration-700 z-10 animate-fadeIn">
                      <div className="mb-6 md:mb-8 p-4 md:p-6 rounded-full bg-[#E3F4FF] inline-block shadow-inner">
                        <item.icon className="w-10 h-10 md:w-14 md:h-14 lg:w-18 lg:h-18 text-[#0FA0CE]" />
                      </div>
                      <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 md:mb-4 drop-shadow-md text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-base md:text-lg lg:text-xl max-w-md mx-auto font-medium text-gray-700 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Mobile cards view (as fallback if slider doesn't work) */}
        {isMobile && (
          <style>
            {`
              .slick-container {
                visibility: visible !important;
              }
              @media (max-width: 768px) {
                .slick-slider.slick-initialized {
                  visibility: visible !important;
                }
              }
            `}
          </style>
        )}

        {/* Custom styles for slider - Enhanced touch areas for mobile */}
        <style>
            {`
              .slick-dots {
                bottom: -30px;
                padding: 10px 0;
              }
              .slick-dots li {
                margin: 0 5px;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .slick-dots li button:before {
                display: none;
              }
              .slick-prev, .slick-next {
                width: 40px;
                height: 40px;
                z-index: 10;
              }
              .slick-prev {
                left: -10px;
              }
              .slick-next {
                right: -10px;
              }
              .slick-prev:before, .slick-next:before {
                font-size: 40px;
                color: #7ebce6;
                opacity: 0.75;
              }
              .slick-prev:hover:before, .slick-next:hover:before {
                opacity: 1;
              }
              .animate-fadeIn {
                animation: fadeIn 0.8s ease-out forwards;
              }
              @keyframes fadeIn {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              .animate-pulse {
                animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
              }
              @keyframes pulse {
                0%, 100% {
                  opacity: 1;
                }
                50% {
                  opacity: 0.8;
                }
              }
              
              /* Mobile touch optimizations */
              @media (max-width: 768px) {
                .slick-dots li {
                  width: 30px;
                  height: 30px;
                }
                .slick-slide {
                  touch-action: pan-y;
                }
                /* Larger tap targets */
                .slick-prev, .slick-next {
                  width: 50px;
                  height: 50px;
                }
              }
            `}
          </style>
      </div>
    </section>
  );
};

export default SlickWhyChooseUs;
