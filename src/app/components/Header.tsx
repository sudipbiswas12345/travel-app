"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  LayoutDashboard,
  Backpack,
} from "lucide-react";
import { useAuth } from "@/app/contexts/AuthContext";
import { BUCKET_ID } from "@/appwrite.config";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // Top menu items
  // const menuItems = [
  //   { label: "Home", path: "/" },
  //   { label: "Blog", path: "/blogs" },
  //   { label: "About", path: "/about" },
  //   { label: "Contact", path: "/contact" },
  // ];



  // Navbar.tsx - KEEP THIS (shows all links)
  const menuItems = [
  { label: "Home", path: "/" },
  { label: "Blog", path: "/blogs" },     // ✅ Shows but blocked by middleware
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" }, // ✅ Shows but blocked by middleware
  ];


  const getProfileImageUrl = (profileImageId: string | undefined) => {
    if (!profileImageId) return null;
    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
    return `${endpoint}/storage/buckets/${BUCKET_ID}/files/${profileImageId}/view?project=${projectId}`;
  };

  // Scroll effect
  // useEffect(() => {
  //   const onScroll = () => setScrolled(window.scrollY > 20);
  //   window.addEventListener("scroll", onScroll);
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);

  // Close login dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        loginOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setLoginOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [loginOpen]);

  
  async function handleLogout() {
  if (!confirm("Are you sure you want to logout?")) return;
  try {
    await logout();
    router.push("/auth/login"); 
  } catch (error) {
    console.error("Logout failed:", error);
  }
}


  function getDisplayName() {
    if (loading) return "Loading...";
    if (!user) return "Login";
    return user.name || "User";
  }

 
  function getRoleBadgeColor(role: string) {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  }

 
  function getDashboardPath() {
    switch (user?.role?.toLowerCase()) {
      case "admin":
        return "/admin";
      default:
        return "/user/dashboard";
    }
  }

  return (
    <header
      className={`top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-sm bg-green-300/90 shadow-lg border-b border-green-100"
          : "bg-lime-900"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-3 h-20 flex items-center justify-between">
    
        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 shadow-md ring-1 ring-emerald-100">
            <Backpack className="w-6 h-6 text-yellow-600"/>
          </div>
          <div className="leading-tight">
            <span className="block text-3xl font-extrabold text-white tracking-tight">
              Travelly
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="px-3 py-2 rounded-md text-lg font-medium text-white hover:text-emerald-700 hover:bg-emerald-50 transition transform hover:-translate-y-0.5"
            >
              {item.label}
            </Link>
          ))}

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLoginOpen((s) => !s)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white shadow-lg focus:outline-none transition-transform transform hover:scale-105"
              style={{ background: "linear-gradient(90deg,#2f855a,#4aa76b)" }}
            >
              {/* Profile Image */}
              {user?.profileImage && (
                <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/50 shadow-md">
                  <img
                    src={getProfileImageUrl(user.profileImage) || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=10B981&color=fff`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {!user?.profileImage && <User className="w-4 h-4" />}
              
              <span className="text-sm font-medium">
                {getDisplayName()}
              </span>
              {user?.role && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider bg-white/20 text-white`}>
                  {user.role}
                </span>
              )}
              <ChevronDown className="w-4 h-4" />
            </button>

            {loginOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-zinc-500 rounded-2xl shadow-2xl ring-1 ring-black/5 p-2 z-[9999]">
                {!user ? (
                  <>
                    <button
                      onClick={() => {
                        setLoginOpen(false);
                        router.push("/auth/login");
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-emerald-700 rounded-lg transition flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-emerald-600" /> Login
                    </button>
                    <button
                      onClick={() => {
                        setLoginOpen(false);
                        router.push("/auth/signup");
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-emerald-700 rounded-lg transition flex items-center gap-2 mt-1"
                    >
                      <User className="w-4 h-4 text-blue-600" /> Sign Up
                    </button>
                  </>
                ) : (
                  <>
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center gap-3 mb-1">
                        {/* Profile Image in Dropdown */}
                        {user.profileImage && (
                          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-200">
                            <img
                              src={getProfileImageUrl(user.profileImage) || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=10B981&color=fff`}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getRoleBadgeColor(user.role)}`}>
                          {user.role}
                        </span>
                      </div>
                    </div>

                    {/* Dashboard Link */}
                    <button
                      onClick={() => {
                        setLoginOpen(false);
                        router.push(getDashboardPath());
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-emerald-50 rounded-lg transition flex items-center gap-2 mt-2"
                    >
                      <LayoutDashboard className="w-4 h-4 text-emerald-600" /> Dashboard
                    </button>

                    {/* Logout */}
                    <button
                      onClick={() => {
                        setLoginOpen(false);
                        handleLogout();
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-red-50 rounded-lg transition flex items-center gap-2 mt-1"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" /> Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-white hover:bg-white/10 transition"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-4 space-y-3 bg-white/95 border-t border-gray-100">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setOpen(false)}
              className="block text-gray-700 hover:text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-50 transition"
            >
              {item.label}
            </Link>
          ))}

          {!user ? (
            <>
              <button
                onClick={() => {
                  setOpen(false);
                  router.push("/auth/login");
                }}
                className="w-full px-4 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl shadow-lg"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  router.push("/auth/signup");
                }}
                className="w-full px-4 py-3 bg-white border-2 border-emerald-600 text-emerald-600 rounded-xl"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <div className="px-4 py-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  {/* Profile Image in Mobile */}
                  {user.profileImage && (
                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-200">
                      <img
                        src={getProfileImageUrl(user.profileImage) || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=10B981&color=fff`}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getRoleBadgeColor(user.role)}`}>
                    {user.role}
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setOpen(false);
                  router.push(getDashboardPath());
                }}
                className="w-full px-4 py-3 bg-emerald-600 text-white rounded-xl"
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="w-full px-4 py-3 bg-white border rounded-xl text-gray-700"
              >
                Logout
              </button>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}




