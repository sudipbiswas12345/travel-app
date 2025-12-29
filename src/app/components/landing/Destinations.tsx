"use client";

import { Container } from "@mui/material";
import { cn } from "@/app/lib/cn";

import { FaArrowRight } from "react-icons/fa";

const destinations = [
  { city: "Paris", image: "/images/paris1.jpg" },
  { city: "Bali", image: "/images/bali.webp" },
  { city: "Dubai", image: "/images/dubai.webp" },
  { city: "Rome", image: "/images/rome1.jpg" },
  { city: "India", image: "/images/india.jpg" },
  { city: "Thailand", image: "/images/thailand.jpg" },
  { city: "Egypt", image: "/images/egypt4.jpg" },
  { city: "London", image: "/images/london.jpg" },
];

export default function Destinations() {
  return (
    <section className="py-28 bg-emerald-50">
      <Container maxWidth="lg">
        {/* Section heading */}
        <div data-aos="fade-up" className="mb-16 text-center">
          <h2 className="text-4xl font-bold mb-3 text-slate-900">
            Top Destinations
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Hand-picked destinations loved by thousands of travelers worldwide.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {destinations.map((item, index) => (
            <div
              key={item.city}
              data-aos="fade-up"
              data-aos-delay={index * 120}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-500 cursor-pointer"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.city}
                className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Hover overlay (hidden by default) */}
              <div
                className={cn(
                  "absolute inset-0",
                  "bg-gradient-to-t from-black/60 via-black/20 to-transparent",
                  "opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                )}
              />

              {/* Content */}
              <div className="absolute bottom-0 p-6 text-white w-full">
                <h3 className="text-xl font-semibold mb-1">{item.city}</h3>

                <span className="block h-0.5 w-10 bg-white mb-3 transition-all duration-500 group-hover:w-20" />

                <div className="flex items-center gap-2 text-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  Explore
                  <FaArrowRight />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// "use client";

// import { Container } from "@mui/material";
// import { FaArrowRight } from "react-icons/fa";
// import { cn } from "@/app/lib/cn";
// import { useDestinations } from "../../../hooks/useDestinations";
// import DestinationSkeleton from "./../DestinationSkeleton";
// import Image from "next/image";

// export default function Destinations() {
//   const { data, isLoading, isError } = useDestinations();

//   if (isError) return null;

//   return (
//     <section className="py-28 bg-emerald-50">
//       <Container maxWidth="lg">
//         {/* Heading */}
//         <div className="mb-16 text-center">
//           <h2 className="text-4xl font-bold mb-3 text-slate-900">
//             Top Destinations
//           </h2>
//           <p className="text-slate-600 max-w-2xl mx-auto">
//             Hand-picked destinations loved by thousands of travelers worldwide.
//           </p>
//         </div>

//         {/* Cards */}
//         <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
//           {isLoading &&
//             Array.from({ length: 8 }).map((_, i) => (
//               <DestinationSkeleton key={i} />
//             ))}

//           {data?.map((item, index) => (
//             <div
//               key={item.id}
//               className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-500 cursor-pointer"
//             >
//               <Image
//                 src={item.image}
//                 alt={item.city}
//                 width={400}
//                 height={256}
//                 className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
//               />

//               <div
//                 className={cn(
//                   "absolute inset-0",
//                   "bg-gradient-to-t from-black/60 via-black/20 to-transparent",
//                   "opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//                 )}
//               />

//               <div className="absolute bottom-0 p-6 text-white w-full">
//                 <h3 className="text-xl font-semibold mb-1">{item.city}</h3>

//                 <span className="block h-0.5 w-10 bg-white mb-3 transition-all duration-500 group-hover:w-20" />

//                 <div className="flex items-center gap-2 text-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
//                   Explore <FaArrowRight />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// }
