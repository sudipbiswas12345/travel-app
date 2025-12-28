"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, User, Camera, Edit2 } from "lucide-react";
import { getMyProfile, updateMyProfile, uploadProfileImage } from "@/app/lib/profile.api";
import EditProfileModal from "./EditProfileModal";
import InfoItem from "./infiitem";
import { BUCKET_ID } from "@/appwrite.config"; 

export default function UserProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [imageFileId, setImageFileId] = useState<string | null>(null); 
  const [uploadingImage, setUploadingImage] = useState(false); 

  
  const getProfileImageUrl = (profileImageId: string | undefined) => {
    if (!profileImageId) return null;
    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
    return `${endpoint}/storage/buckets/${BUCKET_ID}/files/${profileImageId}/view?project=${projectId}`;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getMyProfile();
        setUser(profile);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

 
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadingImage(true);
      
      try {
        const fileId = await uploadProfileImage(file);
        setImageFileId(fileId);
      } catch (error) {
        console.error("Image upload failed");
      } finally {
        setUploadingImage(false);
      }
    }
  };

  
  const handleSaveProfile = async (formData: any) => {
    try {
      setLoading(true);
      const updateData: any = { ...formData };
      if (imageFileId) {
        updateData.profileImage = imageFileId; 
      }
      
      const updatedProfile = await updateMyProfile(user.$id, updateData);
      setUser(updatedProfile);
      setEditModalOpen(false);
      setImageFileId(null);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 px-4 py-12">
     
      <div className="max-w-5xl mx-auto mb-8">
        <button onClick={() => router.push("/user/dashboard")} className="group inline-flex items-center gap-2 rounded-2xl bg-white/80 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-gray-800 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-white/50 hover:border-emerald-200">
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
       
        <div className="group relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl border border-white/70 hover:border-emerald-200/50 p-8 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2">
          <div className="relative">
            <div className="h-36 w-36 rounded-full border-6 border-gradient-to-r from-emerald-400 to-teal-500 shadow-2xl overflow-hidden bg-gradient-to-br from-emerald-100 to-teal-100 group-hover:scale-105 transition-transform duration-500">
             
              <img
                src={getProfileImageUrl(user?.profileImage) || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=10B981&color=fff`}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            
           
            <button className="absolute -bottom-2 -right-2 bg-emerald-600 hover:bg-emerald-700 p-3 rounded-2xl shadow-2xl border-4 border-white hover:scale-110 transition-all duration-300 disabled:opacity-50" disabled={uploadingImage}>
              <Camera size={18} className="text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={uploadingImage}
              />
            </button>
          </div>

          <h2 className="mt-6 text-2xl lg:text-3xl font-black bg-gradient-to-r from-gray-900 via-emerald-900 to-teal-900 bg-clip-text text-transparent leading-tight">
            {user?.name || "User"}
          </h2>

          <p className="mt-2 px-6 py-2 bg-emerald-100 text-emerald-800 text-sm font-semibold rounded-full shadow-sm">
            Verified Traveler
          </p>

          <button 
            onClick={() => setEditModalOpen(true)}
            className="mt-8 w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group/edit"
          >
            <Edit2 size={20} className="group-hover/edit:rotate-12 transition-transform" />
            Edit Profile
          </button>
        </div>

        
        <div className="lg:col-span-2 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/70 p-8">
          <h3 className="text-2xl font-black bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent mb-8">
            Profile Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoItem icon={<User size={20} className="text-emerald-600" />} label="Full Name" value={user?.name || "Not set"} />
            <InfoItem icon={<Mail size={20} className="text-teal-600" />} label="Email Address" value={user?.email || "Not set"} />
            <InfoItem icon={<Phone size={20} className="text-emerald-600" />} label="Phone Number" value={user?.phone || "Not set"} />
            <InfoItem icon={<MapPin size={20} className="text-teal-600" />} label="Location" value={user?.location || "Not set"} />
          </div>
        </div>
      </div>

      
      <EditProfileModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        profile={user}
        onUpdated={handleSaveProfile}
        imageFileId={imageFileId}
        uploadingImage={uploadingImage}
      />
    </div>
  );
}




