import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateuser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateuser() {
  const queryclient = useQueryClient();
  const { isLoading: isupdateuser, mutate: updateuserapi } = useMutation({
    mutationFn: updateuser,
    onSuccess: () => {
      toast.success("Account Details Updated Successfully.");
      queryclient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: () => {
      toast.error("Something wrong happened while updating account details.");
    },
  });

  return { isupdateuser, updateuserapi };
}
