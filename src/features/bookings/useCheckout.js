import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";

export function useUpdatecheckout() {
  const queryclient = useQueryClient();
  const { isLoading: ischeckout, mutate: updatecheckout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: "checked-out" }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully Checked Out`);
      queryclient.invalidateQueries({
        active: true,
      });
    },
    onError: () => {
      toast.error("Something went wrong while Check In");
    },
  });

  return { updatecheckout, ischeckout };
}
