"use client";
import { useState, useEffect } from "react";
import BlogCard from "@/app/components/blog/BlogCard"; 
import { getBlogs, deleteBlog } from "@/services/blogService";
import Link from "next/link";

type Blog = {
  $id: string;
  title: string;
  image: string;
  author: string;
  date: string;
  excerpt?: string;
  content: string;
};

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const allBlogs = await getBlogs();
      setBlogs(allBlogs);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
       
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Manage your blog
          </h1>
        </div>
        <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-500">Destinations</h1>

        <Link
          href="/admin/blogs/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Blog
        </Link>
      </div>

        
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading blogs...</p>
          </div>
        ) : (
         
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.$id}
                blog={blog}
                showDelete={true}       
                onDelete={fetchBlogs}    
              />
            ))}
          </div>
        )}

       
        {!loading && blogs.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No blogs yet</h3>
            <p className="text-lg text-gray-600 mb-8">Create your first blog post to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
