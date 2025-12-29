"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyBookings, deleteBooking } from "@/app/lib/booking.api";
import { Trash2 } from "lucide-react";
import { BUCKET_ID } from "@/appwrite.config"; 
import { toast } from "sonner";
import BookingStatusBadge from "@/app/components/BookingStatusBadge";

export default function MyBookingsPage() {
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["myBookings"],
    queryFn: getMyBookings,
    staleTime: 0,
    refetchInterval: 5000,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myBookings"] });
      toast.success("Booking deleted successfully");
    },
    onError: () => toast.error("Failed to delete booking"),
  });

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-lg text-gray-500">Loading your bookings...</div>
      </div>
    );
  }

  if (!data?.rows?.length) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-center py-12 px-4">
        <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No bookings yet</h3>
        <p className="text-sm sm:text-base text-gray-500 max-w-md">Your travel adventures will appear here once you make a booking.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Bookings</h1>
        <p className="text-sm sm:text-base text-gray-500">{data.rows.length} {data.rows.length === 1 ? 'booking' : 'bookings'}</p>
      </div>

      <div className="space-y-3 sm:space-y-4 lg:space-y-5">
        {data.rows.map((b: any) => {
          const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
          const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
          const imageUrl =
            b.destinationImage && typeof b.destinationImage === "string" && b.destinationImage.trim()
              ? `${endpoint}/storage/buckets/${BUCKET_ID}/files/${b.destinationImage}/view?project=${projectId}`
              : null;

          return (
            <div
              key={b.$id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-4 sm:p-6 border border-gray-100 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-start lg:items-center">
                {/* Image - Full width on mobile */}
                <div className="w-full lg:w-auto lg:col-span-1 h-32 sm:h-40 lg:h-28 overflow-hidden rounded-xl shrink-0">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={b.destinationName}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-xl">
                      <span className="text-xs sm:text-sm text-gray-500 font-medium">No Image</span>
                    </div>
                  )}
                </div>

                {/* Content - Flexible on mobile */}
                <div className="lg:col-span-2 space-y-2 sm:space-y-3 flex flex-col justify-between min-h-[120px] sm:min-h-[140px]">
                  <div>
                    <h3 className="font-bold text-lg sm:text-xl lg:text-2xl text-gray-900 leading-tight line-clamp-2">
                      {b.destinationName}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      <span className="font-medium">{b.startDate}</span> → <span className="font-medium">{b.endDate}</span>
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-medium text-gray-600">Status:</span>
                      <BookingStatusBadge status={b.status} />
                    </div>
                  </div>
                </div>

                {/* Price & Actions - Stacked on mobile */}
                <div className="flex flex-col sm:flex-row lg:flex-col justify-between items-end lg:items-center gap-2 sm:gap-3 lg:gap-4 pt-2 sm:pt-0">
                  <div className="font-bold text-lg sm:text-xl lg:text-2xl text-green-600 text-right lg:text-left whitespace-nowrap">
                    ₹{b.totalPrice.toLocaleString()}
                  </div>
                  
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this booking?")) {
                        deleteMutation.mutate(b.$id);
                      }
                    }}
                    disabled={deleteMutation.isLoading}
                    className={`flex items-center justify-center gap-2 text-sm sm:text-base px-4 py-2 sm:py-2.5 rounded-xl font-medium transition-all duration-200 ${
                      deleteMutation.isLoading
                        ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                        : "text-red-600 hover:bg-red-50 hover:text-red-700 shadow-sm hover:shadow-md active:scale-95 bg-white border border-red-200"
                    }`}
                  >
                    <Trash2 size={16} className="sm:w-4 sm:h-4" />
                    {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
