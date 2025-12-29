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

  if (isLoading) return <p>Loading...</p>;
  if (!data?.rows?.length) return <p className="text-gray-400">No bookings found</p>;

  return (
    <div className="space-y-4">
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
            className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-white rounded-xl shadow hover:shadow-lg transition p-4"
          >
         
            <div className="w-full md:w-40 h-32 overflow-hidden rounded-lg shrink-0">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={b.destinationName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm">
                  No Image
                </div>
              )}
            </div>

           
            <div className="flex-1 space-y-1">
              <h3 className="font-semibold text-lg text-blue-900">{b.destinationName}</h3>
              <p className="text-sm text-gray-500">
                {b.startDate} → {b.endDate}
              </p>
              <p className="text-sm text-gray-700">
                Status: <BookingStatusBadge status={b.status} />
              </p>
            </div>

           
            <div className="font-bold text-green-600 whitespace-nowrap">
              ₹ {b.totalPrice}
            </div>

            <button
              onClick={() => {
                if (confirm("Are you sure you want to delete this booking?")) {
                  deleteMutation.mutate(b.$id);
                }
              }}
              disabled={deleteMutation.isPending}
              className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg ${
                deleteMutation.isPending
                  ? "text-gray-400"
                  : "text-red-600 hover:bg-red-50"
              }`}
            >
              <Trash2 size={16} />
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        );
      })}
    </div>
  );
}



