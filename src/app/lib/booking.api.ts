import { tableDb, BOOKINGS_COLLECTION_ID, DATABASE_ID } from "@/appwrite.config";
import { ID, Query } from "appwrite";
import { getCurrentUser } from "./auth.api";

/* ================================
   CREATE BOOKING
================================ */
export async function createBooking(data: {
  destinationId: string;
  destinationName: string;
  destinationImage: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
}) {
  const user = await getCurrentUser();
  if (!user) throw new Error("User not logged in");

  return tableDb.createRow({
    databaseId: DATABASE_ID,
    tableId: BOOKINGS_COLLECTION_ID,
    rowId: ID.unique(),

     permissions:  undefined,

    data: {
      userId: user.$id,
      destinationId: data.destinationId,
      destinationName: data.destinationName,
      destinationImage: data.destinationImage,
      startDate: data.startDate,
      endDate: data.endDate,
      totalPrice: Number(data.totalPrice),
      status: "Pending",
    },
  });
}

/* ================================
   GET USER BOOKINGS
================================ */
export async function getMyBookings() {
  const user = await getCurrentUser();
  if (!user) throw new Error("User not logged in");

  return tableDb.listRows({
    databaseId: DATABASE_ID,
    tableId: BOOKINGS_COLLECTION_ID,
    queries: [
      Query.equal("userId", user.$id),
      Query.orderDesc("$createdAt"),
    ],
  });
}

/* ================================
   DELETE BOOKING
================================ */
export async function deleteBooking(bookingId: string) {
  return tableDb.deleteRow({
    databaseId: DATABASE_ID,
    tableId: BOOKINGS_COLLECTION_ID,
    rowId: bookingId,
  });
}

