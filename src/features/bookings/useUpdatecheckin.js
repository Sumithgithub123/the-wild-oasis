import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";

export function useUpdatecheckin() {
  const navigate = useNavigate();
  const queryclient = useQueryClient();
  const { isLoading: isupdating, mutate: updatecheckin } = useMutation({
    mutationFn: ({ bookingId, obj }) =>
      updateBooking(bookingId, { ...obj, isPaid: true, status: "checked-in" }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully Checked In`);
      queryclient.invalidateQueries({
        active: true,
        // queryKey: [`booking/${data.id}`],
      });
      navigate("/");
    },
    onError: () => {
      toast.error("Something went wrong while Check In");
    },
  });

  return { updatecheckin, isupdating };
}
