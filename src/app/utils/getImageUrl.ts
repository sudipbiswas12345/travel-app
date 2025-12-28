import { BUCKET_ID } from "@/appwrite.config";
export const getImageUrl = (fileId: string) => {
  if (!fileId) return "/placeholder.jpg";
  
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  
  return `${endpoint}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${projectId}`;
};