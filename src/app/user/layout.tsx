"use client";

import Link from "next/link";
import { CalendarCheck, User, Map, LogOut, LayoutDashboard } from "lucide-react";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { label: "Dashboard", href: "/user/dashboard", icon: <LayoutDashboard size={18} /> },
    { label: "My Bookings", href: "/user/dashboard/bookings", icon: <CalendarCheck size={18} /> },
    { label: "Browse Destinations", href: "/destinations", icon: <Map size={18} /> },
    { label: "Profile", href: "/user/dashboard/profile", icon: <User size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-600 text-gray-200 flex flex-col">
        <div className="px-6 py-5 border-b border-gray-800">
          <h2 className="text-xl font-bold">User Panel</h2>
          <p className="text-xs text-gray-400">Manage your account</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm hover:bg-gray-800 hover:text-white transition"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-gray-800">
          <button className="w-full flex items-center gap-3 px-4 py-2 text-sm rounded-lg text-blue-500 hover:bg-blue-900 hover:text-white transition">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}
