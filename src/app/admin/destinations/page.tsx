"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getDestinations } from "@/app/lib/admin.destination.api";
import DestinationCard from "./destinationsComponents/DestinationCard";




export default function AdminDestinationsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["destinations"],
    queryFn: getDestinations,
  });

  

  if (isLoading) return <p>Loading destinations...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div>
     
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-500">Destinations</h1>

        <Link
          href="/admin/destinations/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Destination
        </Link>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.rows.map((dest: any) => (
          <DestinationCard key={dest.$id} dest={dest} />
        ))}
      </div>
    </div>
  );
}
