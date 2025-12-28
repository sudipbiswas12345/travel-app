"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDestination } from "@/app/lib/admin.destination.api";
import DestinationForm from "../destinationsComponents/DestinationForm";
import { useRouter } from "next/navigation";

export default function CreateDestination() {
  const qc = useQueryClient();
  const router = useRouter();

  

  const mutation = useMutation({
  mutationFn: ({ data, image }: any) => {
    return createDestination(data, image);
  },
  onSuccess: () => {
  console.log("✅ SAVED - REFRESHING...");
  qc.invalidateQueries({ queryKey: ["destinations"] });
  qc.refetchQueries({ queryKey: ["destinations"] });
  router.refresh();
  router.push("/admin/destinations");
},
  onError: (err) => {
    console.error(" SAVE FAILED", err);
  },
});


  return (
    <DestinationForm
      onSubmit={(form: any) =>
        mutation.mutate({
          data: form,
          image: form.imageFile?.[0],
        })
      }
      loading={mutation.isPending}
    />
  );
}
