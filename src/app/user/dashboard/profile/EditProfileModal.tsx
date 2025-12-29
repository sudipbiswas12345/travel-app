"use client";
import { useState, useEffect } from "react";
import { X, Check, Image as ImageIcon, User, Phone, Mail } from "lucide-react";
import { updateMyProfile } from "@/app/lib/profile.api";

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  profile: any;
  onUpdated: (profile: any) => void;
  imageFileId: string | null;
  uploadingImage: boolean;
}

export default function EditProfileModal({
  open,
  onClose,
  profile,
  onUpdated,
  imageFileId,
  uploadingImage,
}: EditProfileModalProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "", 
  });
  const [isSaving, setIsSaving] = useState(false);

  
  useEffect(() => {
    if (open && profile) {
      setForm({
        name: profile.name || "",
        phone: profile.phone || "",
        email: profile.email || "",
      });
    }
  }, [open, profile]);

  if (!open) return null;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updateData = { ...form };
      if (imageFileId) {
        (form as any).profileImage = imageFileId;
      }
      
      const res = await updateMyProfile(profile.$id, updateData);
      onUpdated(res);
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-white/50 max-h-[90vh] overflow-y-auto">
        
      
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
          <h2 className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Edit Profile
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-2xl transition-colors"
            disabled={isSaving}
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

       
        <div className="space-y-6">
          
          <div>
            <label className="flex items-center gap-3 mb-3 text-sm font-semibold text-gray-700">
              <User size={18} className="text-emerald-600 flex-shrink-0" />
              Full Name
            </label>
            <input
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100/50 transition-all duration-300 text-lg font-semibold bg-white/80 backdrop-blur-sm"
              placeholder="Enter your full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              disabled={isSaving}
            />
          </div>

         
          <div>
            <label className="flex items-center gap-3 mb-3 text-sm font-semibold text-gray-700">
              <Mail size={18} className="text-blue-600 flex-shrink-0" />
              Email Address
            </label>
            <input
              type="email"
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 transition-all duration-300 text-lg font-semibold bg-white/80 backdrop-blur-sm"
              placeholder="Enter your email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              disabled={isSaving}
            />
          </div>

          
          <div>
            <label className="flex items-center gap-3 mb-3 text-sm font-semibold text-gray-700">
              <Phone size={18} className="text-teal-600 flex-shrink-0" />
              Phone Number
            </label>
            <input
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-teal-400 focus:ring-4 focus:ring-teal-100/50 transition-all duration-300 text-lg font-semibold bg-white/80 backdrop-blur-sm"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              disabled={isSaving}
            />
          </div>

          
          {uploadingImage && (
            <div className="p-4 bg-yellow-50 border-2 border-dashed border-yellow-200 rounded-2xl animate-pulse">
              <p className="flex items-center gap-2 text-sm font-medium text-yellow-800 mb-2">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading profile image...
              </p>
            </div>
          )}

          {imageFileId && !uploadingImage && (
            <div className="p-4 bg-emerald-50 border-2 border-dashed border-emerald-200 rounded-2xl">
              <p className="flex items-center gap-2 text-sm font-medium text-emerald-800 mb-2">
                <ImageIcon size={16} />
                New profile image ready
              </p>
              <p className="text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full font-mono">
                {imageFileId.slice(0, 8)}...
              </p>
            </div>
          )}
        </div>

        
        <div className="flex gap-4 mt-10 pt-6 border-t border-gray-100">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-4 text-gray-700 font-semibold border-2 border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSaving || uploadingImage}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || uploadingImage || !form.name.trim() || !form.email.trim()}
            className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check size={20} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
