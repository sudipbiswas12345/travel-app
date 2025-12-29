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
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-28 bg-slate-50">
      <Container maxWidth="lg">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-3">What Our Travelers Say</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Hear from our happy travelers who explored the world with us.
          </p>
        </div>

        <Slider {...settings}>
          {testimonials.map((t, i) => (
            <div key={i} className="px-4">
              <div
                className={cn(
                  "relative group rounded-2xl p-8 shadow-md bg-white/80 backdrop-blur transition-all duration-500",
                  "hover:shadow-2xl"
                )}
              >
                <div className="text-emerald-600 text-3xl mb-4">
                  <FaQuoteLeft />
                </div>
                <p className="text-slate-700 leading-relaxed mb-6">{t.text}</p>
                <span className="block text-sm font-semibold text-slate-900">- {t.author}</span>

                <div
                  className={cn(
                    "absolute inset-0 rounded-2xl pointer-events-none",
                    "opacity-0 group-hover:opacity-100 transition duration-500",
                    "bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent"
                  )}
                />
              </div>
            </div>
          ))}
        </Slider>
      </Container>
    </section>
  );
}
