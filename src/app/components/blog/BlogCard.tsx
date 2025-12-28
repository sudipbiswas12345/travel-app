"use client";
import Link from "next/link";
import { getImageUrl } from "@/app/utils/getImageUrl";
import { deleteBlog } from "@/services/blogService"; 

type Blog = {
  $id: string;
  title: string;
  image: string;
  author: string;
  date: string;
  excerpt?: string;
};

export default function BlogCard({ 
  blog, 
  showDelete = false,  
  onDelete             
}: { 
  blog: Blog; 
  showDelete?: boolean;
  onDelete?: () => void;
}) {
  const handleDelete = async () => {
    if (!confirm(`Delete "${blog.title}" permanently?`)) return;
    
    try {
      await deleteBlog(blog.$id);  // 
      alert("Blog deleted successfully!");
      onDelete?.();  
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete blog");
    }
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative">
      
      
      {showDelete && (
        <div className="absolute top-4 right-4 z-20 opacity-0 translate-x-4 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-400 ease-out">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-full w-12 h-12 flex items-center justify-center shadow-2xl hover:shadow-red-500/25 backdrop-blur-sm border-2 border-white/20 hover:scale-110 active:scale-95 transition-all duration-200"
            title={`Delete ${blog.title}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )}

  
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <img
          src={getImageUrl(blog.image)}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = "/placeholder-image.jpg";
          }}
        />
      </div>

    
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <span className="w-2 h-2 bg-emerald-500 rounded-full" />
          {blog.author} • {new Date(blog.date).toDateString()}
        </div>

        <h3 className="text-xl text-gray-700 mb-3 leading-tight line-clamp-2 group-hover:text-emerald-700 transition-colors">
          {blog.title}
        </h3>

        {blog.excerpt && (
          <p className="text-gray-600 text-sm mb-6 line-clamp-2">{blog.excerpt}</p>
        )}

     
        <Link
          href={`/blogs/${blog.$id}`}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover:from-emerald-700 hover:to-teal-700"
        >
          View Details
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
