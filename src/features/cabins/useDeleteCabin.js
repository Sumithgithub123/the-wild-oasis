import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isdeleting, mutate: deletecabin } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Deleted Successfully.");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: () => {
      toast.error("Something Wrong! Can't Delete.");
    },
  });

  return { isdeleting, deletecabin };
}
