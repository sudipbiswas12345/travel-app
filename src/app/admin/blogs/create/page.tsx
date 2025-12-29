"use client";

import { useState } from "react";
import { uploadImage } from "@/services/uploadService";
import { createBlog } from "@/services/blogService";

export default function CreateBlogPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

  const form = e.currentTarget;

const title = (form.elements.namedItem('title') as HTMLInputElement)?.value?.trim() ?? '';
const author = (form.elements.namedItem('author') as HTMLInputElement)?.value?.trim() ?? '';
const date = (form.elements.namedItem('date') as HTMLInputElement)?.value ?? '';
const content = (form.elements.namedItem('content') as HTMLTextAreaElement)?.value?.trim() ?? '';
const imageFile = (form.elements.namedItem('image') as HTMLInputElement)?.files?.[0] ?? null;


   
    if (!title || !author || !date || !content || !imageFile) {
      alert("All fields are required");
      setLoading(false);
      return;
    }

    try {
    
      const imageId = await uploadImage(imageFile);

   
      await createBlog({
        title,
        author, 
        date: new Date(date).toISOString(), 
        content,
        image: imageId,
      });

      alert("Blog created successfully");
      form.reset();
    } catch (error) {
      console.error(error);
      alert("Something went wrong while creating the blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl text-gray-600 font-bold mb-6">
        Create Blog
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Blog Title"
          className="w-full border p-3 text-gray-600"
          required
        />

        <input
          name="author"
          placeholder="Author Name"
          className="w-full border p-3 text-gray-600"
          required
        />

        <input
          type="date"
          name="date"
          className="w-full border p-3 text-gray-600"
          required
        />
        
        <textarea
          name="content"
          placeholder="Blog Content"
          className="w-full border p-3 h-40 text-gray-600"
          required
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          className="border p-2 text-gray-600"
          required
        />

        <button
          disabled={loading}
          className="bg-black text-white px-6 py-2 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
}
