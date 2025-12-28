"use client";

import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDestination } from "@/app/lib/admin.destination.api";
import { MapPin, Pencil, Trash2 } from "lucide-react";
import { BUCKET_ID } from "@/appwrite.config";

export default function DestinationCard({ dest }: any) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deleteDestination(dest.$id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["destinations"] });
    },
  });

  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

  
const imageUrl =
  dest.image && typeof dest.image === "string" && dest.image.trim()
    ? `${endpoint}/storage/buckets/${BUCKET_ID}/files/${dest.image}/view?project=${projectId}`
    : null;

    

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition flex flex-col">
    
      <div className="relative h-48 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={dest.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        ) : (
          <div className="h-full bg-gray-200 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}

        <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
          ₹ {dest.price}
        </div>
      </div>

      
      <div className="p-4 space-y-2 flex-1">
        <h2 className="font-semibold text-lg text-blue-800">{dest.name}</h2>

        <div className="flex items-center gap-1 text-sm  text-green-500">
          <MapPin size={14} color="red" />
          {dest.country}
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">
          {dest.description}
        </p>
      </div>

    
      <div className="flex justify-between px-4 py-3 border-t text-sm">
        <Link
          href={`/admin/destinations/edit/${dest.$id}`}
          className="flex items-center gap-1 text-blue-600"
        >
          <Pencil size={16} /> Edit
        </Link>

        <button
          onClick={() => confirm("Delete?") && deleteMutation.mutate()}
          className="flex items-center gap-1 text-red-600"
        >
          <Trash2 size={16} /> Delete
        </button>
      </div>
    </div>
  );
}
