/* eslint-disable react/prop-types */
import useBookings from "./useBookings";
import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";
import { useEffect, useState } from "react";

function BookingTable() {
  const { bookings, isLoading } = useBookings();
  const [page, setpage] = useState(0);

  useEffect(() => {
    setpage(0);
  }, [bookings]);

  const afterpage = bookings?.slice(page, page + 5);

  const previousdisable = afterpage && bookings[0]?.id === afterpage[0]?.id;
  const nextdisable =
    afterpage &&
    bookings[bookings.length - 1]?.id === afterpage[afterpage.length - 1]?.id;

  if (isLoading) return <Spinner />;

  if (!bookings.length) return <Empty resourceName="bookings" />;
  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={afterpage}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination
            length={bookings.length}
            afterlength={afterpage?.length}
            setpage={setpage}
            page={page}
            disableprev={previousdisable}
            disablenext={nextdisable}
          />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
