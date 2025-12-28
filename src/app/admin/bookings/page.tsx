"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBookings,
  updateBookingStatus,
  deleteBooking,
} from "@/app/lib/admin.booking.api";

import BookingStatusBadge from "@/app/components/BookingStatusBadge";
import { toast } from "sonner";

export default function AdminBookingsPage() {
  const qc = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
    staleTime: 0,
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: any) => updateBookingStatus(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking status updated");
    },
    onError: () => toast.error("Failed to update status"),
  });

  const delBooking = useMutation({
    mutationFn: (id: string) => deleteBooking(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking deleted");
    },
    onError: () => toast.error("Failed to delete booking"),
  });

  if (isLoading) return <p className="text-center py-10 text-gray-500">Loading bookings...</p>;
  if (error) return <p className="text-center py-10 text-red-500">Failed to load bookings</p>;
  if (!data?.rows?.length) return <p className="text-center text-gray-400 py-10">No bookings found</p>;

  const approvedCount = data.rows.filter((b: any) => b.status === "Approved").length;
  const totalRevenue = data.rows
    .filter((b: any) => b.status === "Approved")
    .reduce((sum: number, b: any) => sum + b.totalPrice, 0);

  return (
    <div className="space-y-8">
     
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-600">Bookings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and review all user bookings</p>
        </div>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Bookings" value={data.rows.length} color="from-indigo-500 to-indigo-600" />
        <StatCard title="Approved" value={approvedCount} color="from-emerald-500 to-emerald-600" />
        <StatCard title="Revenue" value={`₹ ${totalRevenue}`} color="from-amber-500 to-amber-600" />
      </div>

    -
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
            <tr>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Destination</th>
              <th className="p-4 text-left">Dates</th>
              <th className="p-4 text-left">Total</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((b: any) => (
              <tr key={b.$id} className="border-t hover:bg-gray-50 transition">
                <td className="p-4 font-medium text-gray-500">{b.userId}</td>
                <td className="p-4 text-gray-500">{b.destinationName}</td>
                <td className="p-4 text-gray-600">{b.startDate} → {b.endDate}</td>
                <td className="p-4 font-semibold text-emerald-600">₹ {b.totalPrice}</td>
                <td className="p-4"><BookingStatusBadge status={b.status} /></td>
                <td className="p-4 text-right space-x-2">
                  <button
                    disabled={b.status === "Approved"}
                    onClick={() => updateStatus.mutate({ id: b.$id, status: "Approved" })}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-100 text-emerald-700 hover:bg-emerald-200 disabled:opacity-40"
                  >
                    Approve
                  </button>
                  <button
                    disabled={b.status === "Rejected"}
                    onClick={() => updateStatus.mutate({ id: b.$id, status: "Rejected" })}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-40"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => { if(confirm("Delete this booking?")) delBooking.mutate(b.$id); }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


function StatCard({ title, value, color }: { title: string; value: any; color: string }) {
  return (
    <div className={`rounded-2xl p-5 text-white shadow-lg bg-gradient-to-br ${color}`}>
      <p className="text-sm opacity-90">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}

