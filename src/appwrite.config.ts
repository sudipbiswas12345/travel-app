import { Client, Databases, Storage, ID, Account, TablesDB } from "appwrite";

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string); 

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const tableDb = new TablesDB(client);


export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;

// Collection IDs 
export const PROFILE_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_PROFILES_COLLECTION_ID!;
export const DESTINATIONS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_DESTINATIONS_COLLECTION_ID!;
export const BOOKINGS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_BOOKINGS_COLLECTION_ID!;
export const BLOGS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_BLOGS_COLLECTION_ID!;
export const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!;
export {ID, client}



