// 'use client';
// import { useState, useCallback } from "react";
// import { Search, Filter, MapPin, Clock, Calendar } from "lucide-react";

// const samplePosts = [
//   {
//     id: 1,
//     title: "10 Hidden Beaches of Andaman You Must Visit",
//     excerpt: "Discover pristine sands and turquoise waters away from tourist crowds.",
//     image: "/images/beach.jpg",
//     category: "Beach",
//     readTime: "5 min",
//     date: "Dec 15, 2025",
//     author: "Priya Sharma"
//   },
//   {
//     id: 2,
//     title: "Ultimate Ladakh Road Trip Guide: Leh to Nubra Valley",
//     excerpt: "Conquer high passes and witness lunar landscapes on this epic adventure.",
//     image: "/images/blog/ladakh-roadtrip.jpg",
//     category: "Adventure",
//     readTime: "8 min",
//     date: "Dec 12, 2025",
//     author: "Rohan Singh"
//   },
//   // Add 7 more sample posts...
// ];

// export default function BlogPage() {
//   const [posts, setPosts] = useState(samplePosts);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [visiblePosts, setVisiblePosts] = useState(6);

//   const categories = ["All", "Beach", "Adventure", "Culture", "Luxury", "Budget"];

//   const filteredPosts = posts.filter(post => 
//     (selectedCategory === "All" || post.category === selectedCategory) &&
//     (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const loadMore = () => {
//     setVisiblePosts(prev => Math.min(prev + 3, filteredPosts.length));
//   };

//   return (
//     <>
//        {/* ================= HERO BANNER ================= */}
//       <section className="relative h-[65vh]">
//         <img
//           src="/images/slider1.jpg"
//           alt="Contact banner"
//           className="absolute inset-0 w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 to-cyan-800/60" />
//         <div className="absolute inset-0 z-10 flex items-center justify-center">
//           <div className="text-center text-white max-w-3xl mx-auto px-4">
//             <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
//               Our Blog
//             </h1>
//             <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto">
//               Authentic adventures, insider tips, and breathtaking destinations from our travel experts.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* ================= FILTERS & SEARCH ================= */}
//       <div className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-20 px-4 -mt-20 relative z-20">
//         <div className="max-w-6xl mx-auto">
//           <div className="flex flex-col lg:flex-row gap-6 justify-between items-center mb-16">
//             <div className="flex-1 max-w-md">
//               <div className="relative">
//                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search posts..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-12 pr-4 py-4 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 focus:ring-4 focus:ring-emerald-200/50 focus:border-emerald-300 transition-all duration-300 text-gray-700"
//                 />
//               </div>
//             </div>
            
//             <div className="flex items-center gap-2 text-sm">
//               <Filter className="w-5 h-5 text-gray-500" />
//               <span className="font-semibold text-gray-700">Filter:</span>
//             </div>
//           </div>

//           {/* CATEGORY FILTERS */}
//           <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-20">
//             {categories.map(cat => (
//               <button
//                 key={cat}
//                 onClick={() => setSelectedCategory(cat)}
//                 className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 border-2 ${
//                   selectedCategory === cat
//                     ? "bg-emerald-600 text-white border-emerald-600 shadow-lg hover:shadow-xl"
//                     : "bg-white/70 backdrop-blur-xl border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 text-gray-700"
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>

//           {/* ================= BLOG GRID ================= */}
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
//             {filteredPosts.slice(0, visiblePosts).map(post => (
//               <article key={post.id} className="group">
//                 <div className="bg-white/70 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-white/50">
//                   <div className="relative overflow-hidden h-64">
//                     <img
//                       src={post.image}
//                       alt={post.title}
//                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                     />
//                     <span className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold">
//                       {post.category}
//                     </span>
//                   </div>
                  
//                   <div className="p-8">
//                     <div className="flex items-center gap-2 text-emerald-600 text-sm font-semibold mb-2">
//                       <MapPin className="w-4 h-4" />
//                       India
//                     </div>
                    
//                     <h3 className="text-2xl font-black text-gray-900 group-hover:text-emerald-600 transition-colors mb-4 leading-tight h-20 overflow-hidden">
//                       {post.title}
//                     </h3>
                    
//                     <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
//                       {post.excerpt}
//                     </p>
                    
//                     <div className="flex items-center justify-between mb-6">
//                       <div className="flex items-center gap-4 text-sm text-gray-500">
//                         <div className="flex items-center gap-1">
//                           <Clock className="w-4 h-4" />
//                           <span>{post.readTime}</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Calendar className="w-4 h-4" />
//                           <span>{post.date}</span>
//                         </div>
//                       </div>
//                       <span className="text-sm font-semibold text-gray-900">
//                         {post.author}
//                       </span>
//                     </div>
                    
//                     <button className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group-hover:from-emerald-700 group-hover:to-blue-700">
//                       Read Story →
//                     </button>
//                   </div>
//                 </div>
//               </article>
//             ))}
//           </div>

//           {visiblePosts < filteredPosts.length && (
//             <div className="text-center">
//               <button
//                 onClick={loadMore}
//                 className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
//               >
//                 Load More Stories
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }



//============================================

"use client";
import { Container} from "@mui/material";
import { useEffect, useState } from "react";
import { getBlogs } from "@/services/blogService";
import BlogCard from "@/app/components/blog/BlogCard";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    getBlogs().then(setBlogs);
  }, []);

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
              Our Blogs
            </h1>
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed">
               Discover destinations, travel tips, and unforgettable experiences.
            </p>
          </div>
        </Container>
      </section>
    <section className=" mx-auto px-4 py-14 bg-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">
          Travel Stories & Guides
        </h1>
       
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard key={blog.$id} blog={blog} />
        ))}
      </div>
    </section>
    </>
  );
}
