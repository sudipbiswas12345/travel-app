"use client";
declare module 'swiper' {};
import { Container, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import { useRouter } from "next/navigation";

import "swiper/css";
import "swiper/css/pagination";

export default function Hero() {
  const banners = [
    { src: "/images/slider1.jpg" },
    { src: "/images/slider2.jpg" },
    { src: "/images/slider3.jpg" },
  ];

  const router = useRouter();

  const handleExploreNow = () => {
  router.push("/auth/login");  // ✅ Redirects to login
};

  return (
    <section className="relative h-[80vh] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="h-full"
      >
        {banners.map((banner, idx) => (
          <SwiperSlide key={idx} className="h-full relative">
            <img
              src={banner.src}
              alt={`Banner ${idx + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/10" />
          </SwiperSlide>
        ))}
      </Swiper>

      <Container
        maxWidth="lg"
        className="absolute inset-0 z-10 flex items-center h-full"
      >
        <div className="max-w-2xl text-white text-center mx-auto">
          <h1 className="text-5xl font-bold leading-tight">
            Discover the World with Confidence
          </h1>
          <p className="mt-4 text-lg text-slate-200">
            Trusted travel experiences, curated destinations & seamless
            bookings.
          </p>

          <div className="mt-8 flex gap-4 justify-center">
            <Button variant="outlined" color="inherit"
            onClick={handleExploreNow}>
              Explore Now
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
