import { ReactNode } from "react";

interface InfoItemProps {
  icon: ReactNode;
  label: string;
  value: string;
}

export default function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="group bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-white/60 backdrop-blur-sm rounded-2xl shadow-md flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">{label}</p>
          <p className="text-xl font-black text-gray-900 truncate">{value}</p>
        </div>
      </div>
    </div>
  );
}
