import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
  const navigate = useNavigate();
  const queryclient = useQueryClient();
  const { isLoading: islogout, mutate: logoutapi } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryclient.removeQueries();
      toast.success("Successfully Logged Out.");
      navigate("/login", { replace: true });
    },
    onError: () => {
      toast.error("Something wrong happen while logout!");
    },
  });

  return { logoutapi, islogout };
}
