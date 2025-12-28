"use client"; 

import { account, databases, storage, BUCKET_ID } from "@/appwrite.config";
import { Query, ID } from "appwrite"; 
import type { Models } from "appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const PROFILE_TABLE_ID = process.env.NEXT_PUBLIC_APPWRITE_PROFILES_COLLECTION_ID!;

export const uploadProfileImage = async (file: File): Promise<string> => {
  try {
    const fileId = ID.unique();
    
    console.log("Uploading with fileId:", fileId, "Length:", fileId.length);
    
    
    const uploadedFile = await storage.createFile(
      BUCKET_ID,
      fileId,
      file
    );
    
    console.log("Upload successful, returned fileId:", uploadedFile.$id);
    return uploadedFile.$id;
  } catch (error: any) {
    console.error("Image upload error:", error.message);
    throw error;
  }
};

export const getMyProfile = async (): Promise<any> => {
  try {
    const user = await account.get();
    const profile = await databases.listDocuments(
      DATABASE_ID,
      PROFILE_TABLE_ID,
      [Query.equal("email", user.email)]
    );
    return profile.documents[0];
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    throw error;
  }
};

export const updateMyProfile = async (profileId: string, data: any): Promise<any> => {
  try {
    const updatedProfile = await databases.updateDocument(
      DATABASE_ID,
      PROFILE_TABLE_ID,
      profileId,
      data
    );
    return updatedProfile;
  } catch (error) {
    console.error("Failed to update profile:", error);
    throw error;
  }
};
