"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Map,
  BookOpen,
  Plane,
  Menu,
  X,
  FileText,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Destinations",
    href: "/admin/destinations",
    icon: Map,
  },
  {
    name: "Bookings",
    href: "/admin/bookings",
    icon: BookOpen,
  },

  {
    name: "Blogs",
    href: "/admin/blogs",
    icon: FileText,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="md:hidden flex items-start justify-between px-4 py-3 bg-emerald-700 text-white shadow">
        <div className="flex items-center gap-2">
          <Plane className="text-yellow-300" />
          <span className="font-bold">Travel Admin</span>
        </div>

        <button onClick={() => setOpen(true)}>
          <Menu />
        </button>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed md:static top-0 left-0 z-50
          h-screen w-64
          bg-gradient-to-b from-emerald-700 to-emerald-900
          text-white shadow-xl
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="flex items-center justify-between gap-3 px-6 py-6 border-b border-emerald-600">
          <div className="flex items-center gap-3">
            <Plane className="w-8 h-8 text-yellow-300" />
            <span className="text-xl font-bold">Travel Admin</span>
          </div>

          <button className="md:hidden" onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        <nav className="mt-6 space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                <div
                  className={`
                    flex items-center gap-4 px-4 py-3 rounded-lg
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-white text-emerald-800 font-semibold shadow"
                        : "text-emerald-100 hover:bg-emerald-600 hover:text-white"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-emerald-200">
          © {new Date().getFullYear()} Travel App
        </div>
      </aside>
    </>
  );
}
