import { useInfiniteQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    data: { pages, pageParams } = {},
    error,
    isLoading,
    isPaused,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["cabin"],
    queryFn: getCabins,
  });

  const cabins = [];

  if (pages) {
    for (let i = 0; i < pages.length; i++) {
      for (let j = 0; j < pages[i].data.length; j++) {
        cabins.push(pages[i].data[j]);
      }
    }
  }

  const nothasnext = pages?.[0].count === cabins?.length;

  return {
    cabins,
    pageParams,
    nothasnext,
    error,
    isLoading,
    isPaused,
    fetchNextPage,
    isFetchingNextPage,
  };
}
