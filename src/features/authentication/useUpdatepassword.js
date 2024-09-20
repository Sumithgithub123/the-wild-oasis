import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatepassword } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdatepassword() {
  const queryclient = useQueryClient();
  const { isLoading: isupdatepassword, mutate: updatepasswordapi } =
    useMutation({
      mutationFn: updatepassword,
      onSuccess: () => {
        toast.success("Account Password Updated Successfully.");
        queryclient.invalidateQueries({
          queryKey: ["user"],
        });
      },
      onError: () => {
        toast.error(
          "Something wrong happened while updating account password."
        );
      },
    });

  return { isupdatepassword, updatepasswordapi };
}
