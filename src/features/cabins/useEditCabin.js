import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { inserteditCabin } from "../../services/apiCabins";

export function useEditCabin(reset) {
  const queryClient = useQueryClient();

  const { isLoading: isediting, mutate: edit } = useMutation({
    mutationFn: ({ id, ...editdata }) => inserteditCabin(editdata, id),
    onSuccess: () => {
      toast.success("Succesfully Edited.");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      reset();
    },
    onError: () => {
      toast.error("Something wrong during editing!");
    },
  });

  return { isediting, edit };
}
