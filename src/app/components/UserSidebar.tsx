"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function UserSidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/user/dashboard", icon: LayoutDashboard },
    { label: "My Bookings", href: "/user/bookings", icon: CalendarCheck },
    { label: "Profile", href: "/user/profile", icon: User },
  ];

  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMobileMenu}
        className="fixed md:hidden z-50 top-4 left-4 p-3 bg-gray-900 text-gray-200 rounded-xl shadow-lg border border-gray-700 hover:bg-gray-800 transition-all duration-200"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-72 md:w-64 shrink-0
        bg-gray-900 text-gray-200 flex flex-col transform transition-all duration-300 ease-in-out
        ${isMobileOpen 
          ? 'translate-x-0 shadow-2xl md:shadow-none' 
          : '-translate-x-full md:translate-x-0'
        }
      `}>
        {/* LOGO */}
        <div className="px-4 md:px-6 py-5 border-b border-gray-800 flex-shrink-0">
          <h2 className="text-lg md:text-xl font-bold text-white">User Panel</h2>
          <p className="text-xs text-gray-400 mt-1">Manage your account</p>
        </div>

        {/* NAV */}
        <nav className="flex-1 px-3 md:px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${active
                    ? "bg-blue-600/90 text-white shadow-md hover:bg-blue-600"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white hover:shadow-md"
                  }
                `}
                onClick={() => setIsMobileOpen(false)}
              >
                <Icon 
                  size={18} 
                  className={`${active ? 'text-blue-300' : 'text-gray-400 hover:text-white'} flex-shrink-0`} 
                />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="px-4 py-4 border-t border-gray-800 flex-shrink-0">
          <button 
            suppressHydrationWarning
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg font-medium transition-all duration-200
              text-red-400 hover:bg-red-500/10 hover:text-red-300 hover:shadow-lg border border-transparent hover:border-red-400/30"
            onClick={() => setIsMobileOpen(false)}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
