"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDestinationById } from "@/app/lib/user.destination.api";
import { createBooking } from "@/app/lib/booking.api";

export default function BookingPage() {
  const { id } = useParams();
  const router = useRouter();
  const qc = useQueryClient();

  const { data: dest } = useQuery({
    queryKey: ["destination", id],
    queryFn: () => getDestinationById(id as string),
  });

  const bookingMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["myBookings"] })

      router.push("/user/dashboard/bookings");
    },
    onError: (err) => {
      console.error("Booking failed:", err);
    },
  });

  if (!dest) return <p>Loading destination...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-xl font-bold text-gray-700">{dest.name}</h1>
      <p className="text-gray-500">{dest.country}</p>

      <button
        onClick={() =>
          bookingMutation.mutate({
            destinationId: dest.$id,
            destinationName: dest.name,
            destinationImage: dest.image,
            totalPrice: Number(dest.price),
            startDate: "2025-01-10",
            endDate: "2025-01-15",
          })
        }
        className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        {bookingMutation.isLoading ? "Booking..." : "Confirm Booking"}
      </button>
    </div>
  );
}

