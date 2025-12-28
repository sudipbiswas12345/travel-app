"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { getBlogById } from "@/services/blogService";
import { getImageUrl } from "@/app/utils/getImageUrl";

export default function BlogDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    if (id) getBlogById(id as string).then(setBlog);
  }, [id]);

  if (!blog)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">Loading...</p>
      </div>
    );

  return (
    <article className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 mb-12 px-6 py-3 bg-sky-400 border border-gray-200 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-gray-700 font-medium hover:text-emerald-600"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Blogs
        </button>

        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-0 lg:h-120 lg:overflow-hidden">
          <div className="lg:flex-1 lg:min-w-0 lg:h-screen lg:sticky lg:top-0 rounded-3xl overflow-hidden shadow-2xl group lg:mr-0">
            <img
              src={getImageUrl(blog.image)}
              alt={blog.title}
              className="w-full h-[500px] lg:h-full object-cover group-hover:scale-105 transition-transform duration-700"
              onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
            />
          </div>

          <div className="hidden lg:block w-[1px] lg:w-1 lg:flex-shrink-0 lg:h-screen bg-gradient-to-b from-emerald-400 via-teal-500 to-emerald-600 shadow-2xl mx-8 lg:mx-12  transition-all duration-700 z-10" />

          <div className="lg:flex-1 lg:min-w-0 lg:overflow-y-auto lg:pl-12 lg:pr-8 lg:max-h-screen lg:scrollbar-thin lg:scrollbar-thumb-gray-300 lg:scrollbar-track-gray-100 space-y-8 py-8 lg:py-0">
            <div>
              <h1 className="text-4xl lg:text-5xl font-black text-gray-800 mb-6 leading-tight">
                {blog.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-gray-500 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-2xl border border-gray-200 max-w-max">
                <span>By {blog.author}</span>
                <div className="w-px h-4 bg-gray-300" />
                <span>
                  {new Date(blog.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            <div className="text-gray-500 text-l">
              <div>{blog.content}</div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
