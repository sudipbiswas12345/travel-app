"use client";

import { Container } from "@mui/material";
import { FaArrowRight } from "react-icons/fa";
import { cn } from "@/app/lib/cn";

const packages = [
  {
    title: "Beach Escape",
    price: 799,
    image: "/images/beach.jpg",
    desc: "Relax on pristine beaches with crystal-clear waters and luxury resorts.",
  },
  {
    title: "Adventure Trail",
    price: 999,
    image: "/images/adventure.jpg",
    desc: "Thrilling adventures through mountains, forests and wild terrains.",
  },
  {
    title: "City Explorer",
    price: 699,
    image: "/images/city.jpg",
    desc: "Discover iconic cities, culture, food and vibrant nightlife.",
  },
];

export default function Packages() {
  return (
    <section className="py-28 bg-white">
      <Container maxWidth="lg">
        {/* Heading */}
        <div data-aos="fade-up" className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            Popular Packages
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Choose from our best-selling travel packages, curated for comfort,
            adventure and unforgettable experiences.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {packages.map((item, index) => (
            <div
              key={item.title}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              className={cn(
                "group relative rounded-2xl overflow-hidden bg-white",
                "border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-500"
              )}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className={cn(
                    "h-full w-full object-cover",
                    "transition-transform duration-700 group-hover:scale-110"
                  )}
                />

                {/* Price Badge */}
                <div className="absolute top-4 left-4 bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow">
                  From ${item.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {item.desc}
                </p>

                <button
                  className={cn(
                    "inline-flex items-center gap-2 font-medium",
                    "text-emerald-600 hover:text-emerald-700 transition"
                  )}
                >
                  View Details <FaArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
