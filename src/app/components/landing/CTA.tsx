"use client";

import { Container, Button } from "@mui/material";
import { cn } from "@/app/lib/cn";

export default function CTA() {
  return (
    <section
      className={cn(
        "relative py-28",
        "bg-gradient-to-r from-emerald-600 to-cyan-500 text-white overflow-hidden"
      )}
    >
      {/* Decorative circles in background */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>

      <Container maxWidth="lg" className="relative text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Start Your Journey Today
        </h2>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          Discover amazing destinations, curated trips, and unforgettable experiences with us. Book your next adventure with confidence!
        </p>
        <Button
          variant="contained"
          color="inherit"
          className={cn(
            "bg-white text-emerald-600 font-semibold px-8 py-3 text-lg rounded-lg shadow-lg",
            "hover:bg-emerald-50 hover:scale-105 transition-all duration-300"
          )}
        >
          Get Started
        </Button>
      </Container>
    </section>
  );
}
