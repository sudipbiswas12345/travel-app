"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  User,
  LogOut,
} from "lucide-react";

export default function UserSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/user/dashboard", icon: LayoutDashboard },
    { label: "My Bookings", href: "/user/bookings", icon: CalendarCheck },
    { label: "Profile", href: "/user/profile", icon: User },
  ];

  return (
    <aside className="w-64 shrink-0 bg-red-900 text-gray-200 flex flex-col">
      {/* LOGO */}
      <div className="px-6 py-5 border-b border-gray-800">
        <h2 className="text-xl font-bold text-white">User Panel</h2>
        <p className="text-xs text-gray-400">Manage your account</p>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition
                ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="px-4 py-4 border-t border-gray-800">
        <button suppressHydrationWarning className="w-full flex items-center gap-3 px-4 py-2 text-sm rounded-lg
          text-red-400 hover:bg-red-500 hover:text-white transition">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

