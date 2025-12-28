import { tableDb, BOOKINGS_COLLECTION_ID, DATABASE_ID } from "@/appwrite.config";

/* ================================
   GET ALL BOOKINGS (ADMIN)
================================ */
export async function getBookings() {
  return tableDb.listRows({
    databaseId: DATABASE_ID,
    tableId: BOOKINGS_COLLECTION_ID,
  });
}

/* ================================
   UPDATE BOOKING STATUS
================================ */
export async function updateBookingStatus(
  bookingId: string,
  status: "Approved" | "Rejected"
) {
  return tableDb.updateRow({
    databaseId: DATABASE_ID,
    tableId: BOOKINGS_COLLECTION_ID,
    rowId: bookingId,
    data: { status },
  });
}

/* ================================
   DELETE BOOKING (ADMIN)
================================ */
export async function deleteBooking(bookingId: string) {
  return tableDb.deleteRow({
    databaseId: DATABASE_ID,
    tableId: BOOKINGS_COLLECTION_ID,
    rowId: bookingId,
  });
}
