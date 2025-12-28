"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPublicDestinations } from "@/app/lib/user.destination.api";
import UserDestinationCard from "@/app/components/UserDestinationCard";
import { useRouter } from "next/navigation";
import { Search, Filter } from "lucide-react";

const ITEMS_PER_PAGE = 6;

export default function DestinationsPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCountry, setFilterCountry] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["destinations"],
    queryFn: getPublicDestinations,
  });

  const destinations = data?.rows || [];

 
  const filteredDestinations = destinations.filter((dest: any) => {
    const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     dest.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = !filterCountry || dest.country === filterCountry;
    return matchesSearch && matchesCountry;
  });

  const totalPages = Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE);
  const paginatedData = filteredDestinations.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

 
  const countries = Array.from(new Set(destinations.map((d: any) => d.country))).sort();

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-6">
      
  
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => router.push("/user/dashboard")}
          className="rounded-lg border px-4 py-2 text-sm font-medium bg-cyan-500 hover:bg-gray-400"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-xl font-bold text-gray-800">
          Explore Destinations
        </h1>
      </div>

 
      <div className="mb-8 flex flex-col lg:flex-row gap-4 max-w-4xl mx-auto">
       
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-full pl-11 pr-4 py-3 border border-gray-500 rounded-2xl focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300 transition-all duration-200 bg-white/80 backdrop-blur-sm text-gray-500"
          />
        </div>

        
        <div className="relative flex-1 lg:flex-none lg:w-64">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={filterCountry}
            onChange={(e) => {
              setFilterCountry(e.target.value);
              setPage(1);
            }}
            className="w-full pl-11 pr-4 py-3 border border-gray-400 rounded-2xl focus:ring-2 focus:ring-teal-200 focus:border-teal-300 transition-all duration-200 bg-white/80 backdrop-blur-sm appearance-none cursor-pointer text-gray-500"
          >
            <option value="">All Countries</option>
            {countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
      </div>

      {/* GRID */}
      {paginatedData.length === 0 ? (
        <p className="text-center text-gray-500">
          No destinations found matching your search
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedData.map((dest: any) => (
            <UserDestinationCard key={dest.$id} dest={dest} />
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`h-10 w-10 rounded-lg border text-sm font-medium ${
                page === i + 1
                  ? "bg-green-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
              disabled={page === i + 1}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
