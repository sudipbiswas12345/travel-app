"use client";

import { Container } from "@mui/material";
// ✅ ADD import
import { cn } from "@/app/lib/cn";

import { FaStar, FaShieldAlt, FaHeadset } from "react-icons/fa";

const features = [
  {
    icon: <FaStar />,
    title: "Curated Trips",
    desc: "Expert-crafted travel experiences designed for comfort, value and unforgettable memories.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Booking",
    desc: "Your data and payments are protected with enterprise-grade security standards.",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Support",
    desc: "Our travel experts are available anytime to assist you before, during and after your trip.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-28 bg-slate-50">
      <Container maxWidth="lg">
        {/* Heading */}
        <div data-aos="fade-up" className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            Why Choose Us
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We combine expertise, technology and passion to deliver exceptional
            travel experiences worldwide.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <div
              key={f.title}
              data-aos="fade-up"
              data-aos-delay={i * 150}
              className={cn(
                "group relative bg-white/80 backdrop-blur rounded-2xl p-10 text-center",
                "border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-500"
              )}
            >
              {/* Icon */}
              <div
                className={cn(
                  "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full",
                  "bg-emerald-100 text-emerald-600 text-3xl",
                  "transition-all duration-500 group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-110"
                )}
              >
                {f.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {f.title}
              </h3>

              {/* Description */}
              <p className="text-slate-600 leading-relaxed text-sm">{f.desc}</p>

              {/* Decorative hover glow */}
              <div
                className={cn(
                  "absolute inset-0 rounded-2xl pointer-events-none",
                  "opacity-0 group-hover:opacity-100 transition duration-500",
                  "bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent"
                )}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
