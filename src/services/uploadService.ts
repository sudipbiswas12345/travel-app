import { storage, BUCKET_ID } from "@/appwrite.config";
import { ID } from "appwrite";



export const uploadImage = async (file: File) => {
  const res = await storage.createFile(BUCKET_ID, ID.unique(), file);

  return res.$id; 
};
