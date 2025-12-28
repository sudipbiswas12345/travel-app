import Hero from "@/app/components/landing/Hero"
import SearchBar from "@/app/components/landing/SearchBar"
import Destinations from "@/app/components/landing/Destinations"
import WhyChooseUs from "@/app/components/landing/WhyChooseUs"
import Packages from "@/app/components/landing/Packages"
import Partners from "./components/landing/Partners"
import Testimonials from "@/app/components/landing/Testimonials"
import CTA from "@/app/components/landing/CTA"

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* <SearchBar /> */}
      <Destinations />
      <Packages />
      <WhyChooseUs />
      < Partners/>
      <Testimonials />
      <CTA />
      
    </>
  )
}
