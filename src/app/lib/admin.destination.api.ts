import {
  tableDb,
  storage,
  DATABASE_ID,
  DESTINATIONS_COLLECTION_ID,
  BUCKET_ID,
} from "@/appwrite.config";
import { ID, Permission, Role } from "appwrite";

/* ================================
   CREATE DESTINATION
================================ */
export async function createDestination(data: any, image?: File) {
  let imageId = "";

 
  if (image) {
    const file = await storage.createFile(
      BUCKET_ID,
      ID.unique(),
      image,
       [
    Permission.read(Role.any()),   
  ]
      
    );
    imageId = file.$id; 
  }

 
  const result = await tableDb.createRow({
    databaseId: DATABASE_ID,
    tableId: DESTINATIONS_COLLECTION_ID,
    rowId: ID.unique(),
    data: {
      name: data.name,
      country: data.country,
      price: Number(data.price),
      description: data.description,
      image: imageId, 
    },
  });

  console.log("🔍 FULL RESULT:", JSON.stringify(result, null, 2));
  console.log("🖼️ IMAGE ID SAVED:", imageId);
  return result;
}

/* ================================
   GET ALL DESTINATIONS
================================ */
export async function getDestinations() {
  return tableDb.listRows({
    databaseId: DATABASE_ID,
    tableId: DESTINATIONS_COLLECTION_ID,
  });
}

/* ================================
   GET DESTINATION BY ID
================================ */
export async function getDestinationById(id: string) {
  return tableDb.getRow({
    databaseId: DATABASE_ID,
    tableId: DESTINATIONS_COLLECTION_ID,
    rowId: id,
  });
}

/* ================================
   UPDATE DESTINATION
================================ */
export async function updateDestination(id: string, data: any, image?: File) {
  let imageId = data.image || "";

 
  if (image) {
    const file = await storage.createFile(
      BUCKET_ID,
      ID.unique(),
      image,
       [
      Permission.read(Role.any()), 
    ]
    );
    imageId = file.$id;
  }

  const { imageFile, ...safeData } = data; 

  return tableDb.updateRow({
    databaseId: DATABASE_ID,
    tableId: DESTINATIONS_COLLECTION_ID,
    rowId: id,
    data: {
      ...safeData,
      price: Number(safeData.price),
      image: imageId,
    },
  });
}

/* ================================
   DELETE DESTINATION
================================ */
export async function deleteDestination(id: string) {
  return tableDb.deleteRow({
    databaseId: DATABASE_ID,
    tableId: DESTINATIONS_COLLECTION_ID,
    rowId: id,
  });
}
