import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { inserteditCabin } from "../../services/apiCabins";

export function useInsertCabin() {
  const queryClient = useQueryClient();

  const { isLoading: iscreating, mutate: create } = useMutation({
    mutationFn: inserteditCabin,
    onSuccess: () => {
      toast.success("Succesfully Created.");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      // reset();
    },
    onError: () => {
      toast.error("Something wrong during creation!");
    },
  });

  return { iscreating, create };
}
