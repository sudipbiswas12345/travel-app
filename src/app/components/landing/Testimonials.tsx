"use client";

import { Container } from "@mui/material";
import { FaQuoteLeft } from "react-icons/fa";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Slider from "react-slick";
import { cn } from "@/app/lib/cn";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  { text: "Best travel experience ever! Booking was smooth and easy.", author: "Sarah M." },
  { text: "Amazing destinations and excellent customer support. Highly recommend!", author: "John D." },
  { text: "The curated trips made our vacation unforgettable. Perfect planning!", author: "Emma W." },
  { text: "Loved every moment! Exceptional service and attention to detail.", author: "Michael B." },
];

export default function TestimonialsCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,  
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,    
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1536,  
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1280, 
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1024,  
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,   
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,    
        }
      },
      {
        breakpoint: 640,   
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,   
        }
      }
    ],
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-br from-slate-50 to-blue-50">
      <Container maxWidth="lg">
        <div className="mb-12 lg:mb-16 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 via-gray-800 to-slate-700 bg-clip-text text-transparent mb-4 px-2 sm:px-4">
            What Our Travelers Say
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-4">
            Hear from our happy travelers who explored the world with us.
          </p>
        </div>

        <div className="px-2 sm:px-4 md:px-6 lg:px-0">
          <Slider {...settings}>
            {testimonials.map((t, i) => (
              <div key={i} className="px-2 sm:px-3 md:px-4">
                <div
                  className={cn(
                    "relative group w-full h-full rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg bg-white/90 backdrop-blur-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-white/50",
                    "min-h-[200px] sm:min-h-[220px] md:min-h-[240px]"
                  )}
                >
                  <div className="text-emerald-500 text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6">
                    <FaQuoteLeft />
                  </div>
                  <p className="text-slate-700 leading-relaxed mb-6 text-sm sm:text-base md:text-lg line-clamp-4">
                    {t.text}
                  </p>
                  <span className="block text-xs sm:text-sm md:text-base font-semibold text-slate-900 tracking-wide">
                    - {t.author}
                  </span>

                  <div
                    className={cn(
                      "absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-700",
                      "bg-gradient-to-br from-emerald-500/20 via-transparent to-blue-500/20 shadow-xl"
                    )}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Container>
    </section>
  );
}
