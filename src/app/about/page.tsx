"use client";

import { Container, Avatar, Button } from "@mui/material";
import { FaQuoteLeft, FaGlobeAsia, FaUsers, FaPlane } from "react-icons/fa";

export default function AboutPage() {
  return (
    <>
      <section className="relative h-[65vh]">
        <img
          src="/images/slider1.jpg"
          alt="About banner"
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 to-cyan-800/60" />

        <Container
          maxWidth="lg"
          className="relative z-10 h-full flex items-center justify-center"
        >
          <div className="mx-auto text-center text-white max-w-3xl">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              About Us
            </h1>
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed">
              Trusted journeys, carefully curated destinations, and travel
              expertise you can rely on.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-28 bg-white">
        <Container maxWidth="lg">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <img
              src="/images/holiday-resort.jpg"
              alt="Travel experience"
              className="rounded-2xl object-cover h-[420px] w-full"
            />

            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Who We Are
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We are a travel-focused platform passionate about helping people
                explore the world comfortably and confidently.
              </p>
              <p className="text-slate-600 leading-relaxed">
                From seamless bookings to curated destinations and
                round-the-clock support, we handle everything so you can focus
                on the journey.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-30">
            
            <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200">
              <h3 className="text-3xl font-semibold text-slate-900 mb-4">
                Why Travelers Trust Us
              </h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✔</span>
                  Transparent pricing & secure bookings
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✔</span>
                  Carefully vetted travel partners
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✔</span>
                  24/7 traveler support worldwide
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">✔</span>
                  Thousands of happy global travelers
                </li>
              </ul>
            </div>

           
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <img
                src="/images/destination-img2.jpg"
                alt="Mission Image 1"
                className="rounded-2xl object-cover w-full sm:w-1/2 h-[300px]"
              />
              <img
                src="/images/resort3.jpg"
                alt="Mission Image 2"
                className="rounded-2xl object-cover w-full sm:w-1/2 h-[300px]"
              />
            </div>
          </div>
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-900 mb-4">
              What Drives Us
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              We are guided by strong values that shape every experience we
              create.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 mb-20">
            
            <div className="rounded-2xl border border-slate-200 p-10 text-center hover:shadow-lg transition">
              <FaGlobeAsia className="text-emerald-600 text-4xl mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Global Reach
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Access destinations and experiences across continents with
                trusted local expertise.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-10 text-center hover:shadow-lg transition">
              <FaPlane className="text-emerald-600 text-4xl mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Seamless Travel
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                From discovery to destination, we make travel smooth and
                worry-free.
              </p>
            </div>

          
            <div className="rounded-2xl border border-slate-200 p-10 text-center hover:shadow-lg transition">
              <FaUsers className="text-emerald-600 text-4xl mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Community First
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Built by travelers, for travelers — your satisfaction drives us.
              </p>
            </div>
          </div>
          
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-900 mb-4">
              Resort Gallery
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Some images of our Resort
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <img
              src="/images/resort1.jpg"
              alt="Mission Image 1"
              className="rounded-2xl object-cover w-full sm:w-1/2 h-[300px]"
            />
            <img
              src="/images/resort2.jpg"
              alt="Mission Image 2"
              className="rounded-2xl object-cover w-full sm:w-1/2 h-[300px]"
            />
            <img
              src="/images/resort3.jpg"
              alt="Mission Image 1"
              className="rounded-2xl object-cover w-full sm:w-1/2 h-[300px]"
            />
            <img
              src="/images/resort4.jpg"
              alt="Mission Image 2"
              className="rounded-2xl object-cover w-full sm:w-1/2 h-[300px]"
            />
          </div>
        </Container>
      </section>

    
      <section className="py-32 bg-gradient-to-r from-emerald-600 to-teal-600">
        <Container maxWidth="lg">
          <div className="max-w-4xl mx-auto text-center text-white">
            <FaQuoteLeft className="text-5xl opacity-20 mx-auto mb-6" />

            <p className="text-2xl leading-relaxed font-medium mb-8">
              “Our mission is not just travel planning — it’s creating memories
              that stay with you forever.”
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
              <Avatar
                src="/images/advisor.jpg"
                alt="Tour Advisor"
                sx={{ width: 72, height: 72 }}
              />
              <div className="text-center md:text-left">
                <h4 className="font-semibold text-lg">Alex Morgan</h4>
                <p className="text-slate-200 text-sm">Senior Tour Advisor</p>
              </div>
            </div>

            <Button
              variant="contained"
              color="inherit"
              size="large"
              className="font-semibold"
            >
              Talk to Our Advisor
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
