import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const {
    data: user,
    error,
    isLoading: isauthorizing,
  } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user"],
  });

  return {
    user,
    isauthorizing,
    error,
    isAuthenticated: user?.role === "authenticated",
  };
}
