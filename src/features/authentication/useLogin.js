import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryclient = useQueryClient();
  const { isLoading: islogin, mutate: loginapi } = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      toast.success("Logged In Successfully");
      queryclient.setQueryData(["user"], user);
      navigate("/dashboard", { replace: true });
    },
    onError: () => {
      toast.error("Invalid Email or Password!");
    },
  });

  return { loginapi, islogin };
}
