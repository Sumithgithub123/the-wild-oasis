import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Paused from "../../ui/Paused";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import Button from "../../ui/Button";
import { useRef } from "react";

function CabinTable() {
  const {
    cabins,
    pageParams,
    isLoading,
    isPaused,
    error,
    fetchNextPage,
    isFetchingNextPage,
    nothasnext,
  } = useCabins();

  const pagevalue = pageParams?.length - 1 || 0;

  const refe = useRef(pagevalue);

  const [search] = useSearchParams();
  const val = search.get("discount");

  const filteredCabins = cabins?.filter((cabin) => {
    if (val === "no-discount") {
      return !cabin.discount;
    }
    if (val === "with-discount") {
      return cabin.discount;
    }
    return cabin;
  });

  const sortval = search.get("sortBy") || "name-asc";

  const [field, direction] = sortval.split("-");
  const sortedcabins = filteredCabins?.sort((a, b) => {
    if (direction === "asc") {
      return a[field] - b[field];
    }
    if (direction === "desc") return b[field] - a[field];
  });

  function handlescroll() {
    if (nothasnext) return;
    refe.current++;
    fetchNextPage({ pageParam: refe.current });
  }

  if (isPaused) return <Paused>Something Wrong Happened!</Paused>;

  if (isLoading) return <Spinner />;

  if (error) return <p>Something Wrong Happened!</p>;

  if (!cabins.length) return <Empty resourceName="cabins" />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedcabins}
          render={(cabin) => {
            return <CabinRow cabin={cabin} key={cabin.id} />;
          }}
        />
      </Table>
      <Button onClick={handlescroll} disabled={nothasnext}>
        {!nothasnext
          ? isFetchingNextPage
            ? "Loading..."
            : "Load More Cabins."
          : "No More Data to Load!"}
      </Button>
    </Menus>
  );
}

export default CabinTable;
