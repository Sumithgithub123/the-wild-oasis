import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { isLoading: issignup, mutate: signupapi } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log(data);

      toast.success(
        `User ${data.user.identities[0].identity_data.fullName} Created Successfully`
      );
    },
    onError: () => {
      toast.error("Something wrong happen while creating new user!");
    },
  });

  return { issignup, signupapi };
}
