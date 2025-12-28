export default function BookingStatusBadge({ status }: { status: string }) {
  const base = "px-3 py-1 rounded-full text-xs font-semibold inline-block";

  if (status === "Approved")
    return <span className={`${base} bg-green-100 text-green-700`}>Approved</span>;

  if (status === "Rejected")
    return <span className={`${base} bg-red-100 text-red-700`}>Rejected</span>;

  return <span className={`${base} bg-yellow-100 text-yellow-700`}>Pending</span>;
}
