"use client";
import Link from "next/link";
import { MapPin, Heart } from "lucide-react";
import { BUCKET_ID } from "@/appwrite.config";

export default function UserDestinationCard({ dest }: any) {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

  const imageUrl =
    dest.image && typeof dest.image === "string" && dest.image.trim()
      ? `${endpoint}/storage/buckets/${BUCKET_ID}/files/${dest.image}/view?project=${projectId}`
      : null;

  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden border border-white/50 hover:border-emerald-200">
      <div className="relative h-60 w-full overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50">
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt={dest.name}
              className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="w-20 h-20 bg-white/50 rounded-2xl flex items-center justify-center shadow-lg">
              <MapPin size={24} className="text-gray-400" />
            </div>
            <p className="mt-3 text-sm font-medium text-gray-500">No Image</p>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1 space-y-3">
        <div className="space-y-1">
          <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent leading-tight">
            {dest.name}
          </h2>
          <div className="flex items-center gap-2 text-sm text-emerald-700 font-medium">
            <MapPin size={16} />
            <span>{dest.country}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
          {dest.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="space-y-1">
            <span className="text-2xl font-black text-emerald-600 tracking-tight mr-1">
              ₹ {dest.price}/
            </span>
            <span className="text-sm text-gray-500 font-medium uppercase tracking-wider">
              per person
            </span>
          </div>

          <Link
            href={`/book/${dest.$id}`}
            className="group/cta bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-2xl font-semibold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
          >
            Book Now
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
