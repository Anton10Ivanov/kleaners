import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import Slider from "react-slick";
import { whyChooseUsContent } from "./why-choose-us/WhyChooseUsContent";
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
    customPaging: (i: number) => <div className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${i === activeSlide ? "bg-primary scale-125" : "bg-gray-300 dark:bg-gray-700"}`} />,
    responsive: [{
      breakpoint: 768,
      settings: {
        arrows: false,
        adaptiveHeight: true
      }
    }]
  };
  return <section id="why-choose-us-slider" className="py-16 md:py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 drop-shadow-sm">
            Why Choose Kleaners.de
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">Experience the difference with us. We combine quality, reliability, and flexibility to give you the best possible cleaning experience.</p>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-12">
          {whyChooseUsContent.map((item, index) => <div key={`box-${index}`} className={`p-4 rounded-xl shadow-md flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 ${item.color} hover:shadow-lg`}>
              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm mb-3">
                <item.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-sm md:text-base font-bold text-white mb-1 drop-shadow-md">
                {item.title}
              </h3>
            </div>)}
        </div>

        <div className="slick-container max-w-5xl mx-auto">
          <Slider {...settings}>
            {whyChooseUsContent.map((item, index) => <div key={index} className="px-4 py-6 focus:outline-none">
                <div className={`rounded-2xl overflow-hidden shadow-xl transition-all duration-700 transform ${item.color}`}>
                  <div className="relative w-full min-h-[300px] md:min-h-[400px] flex items-center justify-center text-white p-8 md:p-10 overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
                      <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
                    </div>
                    
                    <div className="text-center transform transition-all duration-700 z-10 animate-fadeIn">
                      <div className="mb-8 p-6 rounded-full bg-white/20 inline-block backdrop-blur-sm animate-pulse shadow-inner">
                        <item.icon className="w-16 h-16 md:w-20 md:h-20" />
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-md">
                        {item.title}
                      </h3>
                      <p className="text-lg md:text-xl max-w-md mx-auto font-medium text-white/90 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>)}
          </Slider>
        </div>

        {/* Mobile cards view (as fallback if slider doesn't work) */}
        {isMobile && <style>
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
          </style>}

        {/* Custom styles for slider */}
        <style>
          {`
            .slick-dots {
              bottom: -40px;
            }
            .slick-dots li {
              margin: 0 5px;
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
              color: #f97316;
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
          `}
        </style>
      </div>
    </section>;
};
export default SlickWhyChooseUs;