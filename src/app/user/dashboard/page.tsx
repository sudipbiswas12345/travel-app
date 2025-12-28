"use client";

import { CalendarCheck, User, Map } from "lucide-react";
import { useCurrentUser } from "@/app/lib/useAuth";
import Link from "next/link";

export default function UserDashboardPage() {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (!user) return <p className="p-6 text-red-500">Unauthorized</p>;

  return (
    <div className="space-y-6">
     
      <div>
        <h1 className="text-2xl  text-gray-700 font-bold">
          Welcome, {user.name} 
        </h1>
        <p className="text-gray-500 text-sm">
          Manage your bookings & profi2le
        </p>
      </div>

    
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-amber-500">
        <DashboardCard
          title="My Bookings"
          href="/user/dashboard/bookings"
          icon={<CalendarCheck />}
          color="bg-green-600"
        />
        <DashboardCard
          title="Browse Destinations"
          href="/destinations"
          icon={<Map />}
          color="bg-blue-600"
        />
        <DashboardCard
          title="Profile"
          href="/user/dashboard/profile"
          icon={<User />}
          color="bg-purple-600"
        />
      </div>
    </div>
  );
}

function DashboardCard({ title, href, icon, color }: any) {
  return (
    <Link href={href}>
      <div className="bg-amber-100  rounded-xl shadow hover:shadow-lg transition p-5 flex items-center gap-4 cursor-pointer">
        <div className={`${color} text-gray-300 p-3 rounded-lg`}>
          {icon}
        </div>
        <h2 className="font-semibold">{title}</h2>
      </div>
    </Link>
  );
}
