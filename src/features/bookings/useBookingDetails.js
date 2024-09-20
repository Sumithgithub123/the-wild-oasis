import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export default function useBookingDetails() {
  const { bookingid } = useParams();

  const {
    isLoading,
    error,
    data: booking,
  } = useQuery({
    queryKey: [`booking/${bookingid}`],
    queryFn: () => getBooking(bookingid),
    retry: false,
  });

  // console.log(booking);

  return { booking, isLoading, error };
}
