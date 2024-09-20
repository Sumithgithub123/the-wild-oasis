import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useUpdatecheckin } from "../bookings/useUpdatecheckin";
import { useSettings } from "../settings/useSettings";
import useBookingDetails from "../bookings/useBookingDetails";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { booking = {}, isLoading } = useBookingDetails();
  const [notpaid, setnotpaid] = useState(booking.isPaid);
  const [breakfast, setbreakfast] = useState(false);
  const moveBack = useMoveBack();
  const { updatecheckin, isupdating } = useUpdatecheckin();
  // const { updatebreakfast, isupdatingbreakfast } = useUpdateBreakfast();

  const { settingsdata: { breakfastPrice } = {}, isloadingsettings } =
    useSettings();

  const {
    id: bookingId,
    status,
    guests,
    isPaid,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalbreakfast = breakfastPrice * numNights * numGuests;

  useEffect(() => {
    if (isPaid) setnotpaid(isPaid);
  }, [isPaid]);

  function handleCheckin() {
    if (notpaid) {
      if (breakfast) {
        updatecheckin({
          bookingId,
          obj: {
            hasBreakfast: true,
            extrasPrice: optionalbreakfast,
            totalPrice: totalPrice + optionalbreakfast,
          },
        });
      } else {
        updatecheckin({ bookingId });
      }
    }
  }

  if (isLoading || isloadingsettings) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={breakfast}
            onChange={() => {
              setbreakfast((breakfast) => !breakfast);
              setnotpaid(false);
              // updatebreakfast({
              //   totalPrice,
              //   optionalbreakfast,
              // });
            }}
          >
            Want to add breakfast for booking{" "}
            {formatCurrency(optionalbreakfast)}
          </Checkbox>
        </Box>
      )}

      <Box>
        {status === "unconfirmed" ? (
          <Checkbox
            id="confirm"
            checked={notpaid}
            disabled={notpaid}
            onChange={() => setnotpaid((notpaid) => !notpaid)}
          >
            I confirm that {guests.fullName} has paid the total amount of{" "}
            {formatCurrency(totalPrice)}
          </Checkbox>
        ) : (
          "✅ Checked In"
        )}
      </Box>

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button disabled={!notpaid || isupdating} onClick={handleCheckin}>
            {isupdating ? `Processing...` : `Check in booking #${bookingId}`}
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
