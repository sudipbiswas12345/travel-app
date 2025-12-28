"use client";

import { useParams, useRouter } from "next/navigation";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getDestinationById,
  updateDestination,
} from "@/app/lib/admin.destination.api";
import DestinationForm from "../../destinationsComponents/DestinationForm";


export default function EditDestinationPage() {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["destination", id],
    queryFn: () => getDestinationById(id as string),
  });

  const mutation = useMutation({
    mutationFn: ({ formData }: any) =>
      updateDestination(id as string, formData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["destinations"] });

      queryClient.invalidateQueries({
        queryKey: ["destination", id],
      });

      router.push("/admin/destinations");
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Edit Destination</h1>

      <DestinationForm
        defaultValues={data}
        loading={mutation.isPending}
        onSubmit={(formData: any) =>
          mutation.mutate({ formData })
        }
      />
    </div>
  );
}
