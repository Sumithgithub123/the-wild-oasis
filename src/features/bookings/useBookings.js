import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getallBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export default function useBookings() {
  const [search] = useSearchParams();
  const queryclient = useQueryClient();

  const filtervalue = search.get("status");
  const filter =
    !filtervalue || filtervalue === "all"
      ? null
      : { field: "status", filtervalue };

  const sortvalue = search.get("sortBy");

  const sort = sortvalue || "startDate-desc";
  const [field, direction] = sort.split("-");
  const sortBy = { field, direction };

  const page = !search.get("page") ? 1 : Number(search.get("page"));

  const { isLoading, data, error, isPaused } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getallBookings({ filter, sortBy, page }),
  });

  const pagecount = Math.ceil(data?.count / PAGE_SIZE);

  if (page < pagecount) {
    queryclient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getallBookings({ filter, sortBy, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryclient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getallBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return { isLoading, data, error, isPaused };
}
