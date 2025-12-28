import { tableDb } from "@/appwrite.config";
import { DATABASE_ID, DESTINATIONS_COLLECTION_ID } from "@/appwrite.config";

// All public destinations
export async function getPublicDestinations() {
  return await tableDb.listRows({
    databaseId: DATABASE_ID,
    tableId: DESTINATIONS_COLLECTION_ID,
  });
}

// Single destination by ID (for booking page)
export async function getDestinationById(id: string) {
  const res = await tableDb.getRow({
    databaseId: DATABASE_ID,
    tableId: DESTINATIONS_COLLECTION_ID,
    rowId: id,
  });

  return res;
}
