"use client";

import Sidebar from "@/app/components/AdminSidebar";
import Topbar from "@/app/components/Topbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      
      <Sidebar />

      <div className="flex-1 flex flex-col">
          <div className="h-16 flex-shrink-0">
          <Topbar />
        </div>

       
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
