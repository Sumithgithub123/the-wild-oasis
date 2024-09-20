import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export default function useRecentStays() {
  const [search, setsearch] = useSearchParams();

  const numDays = Number(search.get("last")) || 7;

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });

  const confirmedstays = stays?.filter((obj) => {
    return obj.status === "checked-in" || obj.status === "checked-out";
  });

  return { isLoading, stays, confirmedstays, numDays };
}
