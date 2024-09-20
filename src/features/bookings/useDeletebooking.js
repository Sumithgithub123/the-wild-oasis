import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function useDeletebooking() {
  const queryclient = useQueryClient();
  const { isLoading: isdeletingbooking, mutate: deletebooking } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success(`Booking deleted successfully.`);
      queryclient.invalidateQueries({
        active: true,
      });
    },
    onError: () => {
      toast.error("Something wrong happen while deleting booking");
    },
  });

  return { deletebooking, isdeletingbooking };
}
