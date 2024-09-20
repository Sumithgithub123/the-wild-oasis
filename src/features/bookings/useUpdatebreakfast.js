import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function useUpdateBreakfast() {
  const { bookingid } = useParams();
  const queryclient = useQueryClient();

  const { isLoading: isupdatingbreakfast, mutate: updatebreakfast } =
    useMutation({
      mutationFn: ({ totalPrice, optionalbreakfast }) =>
        updateBooking(bookingid, {
          hasBreakfast: true,
          extrasPrice: optionalbreakfast,
          totalPrice: totalPrice + optionalbreakfast,
          isPaid: false,
        }),
      onSuccess: () => {
        queryclient.invalidateQueries({
          queryKey: [`booking/${bookingid}`],
        });
      },
      onError: () => {
        toast.error("Something happen wrong while adding breakfast.");
      },
    });

  return { isupdatingbreakfast, updatebreakfast };
}
