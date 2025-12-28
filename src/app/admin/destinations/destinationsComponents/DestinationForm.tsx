"use client";

import { useForm } from "react-hook-form";
export default function DestinationForm({
  defaultValues,
  onSubmit,
  loading,
}: any) {
  const { register, handleSubmit } = useForm({ defaultValues });

  return (
    <form
      suppressHydrationWarning
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl shadow-md p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto space-y-6"
      
    >
    
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Destination Details
        </h2>
        <p className="text-sm text-gray-500">
          Fill destination information carefully
        </p>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Destination Name
          </label>
          <div className="flex items-center border rounded-lg text-gray-500 px-3">
            <input
              {...register("name", { required: true })}
              placeholder=" "
              className="w-full px-2 py-2 outline-none text-gray-600"
            />
          </div>
        </div>

      
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Country
          </label>
          <div className="flex items-center border rounded-lg  text-gray-500 px-3">
        
            <input
              {...register("country", { required: true })}
              placeholder=" "
              className="w-full px-2 py-2 outline-none text-gray-600"
            />
          </div>
        </div>

     
        <div className="space-y-1 sm:col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Price (₹)
          </label>
          <div className="flex items-center border rounded-lg text-gray-500 px-3">
      
            <input
              type="number"
              {...register("price", { required: true, min: 1 })}
              placeholder=" "
              className="w-full px-2 py-2 outline-none text-gray-700"
            />
          </div>
        </div>
      </div>

     
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          {...register("description", { required: true })}
          placeholder=" "
          rows={4}
          className="w-full border rounded-lg px-3 py-2 outline-none text-gray-500 resize-none"
        />
      </div>

     
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          Destination Image
        </label>
        <input
          type="file"
          suppressHydrationWarning
          {...register("imageFile")}
          className="w-full text-sm file:bg-green-600 file:text-white
          file:px-4 file:py-2 file:rounded-lg file:border-0
          file:cursor-pointer file:hover:bg-green-700"
        />
      </div>

      
      <div className="flex justify-end">
        <button
        suppressHydrationWarning
        type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white
          px-6 py-2 rounded-lg font-medium transition
          disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Save Destination"}
        </button>
      </div>
    </form>
  );
}
